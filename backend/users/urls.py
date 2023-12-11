from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from users import views

urlpatterns = [
    path('users/', views.UsersListView.as_view()),
    path('students/', views.StudentViewSet.as_view({'get': 'list'})),
    path('teachers/', views.TeacherViewSet.as_view({'get': 'list'})),
    path('account/profile', views.ProfileView.as_view()),

    path('token', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),

    path('csrf_cookie', views.GetCSRFToken.as_view()),
    path('auth/is_authenticated', views.CheckAuthentication.as_view()),
    # path('auth/student/register', views.StudentRegisterView.as_view()),
    # path('auth/teacher/register', views.TeacherRegisterView.as_view()),
    path('auth/register', views.UserRegisterView.as_view()),
    path('auth/login', views.LoginView.as_view()),
    path('auth/logout', views.LogoutView.as_view()),
]
