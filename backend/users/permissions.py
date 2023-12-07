from rest_framework import permissions


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        return str(request.user.role).lower() == 'student'


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        return str(request.user.role).lower() == 'teacher'