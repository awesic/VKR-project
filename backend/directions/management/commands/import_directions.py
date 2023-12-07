import json

from django.core.management import BaseCommand

from config import settings
from directions.models import Direction


class Command(BaseCommand):
    help = 'Import directions from json file'

    def handle(self, *args, **options):
        file_path = settings.BASE_DIR / 'data' / 'directions.json'
        with open(file_path) as file:
            data = json.load(file)
            for data_object in data:
                code = data_object.get('code')
                name = data_object.get('name')
                try:
                    direction, created = Direction.objects.get_or_create(code=code, name=name)
                    if created:
                        direction.save()
                        print(f'\n{direction} was created')
                except Exception as e:
                    print(str(e))
                    print(f'Something went wrong while importing: {code} {name}')
