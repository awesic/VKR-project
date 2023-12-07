from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework import generics, views, status
from rest_framework.response import Response

from users.permissions import IsStudent, IsTeacher
from users import models, serializers


class ThemeChangeView(views.APIView):
    permission_classes = [IsAdminUser | IsStudent | IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        print("req", request)
        model = get_object_or_404(models.Student, pk=kwargs['pk'])
        data = {"theme": request.data["theme"]}
        serializer = serializers.StudentSerializer(model, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

