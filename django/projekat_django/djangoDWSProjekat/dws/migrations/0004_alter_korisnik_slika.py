# Generated by Django 3.2.3 on 2021-06-02 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dws', '0003_evidencija_radodkuce'),
    ]

    operations = [
        migrations.AlterField(
            model_name='korisnik',
            name='slika',
            field=models.CharField(default=' ', max_length=50),
        ),
    ]
