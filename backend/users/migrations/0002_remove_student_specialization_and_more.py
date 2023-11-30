# Generated by Django 4.2.7 on 2023-11-29 10:38

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="student",
            name="specialization",
        ),
        migrations.RemoveField(
            model_name="teacher",
            name="specialization",
        ),
        migrations.AddField(
            model_name="student",
            name="direction",
            field=models.CharField(
                blank=True, max_length=150, verbose_name="direction"
            ),
        ),
        migrations.AddField(
            model_name="teacher",
            name="direction",
            field=models.CharField(
                blank=True, max_length=150, verbose_name="direction"
            ),
        ),
    ]
