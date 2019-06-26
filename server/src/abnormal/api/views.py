import json
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from abnormal.api.ABD import startABD


class ABDView(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        if data.get('params')=="":
            params  = 0.0005
        else:
            params = data.get('params')
        startABD(params)

        return Response({"msj": "ok"})
