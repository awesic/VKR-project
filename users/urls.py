from django.urls import path

from users.views import UserViewSet, StudentViewSet, TeacherViewSet

urlpatterns = [
    path('users-list/', UserViewSet.as_view({'get': 'list'}), name='users'),
    path('student/', StudentViewSet.as_view({'get': 'list'}), name='student'),
    path('teacher/', TeacherViewSet.as_view({'get': 'list'}), name='teacher'),
]
