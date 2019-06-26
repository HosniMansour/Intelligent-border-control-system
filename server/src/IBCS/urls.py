from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from IBCS.views import AuthView


from identity.api.views import IdentityCheckView

urlpatterns = [
    #auth
    path('api/auth/', AuthView.as_view()),
    path('api/auth/token/', TokenObtainPairView.as_view()),
    path('api/auth/token/refresh/', TokenRefreshView.as_view()),
    #Rest app
    path('admin/', admin.site.urls),
    path('api/check/', include('identity.api.urls')),
    path('api/admincp/', include('admincp.api.urls')),
    path('api/translate/', include('language.api.urls')),
    path('api/history/', IdentityCheckView.as_view()),
    # Abnormal
    path('api/abnormal/', include('abnormal.api.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
