from django.db import models


class Institute(models.Model):
    short_name = models.CharField(max_length=10, unique=True, primary_key=True)
    name = models.CharField(max_length=150)

    # objects = models.Manager()

    def __str__(self):
        return f"{self.short_name}"


class Direction(models.Model):
    # institute = models.ForeignKey(Institute, on_delete=models.SET_NULL, null=True)
    code = models.CharField(max_length=8, unique=True, primary_key=True)
    name = models.CharField(max_length=150)

    # objects = models.Manager()

    def __str__(self):
        return f"{self.code} - {self.name}"


