import os
import django
from datetime import date, timedelta

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_backend.settings')
django.setup()

import json
from pathlib import Path

from api.models import (
    StaffProfile, Task, LeaveApplication,
    OtApplication, SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service
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
    BlogPost.objects.all().delete()
    Service.objects.all().delete()

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

    print("Seeding Services from services.json...")
    services_json_path = Path("C:/Users/DELL/.gemini/antigravity/brain/3cdb892f-7563-47a2-ac62-35c9607351ea/scratch/services.json")
    if services_json_path.exists():
        with open(services_json_path, 'r', encoding='utf-8') as f:
            services_data = json.load(f)
        for slug, data in services_data.items():
            Service.objects.create(
                slug=slug,
                title=data.get('title', ''),
                eyebrow=data.get('eyebrow', ''),
                tagline=data.get('tagline', ''),
                description=data.get('description', ''),
                icon=data.get('icon', 'Activity'),
                theme_color=data.get('themeColor', '#08709d'),
                floating_badge=data.get('floatingBadge', {}),
                benefits=data.get('benefits', []),
                faqs=data.get('faqs', []),
                locations=data.get('locations', [])
            )
        print(f"Successfully seeded {len(services_data)} services.")
    else:
        print("services.json not found! Skipping services seeding.")

    print("Seeding Blog Posts...")
    all_posts_data = [
        {"title": "WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE", "author": "Corx", "date": "April 16, 2026", "category": "Home Physiotherapy"},
        {"title": "Burnout in Working Professionals: Signs & Solutions", "author": "Corx", "date": "March 18, 2026", "category": "Home Healthcare"},
        {"title": "Doctor at Home vs Hospital Visit: What’s Better in 2026?", "author": "Corx", "date": "February 12, 2026", "category": "Home Healthcare"},
        {"title": "Managing Chronic Conditions With Home Healthcare Support", "author": "Corx", "date": "January 20, 2026", "category": "Home Healthcare"},
        {"title": "10 Signs Your Loved One Might Need Home Nursing Care", "author": "Corx", "date": "January 6, 2026", "category": "Home Nursing"},
        {"title": "The Complete Guide to IV Therapy at Home", "author": "Corx", "date": "December 16, 2025", "category": "Home Healthcare"},
        {"title": "Pediatric Home Healthcare: Ensuring Comfort for Children", "author": "Corx", "date": "November 12, 2025", "category": "Home Healthcare"},
        {"title": "What to Expect From a Doctor at Home Visit", "author": "Corx", "date": "October 12, 2025", "category": "Home Healthcare"},
        {"title": "Why Home Healthcare Is Becoming Essential in Dubai", "author": "Corx", "date": "September 12, 2025", "category": "Home Healthcare"},
        {"title": "Why Post-Surgery Home Care is Essential for Recovery", "author": "Corx", "date": "August 28, 2025", "category": "Home Healthcare"},
        {"title": "Holistic Healing: Physiotherapy Plus Lifestyle Support at Home", "author": "Corx", "date": "August 21, 2025", "category": "Home Physiotherapy"},
        {"title": "Why Home Physiotherapy is the Future of Recovery?", "author": "Corx", "date": "July 30, 2025", "category": "Home Physiotherapy"},
        {"title": "Chronic Pain Solutions in Dubai: How Physiotherapy Can Help?", "author": "Corx", "date": "June 27, 2025", "category": "Home Physiotherapy"},
        {"title": "Hydration & Energy: The Role of IV Drips in Dubai’s Wellness Trend", "author": "Corx", "date": "June 24, 2025", "category": "IV Therapy"},
        {"title": "How Corx Healthcare Is Revolutionizing Doctor on Call Services in Dubai?", "author": "Corx", "date": "June 17, 2025", "category": "Doctor on Call"},
        {"title": "Elderly Care Services in Dubai: Providing Comfort and Dignity at Home", "author": "Corx", "date": "June 13, 2025", "category": "Elderly Care"},
        {"title": "How IV Therapy Is Changing Healthcare in Dubai: Boost Your Energy Today", "author": "Corx", "date": "June 11, 2025", "category": "IV Therapy"},
        {"title": "The Benefits of Home Nursing Services in Dubai: Care You Can Trust", "author": "Corx", "date": "June 5, 2025", "category": "Home Nursing"},
    ]
    for post in all_posts_data:
        BlogPost.objects.create(
            title=post["title"],
            author=post["author"],
            date=post["date"],
            category=post["category"],
            image="https://www.corx.ae/wp-content/uploads/placeholder.jpg",
            excerpt=f"Read more about {post['title']} and how it can help you achieve better health outcomes.",
            read_time="5 min read",
            content=f"<p>Full content for {post['title']} coming soon.</p>"
        )
    print(f"Successfully seeded {len(all_posts_data)} blog posts.")

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
