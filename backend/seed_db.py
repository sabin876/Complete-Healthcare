import os
import django
from datetime import date, timedelta

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_backend.settings')
django.setup()

from api.models import (
    StaffProfile, Task, LeaveApplication,
    OtApplication, SalaryApplication, NoticeApplication, DutyApplication
)

def seed():
    print("Clearing database...")
    Task.objects.all().delete()
    LeaveApplication.objects.all().delete()
    OtApplication.objects.all().delete()
    SalaryApplication.objects.all().delete()
    NoticeApplication.objects.all().delete()
    DutyApplication.objects.all().delete()
    StaffProfile.objects.all().delete()

    print("Seeding Staff Profiles...")
    admin = StaffProfile.objects.create(
        staff_id='ADMIN-001',
        full_name='System Administrator',
        position='Admin Officer',
        department='Administration',
        password='Admin@2024',
        role='admin'
    )
    clara = StaffProfile.objects.create(
        staff_id='STF-CO1234',
        full_name='Clara Oswald',
        position='Senior Nurse',
        department='Home Nursing',
        password='Staff@2024',
        role='staff'
    )
    john = StaffProfile.objects.create(
        staff_id='STF-JS5678',
        full_name='John Smith',
        position='Physiotherapist',
        department='Physiotherapy',
        password='Staff@2024',
        role='staff'
    )

    print("Seeding Tasks...")
    Task.objects.create(
        title='DHA Nursing Compliance Review',
        description='Ensure all patient files for this week have updated vitals logs and signed DHA consent forms.',
        priority='High',
        due_date=date.today() + timedelta(days=2),
        assigned_to=clara,
        assigned_to_name=clara.full_name,
        assigned_by_name=admin.full_name,
        status='Pending'
    )
    Task.objects.create(
        title='Home Patient Assessment',
        description='Perform a routine checkup and vital assessment for Patient ID: PAT-992 (Mr. Henderson).',
        priority='Medium',
        due_date=date.today() + timedelta(days=4),
        assigned_to=clara,
        assigned_to_name=clara.full_name,
        assigned_by_name=admin.full_name,
        status='In Progress'
    )

    print("Seeding Leave Applications...")
    LeaveApplication.objects.create(
        staff=clara,
        staff_name=clara.full_name,
        staff_dep=clara.department,
        staff_position=clara.position,
        leave_type='Annual Leave',
        leave_start=date.today() + timedelta(days=10),
        leave_end=date.today() + timedelta(days=15),
        reason='Family vacation trip',
        status='Approved'
    )

    print("Seeding OT Applications...")
    OtApplication.objects.create(
        staff=clara,
        staff_name=clara.full_name,
        staff_dep=clara.department,
        staff_position=clara.position,
        ot_type='Weekend Shift',
        ot_date=date.today() - timedelta(days=2),
        ot_hours='6.5',
        status='Pending'
    )

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
