from django.contrib.auth import get_user_model
from django.db.models import Q
from datetime import datetime, timedelta
from django.utils import timezone

from rest_framework import permissions
from rest_framework import generics, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from django.db.models import Count

from models.models import Wanted, Agent
from identity.models import IdentityCheck
from .serializers import CriminalSerializer, AgentSerializer

from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    ListCreateAPIView
)

User = get_user_model()


class StatsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, *args, **kwargs):
        agentCount = Agent.objects.count()
        checkoutCount = IdentityCheck.objects.count()
        wantedCount = Wanted.objects.count()

        last = IdentityCheck.objects.extra({'timestamp':"date(timestamp)"}).values('timestamp').annotate(created_count=Count('id'))
        APIView
        return Response({"agents": agentCount,"checkouts": checkoutCount,"wanted": wantedCount,"last":last[:7]}, status=200)



# ADMINAUTHCRUD views
class AdminAuthView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return Response({'details': 'You are already authenticated'}, status=400)

        data = request.data

        username = data.get('username')
        password = data.get('password')

        qs = User.objects.filter(
            Q(username__iexact=username) |
            Q(email__iexact=username)
        ).distinct()
        if (qs.count() == 1):
            user_obj = qs.first()
            if user_obj.check_password(password):
                user = user_obj
                refresh = RefreshToken.for_user(user)
                if user.is_staff:
                    return Response({
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                        'user': {"id": user.id, "username": user.username, "email": user.email}
                    })
                else:
                    response = {"error": "Not an Admin"}

            else:
                response = {"error": "Password Incorrect"}
        else:
            response = {"error": "User not found"}
        return Response(response, status=500)


# CRIMINALCRUD views
class CRUDCriminalsListView(ListAPIView):
    permission_classes = [permissions.IsAdminUser]

    serializer_class = CriminalSerializer

    def get_queryset(self, *args, **kwargs):
        queryset_list = Wanted.objects.all()
        # queryset_list= super(PostListAPIView,self).get_queryset(*args, **kwargs)
        query = self.request.GET.get("search")
        if query:
            queryset_list = queryset_list.filter(
                Q(lastName__icontains=query) |
                Q(firstName__icontains=query)
            ).distinct()
        return queryset_list


class CRUDCriminalsCreateView(CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = CriminalSerializer


class CRUDCriminalsDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]

    queryset = Wanted.objects.all()
    serializer_class = CriminalSerializer


class CRUDAgentsListCreateView(ListCreateAPIView
    #mixins.CreateModelMixin, generics.ListAPIView
    ):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AgentSerializer

    def get_queryset(self):
        request = self.request
        qs = Agent.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            qs = qs.filter(name__icontains=query)
        return qs

    def post(self, request, *args, **kwargs):
        data = request.data
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        password2 = data.get('password2')
        type = data.get('Type')
        idwork = data.get('idWork')
        name = data.get('name')
        lastname = data.get('lastName')
        photo = request.FILES['photo']
        
        if (password != password2):
            response = {"error":"Password must match"}
            return Response(response, status=501)

        qs = User.objects.filter(
            Q(username__iexact=username)|
            Q(email__iexact=username)
        )

        if qs.exists():
            response = {"error":"This user already exist"}
            return Response(response, status=502)
        else:
            user = User.objects.create(username=username,email=email)
            user.set_password(password)
            user.save()
            # Create agent
            agent = Agent.objects.create(user=user, photo=photo, Type=type, idWork=idwork, name=name, lastName=lastname)
            agent.save()

            return Response({"info":"Agent is created"})
        return Response({"error":"Invalid register"}, status=503)


class CRUDAgentsDetailsView(generics.RetrieveAPIView,mixins.DestroyModelMixin,mixins.UpdateModelMixin):

    permission_classes = [permissions.IsAdminUser]
    serializer_class = AgentSerializer
    queryset = Agent.objects.all()
    lookup_field = 'pk'

    def get_queryset(self):
        request = self.request
        qs = Agent.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            qs = qs.filter(name__icontains=query)
        return qs

    def post(self, request, *args, **kwargs):

        data = request.data

        email = data.get('email')
        password = data.get('password')
        password2 = data.get('password2')
        name = data.get('name')
        lastName = data.get('lastName')
        idWork = data.get('idWork')
        Type = data.get('Type')
        photo = request.FILES['photo']

        if (password != password2) :
            response = {"error":"Password must match"}
            return Response(response, status=401)


        agent = Agent.objects.get(id=self.kwargs[self.lookup_field])
        user = User.objects.get(id=agent.user.id)

        if agent!=None:

            if(Type!=""):
                agent.Type = Type
            if (idWork != ""):
                agent.idWork = idWork
            if (lastName != ""):
                agent.lastName = lastName
            if (name != ""):
                agent.name = name

            if photo.name!="unknown":
                agent.photo = photo

            if (password != "" and password2 != ""):
                user.set_password(password)
            if (email != ""):
                user.email = email

            agent.save()
            user.save()
            return Response({"msg": "User saved !"})

        else:
            return Response({"msg": "Something is wrong !"})



    def delete(self, request, *args, **kwargs):
        try:
            agent = Agent.objects.get(id=self.kwargs[self.lookup_field])
            user = User.objects.get(id=agent.user.id)
            agent.delete()
            user.delete()
            return Response({"msg": "User removed !"})
        except:
            return Response({"msg": "User not found or something !"})
