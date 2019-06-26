import json, os
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.core.files.storage import FileSystemStorage

from .AImodel.Speech import Speech


class SpeechView(APIView):
    permission_classes = [permissions.AllowAny]   

    def post(self, request, *args, **kwargs):
        data = request.data
        audioFile = data.get('speechFile')
        destLang = data.get('destLang')

        fs = FileSystemStorage(location="tmp/")
        if fs.exists("audio.wav"):
            os.remove("tmp/audio.wav")
        newFile = fs.save("audio.wav", audioFile)
        uploaded_file_url = "tmp" + fs.url(newFile)

        speech_json = Speech.process_audio(destLang, uploaded_file_url)
        return Response({"speech": speech_json}, status=200)



