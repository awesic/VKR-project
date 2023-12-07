from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from users import views

urlpatterns = [
    path('users/', views.UsersListView.as_view(), name='users_list'),
    path('students/', views.StudentViewSet.as_view({'get': 'list'}), name='students_list'),
    path('teachers/', views.TeacherViewSet.as_view({'get': 'list'}), name='teachers_list'),
    path('account/profile', views.ProfileView.as_view(), name='profile'),

    path('token', TokenObtainPairView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('token/verify/', TokenVerifyView.as_view()),

    # path('csrf_cookie', views.GetCSRFToken.as_view(), name='csrf_token'),
    path('auth/is_authenticated', views.CheckAuthentication.as_view(), name='is_authenticated'),
    # path('auth/student/register', views.StudentRegisterView.as_view(), name='student_register'),
    # path('auth/teacher/register', views.TeacherRegisterView.as_view(), name='teacher_register'),
    path('auth/register', views.UserRegisterView.as_view()),
    path('auth/login', views.LoginView.as_view(), name='login'),
    path('auth/logout', views.LogoutView.as_view(), name='logout'),
]
