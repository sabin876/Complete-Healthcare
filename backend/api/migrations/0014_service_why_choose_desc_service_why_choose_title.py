# Generated for why_choose_title and why_choose_desc

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_service_indications_description_service_indications_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='why_choose_title',
            field=models.CharField(blank=True, default='', help_text='Custom Heading for Why Choose CORx Healthcare / Reasons Section', max_length=300),
        ),
        migrations.AddField(
            model_name='service',
            name='why_choose_desc',
            field=models.TextField(blank=True, default='', help_text='Custom Heading Description for Why Choose CORx Healthcare / Reasons Section'),
        ),
    ]
