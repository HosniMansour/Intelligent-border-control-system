from django.urls import  path
from .views import SpeechView

urlpatterns = [
    path('', SpeechView.as_view()),
]
