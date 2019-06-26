from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Wanted, Passenger
from .models import Agent

admin.site.site_header = "Intelligent Border Control System"
admin.site.unregister(Group)

admin.site.register(Wanted)


class PassengerAdmin(admin.ModelAdmin):
    list_display = ('name','timestamp')
    list_filter = ('timestamp',)

admin.site.register(Passenger, PassengerAdmin)

class AgentAdmin(admin.ModelAdmin):
    list_display = ('idWork','name','lastName','timestamp')
    list_filter = ('timestamp',)

admin.site.register(Agent, AgentAdmin)