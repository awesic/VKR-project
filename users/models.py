from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _

from users.utils import year_validation
from users.managers import UserManager, TeacherManager, StudentManager


class User(AbstractUser):
    """
    Custom user model that supports using email instead of username and set ADMIN role ad default
    """
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        TEACHER = 'TEACHER', 'Teacher'
        STUDENT = 'STUDENT', 'Student'

    # base_role = Role.ADMIN

    username = None
    email = models.EmailField(_("email address"), unique=True)
    patronymic = models.CharField(_("patronymic"), max_length=150, blank=True)
    role = models.CharField(_("role"), max_length=50, choices=Role.choices, default=Role.ADMIN)

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


class Teacher(models.Model):
    """
    Custom teacher model that create teachers additional fields
    """
    user = models.OneToOneField(
        User,
        verbose_name='User',
        on_delete=models.CASCADE,
        related_name=_('teacher'),
        null=False
    )
    institute = models.CharField(_("institute"), max_length=150, blank=True)
    specialization = models.CharField(_("specialization"), max_length=150, blank=True)
    # students = ArrayField(models.CharField(max_length=150), blank=True, default=list)

    objects = models.Manager()

    def __str__(self):
        return f'{self.user}'


class Student(models.Model):
    """
    Custom student model that create students additional fields
    """
    user = models.OneToOneField(
        User,
        verbose_name='User',
        on_delete=models.CASCADE,
        related_name=_('student'),
        null=False
    )
    institute = models.CharField(_("institute"), max_length=150, blank=True)
    specialization = models.CharField(_("specialization"), max_length=150, blank=True)
    graduate_year = models.PositiveSmallIntegerField(
        _("graduate year"),
        validators=[year_validation],
        blank=True, null=True
    )
    prefer_teacher = models.ForeignKey(Teacher, on_delete=models.DO_NOTHING, blank=True, null=True)
    theme = models.CharField(_("theme"), max_length=150, blank=True)

    objects = models.Manager()

    def __str__(self):
        return f'{self.user}, {self.graduate_year}'


@receiver(post_save, sender=User)
def create_student_profile(sender, instance, created, **kwargs):
    if created and instance.role == 'STUDENT':
        Student.objects.create(user=instance)
    elif created and instance.role == 'TEACHER':
        Teacher.objects.create(user=instance)
