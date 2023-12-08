from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import generics, views, status, exceptions
from rest_framework.response import Response

from users.permissions import IsStudent, IsTeacher
from users import models, serializers


class ThemePreferTeacherChangeView(generics.UpdateAPIView):
    permission_classes = [IsStudent]
    serializer_class = serializers.StudentSerializer
    queryset = models.Student.objects.all()
    lookup_field = 'email'

    def get_object(self):
        try:
            instance = self.queryset.get(email=self.request.user)
            return instance
        except models.Student.DoesNotExist:
            raise exceptions.NotFound("Student")

    def put(self, request, *args, **kwargs):
        try:
            if 'theme_approved' not in request.data and 'teacher_approved' not in request.data:
                serializer = self.serializer_class(self.get_object(), data=request.data, partial=True)

                if serializer.is_valid():
                    serializer.save()
                    # student = serializers.StudentSerializer(student)
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        except:
            return Response({"error": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


class AdminActionsView(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]

    def put(self, request, *args, **kwargs):
        try:
            serializer = None
            if kwargs['who'] == 'student':
                obj = models.Student.objects.get(email=kwargs['email'])
                serializer = serializers.StudentSerializer(obj, data=request.data, partial=True)
            elif kwargs['who'] == 'teacher':
                obj = models.Teacher.objects.get(email=kwargs['email'])
                serializer = serializers.TeacherSerializer(obj, data=request.data, partial=False)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


class TeacherPreferThemeChangeView(generics.UpdateAPIView):
    permission_classes = [IsTeacher]

    def put(self, request, *args, **kwargs):
        try:
            obj = models.Student.objects.get(email=kwargs['email'])
            serializer = serializers.StudentSerializer(obj, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"error": "Something went wrong teacher"}, status=status.HTTP_400_BAD_REQUEST)