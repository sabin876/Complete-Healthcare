# Generated manually for complete-healthcare service parent relation

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_service_features_service_indications_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='parent',
            field=models.ForeignKey(blank=True, help_text='Select a parent service if this is a sub-service', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='sub_services', to='api.service'),
        ),
    ]
