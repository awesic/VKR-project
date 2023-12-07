from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, permissions, status

from directions import serializers
from directions.models import Direction, Institute
from rest_framework.response import Response


class DirectionViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Direction.objects.all()
    serializer_class = serializers.DirectionSerializer
    lookup_field = 'code'

    def retrieve(self, request, *args, **kwargs):
        try:
            direction = Direction.objects.filter(code=self.kwargs['code']).first()
            if direction:
                serializer = serializers.DirectionSerializer(direction)
                return Response(serializer.data)
            else:
                return Response({"error": "Direction not found"}, status=status.HTTP_404_NOT_FOUND)
        except Direction.DoesNotExist:
            return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class InstituteViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Institute.objects.all()
    serializer_class = serializers.InstituteSerializer
    lookup_field = 'short_name'

    def retrieve(self, request, *args, **kwargs):
        try:
            institute = Institute.objects.filter(short_name=self.kwargs['short_name']).first()
            if institute:
                serializer = serializers.InstituteSerializer(institute)
                return Response(serializer.data)
            else:
                return Response({"error": "Institute not found"}, status=status.HTTP_404_NOT_FOUND)
        except Institute.DoesNotExist:
            return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)