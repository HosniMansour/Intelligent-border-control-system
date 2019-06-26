from rest_framework import serializers
from models.models import Wanted, Agent, Passenger
from identity.api.ProcessData.WantedEncodings import Encoding

from django.contrib.auth import get_user_model
User = get_user_model()

# Criminal Serializer
""" class CriminalSerializer(serializers.ModelSerializer):
  class Meta:
    model = Wanted
    fields = '__all__'
    read_only_fields = ['id'] """


class CriminalSerializer(serializers.ModelSerializer):
  
  def create(self, validated_data):
    instance = Wanted(**validated_data)
    instance.encodings = Encoding.getEncodings(instance.photo)
    instance.save()
    return instance

  # def create(self, validated_data):
  #   return Wanted(**validated_data)

  class Meta:
    model = Wanted
    fields = '__all__'
    read_only_fields = ['id']


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    exclude = ('password','is_superuser','last_login','is_staff','is_active','groups','user_permissions','first_name','last_name')


# Agent Serializer
class AgentSerializer(serializers.ModelSerializer):
  user = UserSerializer()

  class Meta:
    model = Agent
    fields = '__all__'
    #fields = ('id', 'name', 'user')
    read_only_fields = ['id']
    depth = 1

      # Passenger Serializer
class PassengerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Passenger
    fields = '__all__'
    read_only_fields = ['id']

