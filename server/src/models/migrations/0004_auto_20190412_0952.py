# Generated by Django 2.2 on 2019-04-12 09:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0003_auto_20190408_0746'),
    ]

    operations = [
        migrations.RenameField(
            model_name='wanted',
            old_name='name',
            new_name='firstName',
        ),
        migrations.RemoveField(
            model_name='wanted',
            name='wantedLevel',
        ),
    ]
