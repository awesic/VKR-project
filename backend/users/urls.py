from django.urls import path

from users import views

urlpatterns = [
    path('users/', views.UsersListView.as_view(), name='users_list'),
    path('students/', views.StudentViewSet.as_view({'get': 'list'}), name='students_list'),
    path('teachers/', views.TeacherViewSet.as_view({'get': 'list'}), name='teachers_list'),
    path('account/profile', views.ProfileView.as_view(), name='profile'),

    path('csrf_cookie', views.GetCSRFToken.as_view(), name='csrf_token'),
    path('auth/is_authenticated', views.CheckAuthentication.as_view(), name='is_authenticated'),
    path('auth/student/register', views.StudentRegisterView.as_view(), name='student_register'),
    path('auth/teacher/register', views.TeacherRegisterView.as_view(), name='teacher_register'),
    path('auth/admin/register', views.AdminRegisterView.as_view(), name='admin_register'),
    path('auth/login', views.LoginView.as_view(), name='login'),
    path('auth/logout', views.LogoutView.as_view(), name='logout'),
]
