import json

from django.core.management import BaseCommand

from config import settings
from directions.models import Institute


class Command(BaseCommand):
    help = "Import institutes from json file"

    def handle(self, *args, **options):
        file_path = settings.BASE_DIR / 'data' / 'institutes.json'
        with open(file_path) as file:
            data = json.load(file)
            for data_object in data:
                short_name = data_object.get('short_name')
                name = data_object.get('name')
                try:
                    institute, created = Institute.objects.get_or_create(short_name=short_name, name=name)
                    if created:
                        institute.save()
                        print(f'\n{institute} was created')
                except Exception as e:
                    print(str(e))
                    print(f'Something went wrong while importing: {short_name}')