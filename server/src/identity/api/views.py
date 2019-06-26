import json
import os
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import permissions
from .ProcessData.FaceRecognition import FaceRecognition
from .ProcessData.OCR import OCR
from .ProcessData.Wanted import Wanted
from identity.models import IdentityCheck
from .serializers import IdentityCheckSerializer
from rest_framework.generics import CreateAPIView
from django.core.files.storage import FileSystemStorage
from django.conf import settings

class IdentityCheckView(CreateAPIView, generics.ListAPIView):

    serializer_class = IdentityCheckSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        request = self.request
        qs = IdentityCheck.objects.all()
        query = self.request.GET.get('q')
        if query is not None:
            qs = qs.filter(name__icontains=query)
        return qs

    def save_fss(self, filename, file):
        filename = filename + ".jpg"
        fs = FileSystemStorage(location=settings.MEDIA_ROOT+"/media/tmp/")
        if fs.exists(filename):
            os.remove(settings.MEDIA_ROOT+"/media/tmp/" + filename)
        newFile = fs.save(filename, file)
        uploaded_file_url = settings.MEDIA_ROOT+"/media/tmp" + fs.url(newFile)
        return uploaded_file_url

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if(serializer.is_valid()):
            data = serializer.validated_data
            passPhoto = request.FILES['passengerPhoto']
            uploaded_file_url_pass_photo = self.save_fss("passPhoto", passPhoto)

            passPassport = request.FILES['passengerPassport']
            uploaded_file_url_pass_passport = self.save_fss("passPassport", passPassport)


            image = FaceRecognition.imageMatch(uploaded_file_url_pass_photo, uploaded_file_url_pass_passport)
            wanted = Wanted.criminalMatch(uploaded_file_url_pass_photo)
            passport_json = OCR.passportMatch(uploaded_file_url_pass_passport)
            image_json = json.loads(image)

            firstName      = passport_json['names']
            lastName       = passport_json['surname']
            nationality    = passport_json['country']
            birthDate      = passport_json['date_of_birth']
            gender         = passport_json['sex']

            ableToBoard = (wanted==0) and (int(image_json['match'])==1) and passport_json['valid_expiration_date'] and passport_json['valid_date_of_birth']
            serializer.save(agent=self.request.user, firstName=firstName, lastName=lastName, nationality=nationality, birthDate=birthDate,gender=gender, ableToBoard=ableToBoard)
        else:
            return Response({"image": "-1", "passport": "-1", "wanted": "-1"}, status=500)

        return Response({"image": image_json, "passport": passport_json, "wanted": wanted}, status=200)
