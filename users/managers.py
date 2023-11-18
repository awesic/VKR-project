from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """
    Custom user model manager where create user without username
    """
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("Почта должна быть заполнена"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_("У superuser'a должно быть is_staff=True"))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_("У superuser'a должно быть is_superuser=True"))
        return self.create_user(email, password, **extra_fields)


class TeacherManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        result = super().get_queryset(*args, **kwargs)
        return result.filter(role='TEACHER')


class StudentManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        result = super().get_queryset(*args, **kwargs)
        return result.filter(role='Student')