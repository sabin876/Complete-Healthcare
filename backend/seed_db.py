import os
import django
from datetime import date, timedelta

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_backend.settings')
django.setup()

from django.contrib.auth.models import User
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

    # Create Django Superuser for Admin access (admin / admin123)
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
        print("Created Django Superuser: admin / admin123")

    print("Seeding Staff Profiles...")
    admin_profile = StaffProfile.objects.create(
        staff_id='ADMIN-001',
        full_name='System Administrator',
        position='Admin Officer',
        department='Administration',
        password='Admin@2024',
        role='admin'
    )

    print("Seeding Orthopedic & Healthcare Blog Posts...")
    all_posts_data = [
        {
            "id": 1,
            "title": "Advantages of Stem Cells: Regenerative Medicine Supports Healing and Recovery",
            "author": "Corx",
            "date": "May 22, 2026",
            "category": "Home Healthcare",
            "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
            "excerpt": "Stem cells don't just replace damaged tissue — they can become it, and they signal the body to repair itself faster.",
            "read_time": "6 min read",
            "content": "<p>Stem cells are probably one of the most significant breakthroughs in modern regenerative medicine...</p>"
        },
        {
            "id": 2,
            "title": "Alignment concept: Total Knee Replacement",
            "author": "Dr. Ulhas Sonar",
            "date": "May 30, 2026",
            "category": "KNEE-REPLACEMENT",
            "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
            "excerpt": "Exploring modern kinematic alignment concepts to preserve natural joint motion and improve long-term functional recovery.",
            "read_time": "5 min read",
            "content": "<p>Total Knee Replacement (TKR) has evolved dramatically with customized kinematic alignment...</p>"
        },
        {
            "id": 3,
            "title": "The Evolution of TKR Implants",
            "author": "Dr. Ulhas Sonar",
            "date": "May 30, 2026",
            "category": "TKR IMPLANTS",
            "image": "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80",
            "excerpt": "Advancing toward precision and performance. Total Knee Replacement implants have come a long way with biocompatible alloys.",
            "read_time": "6 min read",
            "content": "<p>The materials and geometry of knee implants have undergone revolutionary improvements...</p>"
        },
        {
            "id": 4,
            "title": "Steps in Total Knee Replacement",
            "author": "Dr. Ulhas Sonar",
            "date": "May 30, 2026",
            "category": "TOTAL KNEE REPLACEMENT (TKR)",
            "image": "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?w=1200&q=80",
            "excerpt": "A surgical overview by Dr. Ulhas Sonar detailing step-by-step joint preparation and precision alignment.",
            "read_time": "5 min read",
            "content": "<p>Steps in Total Knee Replacement. A surgical overview for patient understanding...</p>"
        },
        {
            "id": 5,
            "title": "WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE",
            "author": "Corx",
            "date": "April 16, 2026",
            "category": "Home Physiotherapy",
            "image": "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&q=80",
            "excerpt": "Read more about WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE and how it can help you achieve better health outcomes.",
            "read_time": "5 min read",
            "content": "<p>Full content for WHAT IS PHYSIOTHERAPY? A COMPREHENSIVE GUIDE.</p>"
        }
    ]

    for post in all_posts_data:
        BlogPost.objects.create(
            title=post["title"],
            author=post["author"],
            date=post["date"],
            category=post["category"],
            image=post["image"],
            excerpt=post["excerpt"],
            read_time=post["read_time"],
            content=post["content"]
        )
    print(f"Successfully seeded {len(all_posts_data)} blog posts.")

    print("Seeding Services...")
    services_list = [
        {
            "slug": "physiotherapy",
            "title": "Home Physiotherapy",
            "eyebrow": "Physiotherapy at Home in Dubai",
            "tagline": "Rehabilitative treatment & pain management in your home.",
            "description": "DHA-licensed physical therapists bring personalized exercise and rehabilitation directly to your residence.",
            "icon": "Activity",
            "theme_color": "#63b158",
        },
        {
            "slug": "iv-therapy",
            "title": "IV Therapy | IV Drip",
            "eyebrow": "24/7 IV Drip at Home in Dubai",
            "tagline": "Vitamin infusion & rapid hydration therapy.",
            "description": "Customized IV drip infusions administered by registered nurses for energy, immunity, and recovery.",
            "icon": "Droplets",
            "theme_color": "#38bdf8",
        },
        {
            "slug": "nursing",
            "title": "Home Nursing Services",
            "eyebrow": "DHA-Licensed Home Nursing in Dubai",
            "tagline": "24/7 Professional nursing care at home.",
            "description": "Post-surgical care, wound dressing, palliative care, and continuous patient monitoring.",
            "icon": "HeartPulse",
            "theme_color": "#f43f5e",
        },
        {
            "slug": "doctor-on-call",
            "title": "Doctor On Call",
            "eyebrow": "24/7 Doctor Home & Hotel Visits in Dubai",
            "tagline": "DHA-registered physicians at your doorstep in 30-45 mins.",
            "description": "Urgent consultations, health checkups, prescription issuance, and home care treatment.",
            "icon": "Stethoscope",
            "theme_color": "#fbbf24",
        }
    ]

    for s in services_list:
        Service.objects.create(
            slug=s["slug"],
            title=s["title"],
            eyebrow=s["eyebrow"],
            tagline=s["tagline"],
            description=s["description"],
            icon=s["icon"],
            theme_color=s["theme_color"]
        )
    print(f"Successfully seeded {len(services_list)} services.")

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
