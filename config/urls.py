from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from users import views

router = routers.SimpleRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include('rest_framework.urls')),
    path("api-token-auth/", obtain_jwt_token),
    path("api-token-refresh/", refresh_jwt_token),
    path("api/v1/", include(router.urls)),
]
