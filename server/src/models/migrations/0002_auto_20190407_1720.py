# Generated by Django 2.2 on 2019-04-07 17:20

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('models', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wanted',
            name='passenger',
        ),
        migrations.AddField(
            model_name='passenger',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='passenger/'),
        ),
        migrations.AddField(
            model_name='wanted',
            name='lastName',
            field=models.CharField(default='default', max_length=255),
        ),
        migrations.AddField(
            model_name='wanted',
            name='name',
            field=models.CharField(default='default', max_length=255),
        ),
        migrations.AddField(
            model_name='wanted',
            name='photo',
            field=models.ImageField(blank=True, null=True, upload_to='wanted/'),
        ),
        migrations.AddField(
            model_name='wanted',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='wanted',
            name='updated',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
