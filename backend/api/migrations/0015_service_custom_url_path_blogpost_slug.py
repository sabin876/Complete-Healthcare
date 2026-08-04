# Generated migration for custom_url_path and blogpost slug

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_service_why_choose_desc_service_why_choose_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='custom_url_path',
            field=models.CharField(blank=True, default='', help_text="Custom URL path alias for frontend navigation (e.g. '/lab-test-at-home')", max_length=200),
        ),
        migrations.AddField(
            model_name='blogpost',
            name='slug',
            field=models.CharField(blank=True, default='', help_text='Clean URL slug for this blog post', max_length=250),
        ),
    ]
