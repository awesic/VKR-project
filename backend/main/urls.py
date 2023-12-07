from django.urls import path
from main import views

urlpatterns = [
    path("student/theme/change/", views.ThemeChangeView.as_view()),
]