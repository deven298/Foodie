# Generated by Django 4.2.5 on 2023-09-14 17:12

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("foodie", "0001_initial"),
    ]

    operations = [
        migrations.DeleteModel(
            name="TodaySpecial",
        ),
        migrations.AlterField(
            model_name="menuitem",
            name="is_special",
            field=models.BooleanField(default=False),
        ),
    ]