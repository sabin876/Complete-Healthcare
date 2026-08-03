# Generated for indications_title and indications_description

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_service_lab_columns_description_service_lab_columns_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='indications_title',
            field=models.CharField(blank=True, default='', help_text='Custom Heading for Indications / Who May Need Section', max_length=300),
        ),
        migrations.AddField(
            model_name='service',
            name='indications_description',
            field=models.TextField(blank=True, default='', help_text='Custom Heading Description for Indications / Who May Need Section'),
        ),
    ]
