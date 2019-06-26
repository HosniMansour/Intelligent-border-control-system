from django.urls import path
from .views import ABDView

urlpatterns = [
    path('', ABDView.as_view()),
]
