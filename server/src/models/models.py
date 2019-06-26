from django.conf import settings
from django.db import models
from django_postgres_extensions.models.fields import ArrayField
from identity.api.ProcessData.WantedEncodings import Encoding


# =========================== Agent.

class AgentQuerySet(models.QuerySet):
    pass

class AgentManager(models.Manager):
    def get_queryset(self):
        return AgentQuerySet(self.model,using=self._db)

class Agent(models.Model):
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    name   = models.CharField(max_length=255,null=False,blank=False)
    lastName    = models.CharField(max_length=255,null=False,blank=False)
    photo       = models.ImageField(upload_to="media/agents/",null=True,blank=True)
    idWork      = models.CharField(max_length=20, null=False, blank=False)
    Type        = models.CharField(max_length=50, null=False, blank=False)
    updated     = models.DateTimeField(auto_now=True)
    timestamp   = models.DateTimeField(auto_now_add=True)

    objects = AgentManager()

    def __str__(self):
        return str(self.name)

# =========================== Image.

class ImageQuerySet(models.QuerySet):
    pass

class ImageManager(models.Manager):
    def get_queryset(self):
        return ImageQuerySet(self.model,using=self._db)

class Image(models.Model):
    file        = models.ImageField(upload_to="media/passengers/",null=True,blank=True)
    timestamp   = models.DateTimeField(auto_now_add=True)

    objects = ImageManager()

    def __str__(self):
        return str(self.timestamp)

# =========================== Passenger.

class PassengerQuerySet(models.QuerySet):
    pass

class PassengerManager(models.Manager):
    def get_queryset(self):
        return PassengerQuerySet(self.model,using=self._db)

class Passenger(models.Model):
    name        = models.CharField(max_length=255,null=False,blank=False)
    lastName    = models.CharField(max_length=255,null=False,blank=False)
    photo       = models.ImageField(upload_to="media/passenger/", null=True, blank=True)
    idWork      = models.CharField(max_length=20, null=False, blank=False)
    type        = models.CharField(max_length=50, null=False, blank=False)
    updated     = models.DateTimeField(auto_now=True)
    timestamp   = models.DateTimeField(auto_now_add=True)

    objects = PassengerManager()

    def __str__(self):
        return str(self.name)

# =========================== Wanted.

class WantedQuerySet(models.QuerySet):
    pass

class WantedManager(models.Manager):
    def get_queryset(self):
        return WantedQuerySet(self.model,using=self._db)

class Wanted(models.Model):
    firstName = models.CharField(max_length=255, null=False, blank=False, default="default")
    lastName = models.CharField(max_length=255, null=False, blank=False, default="default")
    photo = models.ImageField(upload_to="media/wanted/", null=True, blank=True)
    encodings = ArrayField(models.FloatField(), null=True, blank=True, default=list)

    objects = WantedManager()

    def __str__(self):
        return str(self.firstName)

    @classmethod
    def getObjects(firstName, lastName, photo, encodings=list):
        self.firstName = firstName
        self.lastName = lastName
        self.photo = photo
        self.encodings = Encoding.getEncodings(self.photo)
