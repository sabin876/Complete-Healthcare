# Generated for lab_columns_title and lab_columns_description

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_service_meta_description_service_meta_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='lab_columns_title',
            field=models.CharField(blank=True, default='', help_text='Custom Heading for Diagnostic Test Suites / Lab Columns Section', max_length=300),
        ),
        migrations.AddField(
            model_name='service',
            name='lab_columns_description',
            field=models.TextField(blank=True, default='', help_text='Custom Heading Description for Diagnostic Test Suites / Lab Columns Section'),
        ),
    ]
