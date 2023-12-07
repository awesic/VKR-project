# Generated by Django 4.2.7 on 2023-12-06 18:59

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Direction",
            fields=[
                (
                    "code",
                    models.CharField(
                        max_length=8, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("name", models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name="Institute",
            fields=[
                (
                    "short_name",
                    models.CharField(
                        max_length=10, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("name", models.CharField(max_length=150)),
            ],
        ),
    ]