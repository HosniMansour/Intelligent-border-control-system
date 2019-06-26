from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from identity.api.views import IdentityCheckView
from .views import (AdminAuthView, 
        CRUDCriminalsListView, CRUDCriminalsDetailAPIView, CRUDCriminalsCreateView,
        CRUDAgentsListCreateView, CRUDAgentsDetailsView,StatsView
        )

urlpatterns = [
    #
    path('stats/', StatsView.as_view()),
    # Admin Auth
    path('',AdminAuthView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    # Criminal Crud
    path('criminals/', CRUDCriminalsListView.as_view()),
    path('criminals/add/', CRUDCriminalsCreateView.as_view()),
    path('criminals/<int:pk>/', CRUDCriminalsDetailAPIView.as_view()),
    # Agent Crud
    path('agents/', CRUDAgentsListCreateView.as_view()),
    path('agents/<int:pk>/', CRUDAgentsDetailsView.as_view()),
    # Passenger CRUD
    path('passengers/', IdentityCheckView.as_view()),


]
