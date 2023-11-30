from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from users.services import year_validation
from users.managers import UserManager


class User(AbstractUser):
    """
    Custom user model that supports using email instead of username and set ADMIN role ad default
    """

    class Roles(models.TextChoices):
        ADMIN = 'ADMIN', 'Админ',
        TEACHER = 'TEACHER', 'Преподаватель',
        STUDENT = 'STUDENT', 'Студент'

    username = None
    email = models.EmailField(_("email address"), unique=True)
    patronymic = models.CharField(_("patronymic"), max_length=150, blank=True)
    role = models.CharField(_("role"), max_length=50, choices=Roles.choices, default=Roles.ADMIN)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role', 'first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return f'{self.patronymic} {self.first_name} {self.last_name}'

    @classmethod
    def _check_model(cls):
        errors = []
        return errors

    def student(self):
        student = Student.objects.get(user=self)

    def teacher(self):
        teacher = Teacher.objects.get(user=self)


class Teacher(User):
    """
    Custom teacher model that create teachers additional fields
    """
    institute = models.CharField(_("institute"), max_length=150, blank=True)
    direction = models.CharField(_("direction"), max_length=150, blank=True)

    # students = ArrayField(models.CharField(max_length=150), blank=True, default=list)

    class Meta:
        verbose_name = 'Teacher'

    def __str__(self):
        return f'{self.email}'


class Student(User):
    """
    Custom student model that create students additional fields
    """
    institute = models.CharField(_("institute"), max_length=150, blank=True)
    direction = models.CharField(_("direction"), max_length=150, blank=True)
    graduate_year = models.PositiveSmallIntegerField(_("graduate year"),
                                                     validators=[year_validation], blank=True, null=True)
    prefer_teacher = models.ForeignKey(Teacher, related_name=_("prefer_teacher"), on_delete=models.DO_NOTHING,
                                       blank=True, null=True)
    teacher_approved = models.BooleanField(_("teacher approved"), default=False)
    theme = models.CharField(_("theme"), max_length=150, blank=True)
    theme_approved = models.BooleanField(_("theme approved"), default=False)

    class Meta:
        verbose_name = 'Student'

    def __str__(self):
        return f'{self.email}'
