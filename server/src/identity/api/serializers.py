from rest_framework import serializers
from identity.models import IdentityCheck


class IdentityCheckSerializer(serializers.ModelSerializer):

    class Meta:
        model = IdentityCheck
        fields = '__all__'
        read_only_fields = ['agent']



