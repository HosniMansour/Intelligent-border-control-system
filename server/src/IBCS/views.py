from django.contrib.auth import authenticate, get_user_model
from django.db.models import Q

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from models.models import Agent

User = get_user_model()

class AuthView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({'details':'You are already authenticated'}, status=400)

        data = request.data

        username = data.get('username')
        password = data.get('password')

        qs = User.objects.filter(
            Q(username__iexact=username)|
            Q(email__iexact=username)
        ).distinct()
        if(qs.count()==1):
            user_obj = qs.first()
            if user_obj.check_password(password):
                user = user_obj
                try:
                    agent_obj = Agent.objects.get(user=user.id)
                    if (agent_obj):
                        print("Agent")
                        refresh = RefreshToken.for_user(user)
                        return Response({
                            'refresh': str(refresh),
                            'access': str(refresh.access_token),
                            'user': {"id": user.id, "username": user.username, "email": user.email,
                                     "Name": agent_obj.name, "LastName": agent_obj.lastName,
                                     "photo": str(agent_obj.photo)}
                        })
                except:
                    print("Not an Agent")
                    response = {"error": "Not an Agent"}

            else:
                response = {"error":"Password Incorrect"}
        else:
            response = {"error":"User not found"}
        return Response(response,status=400)


