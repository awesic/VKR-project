from django.urls import path
from directions import views


urlpatterns = [
    path("directions/", views.DirectionViewSet.as_view({'get': 'list'})),
    path("directions/<str:code>", views.DirectionViewSet.as_view({'get': 'retrieve'})),
    path("institute/", views.InstituteViewSet.as_view({'get': 'list'})),
    path("institute/<str:short_name>", views.InstituteViewSet.as_view({'get': 'retrieve'})),
]