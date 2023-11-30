import datetime
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError


def year_validation(value):
    if value < datetime.datetime.now().year:
        raise ValidationError(_(f"{value} is not a correct year!"))
