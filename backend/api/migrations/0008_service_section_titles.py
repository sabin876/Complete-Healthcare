# Generated manually for section custom titles

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_service_parent'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='about_section_title',
            field=models.CharField(blank=True, default='', help_text="Override the 'About this service' title", max_length=200),
        ),
        migrations.AddField(
            model_name='service',
            name='indications_section_title',
            field=models.CharField(blank=True, default='', help_text="Override the 'Who May Need this service' title", max_length=200),
        ),
        migrations.AddField(
            model_name='service',
            name='comprehensive_section_title',
            field=models.CharField(blank=True, default='', help_text="Override the 'Comprehensive Services' title", max_length=200),
        ),
        migrations.AddField(
            model_name='service',
            name='faq_section_title',
            field=models.CharField(blank=True, default='', help_text="Override the 'FAQs' title", max_length=200),
        ),
    ]
