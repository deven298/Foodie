# Generated by Django 4.2.5 on 2023-09-26 07:25

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("foodie", "0004_alter_order_status_review"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="review",
            name="order",
        ),
        migrations.AddField(
            model_name="order",
            name="reviews",
            field=models.ManyToManyField(blank=True, to="foodie.review"),
        ),
    ]
