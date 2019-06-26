from django.conf import settings
from django.db import models
import datetime


def upload_image(instance, filename):
    return "media/check/{agent}/{date}/{filename}".format(agent=instance.agent,date=datetime.datetime.today().strftime('%d-%m-%Y'), filename=filename)


# Create your models here.
class IdentityCheckQuerySet(models.QuerySet):
    pass


class IdentityCheckManager(models.Manager):
    def get_queryset(self):
        return IdentityCheckQuerySet(self.model,using=self._db)


class IdentityCheck(models.Model):
    agent               = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    passengerPhoto      = models.ImageField(upload_to=upload_image, null=False, blank=False)
    passengerPassport   = models.ImageField(upload_to=upload_image, null=False, blank=False)
    lastName            = models.CharField(max_length=255, null=True, blank=True)
    firstName           = models.CharField(max_length=255, null=True, blank=True)
    birthDate           = models.DateField(null=True, blank=True)
    nationality         = models.CharField(max_length=255, null=True, blank=True)
    gender              = models.CharField(max_length=1, null=True, blank=True)
    ableToBoard         = models.BooleanField(null=False, blank=False, default=False)
    timestamp           = models.DateTimeField(auto_now_add=True)

    objects = IdentityCheckManager()

    def __str__(self):
        return str(self.agent.username)
