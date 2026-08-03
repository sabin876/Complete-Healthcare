# Generated for meta_title and meta_description

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_service_understanding_image_file_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='meta_title',
            field=models.CharField(blank=True, default='', help_text='Custom SEO & OpenGraph Title Tag for this Service Page', max_length=300),
        ),
        migrations.AddField(
            model_name='service',
            name='meta_description',
            field=models.TextField(blank=True, default='', help_text='Custom SEO & OpenGraph Meta Description for this Service Page'),
        ),
    ]
