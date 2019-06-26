from django.urls import  path
from .views import IdentityCheckView

urlpatterns = [
    path('', IdentityCheckView.as_view()),
]
