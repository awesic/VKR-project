from django.contrib.auth.hashers import make_password
from rest_framework import authentication, permissions, status
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from rest_framework import viewsets

from users.models import User, Student, Teacher
from users.serializers import UserSerializer, StudentSerializer, TeacherSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = (authentication.TokenAuthentication, authentication.SessionAuthentication)
    lookup_field = 'pk'

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.IsAuthenticatedOrReadOnly(),)
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(),)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if 'password' not in serializer.validated_data:
                return Response({'error': 'Password is required'}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.create_user(**serializer.validated_data)

            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            serializer.validated_data['token'] = token

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        if 'password' in self.request.data:
            password = make_password(self.request.data['password'])
            serializer.save(password=password)
        else:
            serializer.save()


class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows students to be viewed or edited
    """
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows students to be viewed or edited
    """
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer