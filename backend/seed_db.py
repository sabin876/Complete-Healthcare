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
            content=post["content"],
            meta_title=post.get("meta_title", f"{post['title']} | Corx Healthcare Blog Dubai"),
            meta_description=post.get("meta_description", post["excerpt"])
        )
    print(f"Successfully seeded {len(all_posts_data)} blog posts.")

    print("Seeding Services...")
    services_list = [
        {
            "slug": "lab-services",
            "title": "Lab Services | Blood Test at Home",
            "eyebrow": "DHA-Licensed Home Sample Collection Across Dubai",
            "tagline": "Get an Accurate Lab Result at Your Doorsteps",
            "description": "Book a blood test at home in Dubai without visiting a clinic or Hospital. Our home care service provides convenient blood sample collection at your home, hotel, or office by DHA-certified healthcare professionals at an affordable price.",
            "icon": "Activity",
            "theme_color": "#08709d",
            "floating_badge": {
                "title": "Accredited Lab Diagnostics",
                "desc": "Clean, certified medical blood tests right at your home.",
                "about_section_title": "About Blood Test at Home & Home Sample Collection",
                "about_description": "Blood testing is essential for monitoring health, diagnosing medical conditions, and evaluating organ function. With CORx Healthcare, you no longer need to travel to a lab or wait in crowded waiting rooms.\n\nOur DHA-certified nurses visit your home, hotel, or office with sterile, single-use sampling kits to collect blood samples comfortably and safely, delivering accurate digital lab reports within 2 to 4 hours.\n\nWhether you require routine body checkups, diabetes monitoring, lipid profiles, or specialized diagnostic screenings, our senior medical team ensures complete confidentiality and medical accuracy throughout."
            },
            "features": [
                {"title": "24/7 blood test home service"},
                {"title": "Blood test result within 4 Hours"},
                {"title": "On-demand scheduling for convenience"},
                {"title": "DHA licensed doctors and nurses"},
                {"title": "High security and privacy"}
            ],
            "indications": [
                "Routine annual health & body checkups",
                "Swelling, fatigue, or unexplained weakness",
                "Monitoring blood sugar & diabetes markers",
                "Difficulty visiting a clinic or hospital",
                "Checking cholesterol & lipid profile",
                "Vitamin deficiency screening (Vitamin D & B12)",
                "Testing for anemia, iron & hemoglobin levels",
                "Hormonal, thyroid & metabolism evaluation",
                "Food allergy & intolerance diagnostic screening",
                "Liver & kidney function routine monitoring",
                "Elderly care & patients requiring home sampling",
                "Doctor-prescribed follow-up blood tests"
            ],
            "lab_columns": [
                {
                    "title": "Core Screenings",
                    "tagline": "Routine blood & vitals",
                    "iconBg": "bg-blue-50 text-blue-600 border border-blue-100",
                    "tests": [
                        "Allergy test",
                        "Testing for anemia",
                        "Blood sugar test",
                        "Complete blood count",
                        "CRP",
                        "Covid-19 test",
                        "Cholesterol test",
                        "Diabetes test"
                    ]
                },
                {
                    "title": "Organ & Metabolic",
                    "tagline": "Hormonal & organ health",
                    "iconBg": "bg-emerald-50 text-emerald-600 border border-emerald-100",
                    "tests": [
                        "Food sensitivity test",
                        "HbA1C test",
                        "Hepatitis A",
                        "Hepatitis B",
                        "Hormone test",
                        "Influenza test",
                        "Lipid profile",
                        "Liver function test"
                    ]
                },
                {
                    "title": "Advanced Diagnostics",
                    "tagline": "Immunity, viruses & minerals",
                    "iconBg": "bg-amber-50 text-amber-600 border border-amber-100",
                    "tests": [
                        "Microbial culture & sensitivity",
                        "Mineral test",
                        "Renal function test",
                        "Stool test",
                        "Urine test",
                        "Vitamins test",
                        "Food intolerance test",
                        "Electrolytes"
                    ]
                }
            ],
            "reasons": [
                {
                    "num": "01",
                    "label": "LAB SAMPLE COLLECTION",
                    "title": "Lab sample collection by DHA licensed nurses",
                    "desc": "CORx Healthcare provides blood test home service by DHA-licensed nurses, ensuring convenience and professional care. Ideal for regular monitoring or those unable to visit clinics."
                },
                {
                    "num": "02",
                    "label": "FAST RESULTS",
                    "title": "Lab tests results in just 2-3 hours for all routine tests",
                    "desc": "Routine lab tests can be completed in just two to three hours. Fast and reliable, ensuring timely diagnosis and peace of mind. Ideal for urgent health assessments and regular checkups."
                },
                {
                    "num": "03",
                    "label": "ACCREDITED LABS",
                    "title": "Certified & internationally accredited labs",
                    "desc": "CORx Healthcare guarantees the highest standards of accuracy and reliability by using lab samples from internationally accredited and certified facilities. Trust us for precise results and exceptional quality in every test."
                },
                {
                    "num": "04",
                    "label": "SENIOR MEDICAL TEAM",
                    "title": "Direct contact with CORx Healthcare senior medical team",
                    "desc": "Enjoy direct contact with CORx Healthcare senior medical team, ensuring personalized and expert guidance. Benefit from immediate support and professional insights for your healthcare needs, enhancing your treatment and care experience."
                }
            ],
            "steps": [
                {
                    "title": "1. Book An Appointment",
                    "desc": "Call +971 4 332 0776 or WhatsApp Us at +971 54 703 3311 for doctor-on-call service."
                },
                {
                    "title": "2. Doctors & Nurses Will Be At Your Doorstep",
                    "desc": "Our team of DHA-certified Nurses is dedicated to your prompt care. Expect them at your doorstep within just 30 minutes for blood test home service."
                },
                {
                    "title": "3. Accurate Results 24/7 at CORx Healthcare",
                    "desc": "For routine tests, receive your results in just 2 to 3 hours. Confirm the turnaround time (TAT) with our patient relationship executives for precise details."
                }
            ],
            "benefits": [
                {"title": "Stress-Free", "desc": "Simple blood & sample collection right at your home or office"},
                {"title": "Licensed Nurses", "desc": "DHA-licensed nurses using strict sterile clinical protocols"},
                {"title": "Accurate Reports", "desc": "100% accurate results from fully accredited laboratory partners"},
                {"title": "Fast Reporting", "desc": "Fast digital report delivery via email/WhatsApp in 24 hours"}
            ],
            "faqs": [
                {
                    "q": "How soon will I get my blood test results?",
                    "a": "Most routine blood test results are delivered digitally within 2 to 4 hours of sample collection. For specialized or advanced tests, our patient relationship executives will confirm the exact turnaround time (TAT) at the time of booking."
                },
                {
                    "q": "Is home sample collection safe and hygienic?",
                    "a": "Yes, absolutely. Our DHA-licensed nurses follow strict sterile medical protocols using single-use, sealed collection kits for every visit. All samples are transported in temperature-controlled, lab-grade carriers directly to our internationally accredited partner laboratories."
                },
                {
                    "q": "What types of blood tests can be done at home in Dubai?",
                    "a": "We offer 10,000+ tests at home including Complete Blood Count (CBC), Lipid Profile, HbA1C, Liver Function, Kidney Function, Hormones, Vitamins, Allergy panels, Hepatitis A & B, Thyroid profile, and many more. Contact us to confirm availability of any specific test."
                },
                {
                    "q": "How do I book a blood test at home service in Dubai?",
                    "a": "You can book easily by calling +971 4 332 0776, WhatsApp at +971 54 703 3311, or filling out our online appointment form. Our team is available 24/7 and typically confirms your appointment within 30 minutes."
                },
                {
                    "q": "Who collects the blood sample at home?",
                    "a": "All sample collections are performed by our DHA-certified registered nurses with extensive clinical experience. They arrive at your doorstep within 30–60 minutes of booking, equipped with all necessary sterile supplies."
                },
                {
                    "q": "Do you accept insurance for lab tests at home in Dubai?",
                    "a": "We work with a number of insurance providers for direct billing. Please contact our team with your insurance details and we will confirm coverage before your appointment. We also accept cash, credit/debit cards, and bank transfers."
                }
            ]
        },
        {
            "slug": "physiotherapy",
            "title": "Home Physiotherapy",
            "eyebrow": "Physiotherapy at Home in Dubai",
            "tagline": "Rehabilitative treatment & pain management in your home.",
            "description": "DHA-licensed physical therapists bring personalized exercise and rehabilitation directly to your residence.",
            "icon": "Activity",
            "theme_color": "#63b158",
            "floating_badge": {
                "title": "Home, hotel, or office visits",
                "desc": "Professional physiotherapy tailored to your schedule and condition."
            },
            "benefits": [
                {"title": "DHA-Licensed", "desc": "licensed physiotherapists for home visits across Dubai"},
                {"title": "Flexible Locations", "desc": "Physiotherapy at home, hotel, or office with flexible scheduling"},
                {"title": "Customized Programs", "desc": "Personalized treatment plans for faster and safe recovery"},
                {"title": "Transparent Pricing", "desc": "Transparent pricing structure with no hidden costs"}
            ]
        },
        {
            "slug": "iv-therapy",
            "title": "IV Therapy | IV Drip",
            "eyebrow": "24/7 IV Drip at Home in Dubai",
            "tagline": "Vitamin infusion & rapid hydration therapy.",
            "description": "Customized IV drip infusions administered by registered nurses for energy, immunity, and recovery.",
            "icon": "Droplets",
            "theme_color": "#38bdf8",
            "floating_badge": {
                "title": "Rapid Cellular Rehydration",
                "desc": "Formulated drips tailored to restore energy and wellness."
            },
            "benefits": [
                {"title": "Premium Blends", "desc": "DHA-approved vitamin formulations for energy, immunity & beauty"},
                {"title": "Expert Care", "desc": "Administered by licensed DHA-registered nurses in 30-45 minutes"},
                {"title": "Direct Absorption", "desc": "100% absorption for immediate hydration, detox & cell revitality"},
                {"title": "Sterile Setup", "desc": "Safe, clean clinical setup at your convenient time and location"}
            ]
        },
        {
            "slug": "nursing",
            "title": "Home Nursing Services",
            "eyebrow": "DHA-Licensed Home Nursing in Dubai",
            "tagline": "24/7 Professional nursing care at home.",
            "description": "Post-surgical care, wound dressing, palliative care, and continuous patient monitoring.",
            "icon": "HeartPulse",
            "theme_color": "#f43f5e",
            "floating_badge": {
                "title": "Hospital-grade Care at Home",
                "desc": "Compassionate clinical nursing support available 24/7."
            },
            "benefits": [
                {"title": "Licensed Nurses", "desc": "Experienced DHA-registered nurses for pediatric & geriatric care"},
                {"title": "Flexible Shifts", "desc": "Flexible visits: hourly sessions, 12h shifts, or 24/7 care"},
                {"title": "Clinical Standards", "desc": "Hospital-grade clinical standards, hygiene, and monitoring"},
                {"title": "Doctor-Guided", "desc": "Close coordination with your family doctor or surgeon"}
            ]
        },
        {
            "slug": "doctor-on-call",
            "title": "Doctor On Call",
            "eyebrow": "24/7 Doctor Home & Hotel Visits in Dubai",
            "tagline": "DHA-registered physicians at your doorstep in 30-45 mins.",
            "description": "Urgent consultations, health checkups, prescription issuance, and home care treatment.",
            "icon": "Stethoscope",
            "theme_color": "#fbbf24",
            "floating_badge": {
                "title": "Urgent Medical Consultation",
                "desc": "Qualified medical doctors at your doorstep day or night."
            },
            "benefits": [
                {"title": "Rapid Response", "desc": "DHA-licensed family physicians arriving in 30-45 minutes"},
                {"title": "24/7 Medical Care", "desc": "Round-the-clock support on weekends and public holidays"},
                {"title": "Diagnostics On-site", "desc": "On-site diagnostic checks & electronic prescriptions"},
                {"title": "Official Certification", "desc": "Official medical certificates & insurance claim documentation"}
            ]
        },
        {
            "slug": "elderly-care",
            "title": "Elderly Home Care Services",
            "eyebrow": "Compassionate senior care & companionship",
            "tagline": "Dedicated care, support, and companionship for your senior loved ones.",
            "description": "Want the best comfort and support for your aging loved ones? Our empathetic caregivers provide professional assistance with daily activities, personal hygiene, nutritional support, mobility, and medication reminders.",
            "icon": "Users",
            "theme_color": "#5eb63b",
            "floating_badge": {
                "title": "Empathetic Senior Care",
                "desc": "Committed to senior safety, dignity, and companionship."
            },
            "benefits": [
                {"title": "Specialized Staff", "desc": "Trained caregivers for cognitive, dementia & Alzheimer's support"},
                {"title": "Daily Assistance", "desc": "Companionship, daily mobility support, and fall prevention"},
                {"title": "Family Peace of Mind", "desc": "Continuous updates and clear communication with family members"},
                {"title": "Flexible Live-In", "desc": "Tailored care schedules from basic check-ins to 24/7 live-in care"}
            ]
        }
    ]

    # Sub-services for Home Nursing (nursing) and Doctor On Call (doctor-on-call)
    sub_services_list = [
        {
            "slug": "palliative-care",
            "title": "Palliative Care",
            "eyebrow": "Compassionate Support for Advanced Illness",
            "tagline": "Comfort-focused care & symptom management.",
            "description": "Providing relief from the symptoms and stress of a serious illness to improve quality of life for the patient and the family.",
            "icon": "HeartHandshake",
            "theme_color": "#f43f5e",
            "parent_slug": "nursing",
            "floating_badge": {
                "title": "Comfort & Quality of Life",
                "desc": "Empathetic medical, emotional, and social support for long-term health needs."
            },
            "benefits": [
                {"title": "Pain Management", "desc": "Expert clinical monitoring and symptom relief under medical guidance"},
                {"title": "Holistic Support", "desc": "Addressing emotional, spiritual, and physical health aspects"},
                {"title": "Family Guidance", "desc": "Close support, communication, and training for family caregivers"}
            ]
        },
        {
            "slug": "night-care-nurse",
            "title": "Night Care Nurse",
            "eyebrow": "Dedicated Overnight Nursing Care",
            "tagline": "Continuous clinical monitoring & overnight assistance.",
            "description": "Registered nurses provide medical monitoring, medication management, and patient assistance throughout the night.",
            "icon": "Clock",
            "theme_color": "#f43f5e",
            "parent_slug": "nursing",
            "floating_badge": {
                "title": "Overnight Safety",
                "desc": "Peace of mind while your loved ones are professionally monitored overnight."
            },
            "benefits": [
                {"title": "24/7 Watch", "desc": "Continuous checks on vitals and overnight response"},
                {"title": "Sleep Support", "desc": "Allowing family members to rest while clinicians manage night duties"},
                {"title": "Medication Timing", "desc": "Timely administration of critical night-time prescriptions"}
            ]
        },
        {
            "slug": "injection-at-home",
            "title": "Nurse for Injection",
            "eyebrow": "At-Home Injections & IV Infusions",
            "tagline": "Safe, sterile injection administration at your home.",
            "description": "DHA-licensed nurses visit your home or hotel room to safely administer prescribed injections, IV lines, or medications.",
            "icon": "Activity",
            "theme_color": "#f43f5e",
            "parent_slug": "nursing",
            "floating_badge": {
                "title": "Certified Clinical Safety",
                "desc": "Avoiding hospital visits for routine or critical injections."
            },
            "benefits": [
                {"title": "Accurate Dosage", "desc": "Sterile preparation and exact dosage compliance under physician guidelines"},
                {"title": "Immediate Care", "desc": "Saves time and effort, especially for patients with limited mobility"},
                {"title": "Diverse Injections", "desc": "Intramuscular, subcutaneous, or intravenous administration"}
            ]
        },
        {
            "slug": "wound-care",
            "title": "Wound Care Services",
            "eyebrow": "Specialized Clinical Wound Dressing",
            "tagline": "Advanced dressing & wound management at home.",
            "description": "Professional treatment and recovery programs for surgical wounds, pressure ulcers, diabetic wounds, and minor injuries.",
            "icon": "HeartPulse",
            "theme_color": "#f43f5e",
            "parent_slug": "nursing",
            "floating_badge": {
                "title": "Faster Wound Healing",
                "desc": "Clinical hygiene protocols to prevent infection and encourage recovery."
            },
            "benefits": [
                {"title": "Infection Control", "desc": "Strict sterile protocols using hospital-grade clinical dressings"},
                {"title": "Healing Tracking", "desc": "Continuous monitoring and progress logging for surgical wounds"},
                {"title": "Doctor Liaison", "desc": "Close coordination with surgeons for suture removal and reviews"}
            ]
        },
        {
            "slug": "oxygen-therapy",
            "title": "Oxygen Therapy",
            "eyebrow": "At-Home Respiratory Care & Support",
            "tagline": "Oxygen administration and respiratory monitoring.",
            "description": "DHA-licensed nurses assist patients requiring oxygen support or respiratory therapies in a familiar environment.",
            "icon": "Droplets",
            "theme_color": "#f43f5e",
            "parent_slug": "nursing",
            "floating_badge": {
                "title": "Respiratory Support",
                "desc": "Professional clinical oversight for oxygen concentrators and breathing support."
            },
            "benefits": [
                {"title": "Vitals Monitoring", "desc": "Continuous checking of blood oxygen levels (SpO2) and pulse"},
                {"title": "Equipment Safety", "desc": "Safe setup, cannula checks, and settings adjustments"},
                {"title": "Patient Familiarity", "desc": "Delivering complex respiratory care safely at home"}
            ]
        },
        {
            "slug": "doctor-at-home",
            "title": "Doctor at Home",
            "eyebrow": "24/7 At-Home Doctor Visits in Dubai",
            "tagline": "Licensed physicians arriving at your home in 30-45 mins.",
            "description": "Urgent consultations, diagnostic checks, and prescriptions issued right inside your living room.",
            "icon": "Stethoscope",
            "theme_color": "#fbbf24",
            "parent_slug": "doctor-on-call",
            "floating_badge": {
                "title": "30-Min Rapid Response",
                "desc": "Direct access to emergency primary physicians in Dubai."
            },
            "benefits": [
                {"title": "Fast Home Visits", "desc": "Doctors at your doorstep day or night within 30-45 minutes"},
                {"title": "Diagnosis & Rx", "desc": "Immediate diagnostic vitals and prescription issuance"},
                {"title": "Comfort of Home", "desc": "Avoiding ER waiting rooms and traffic stresses"}
            ]
        },
        {
            "slug": "doctor-at-office",
            "title": "Doctor at Office",
            "eyebrow": "Workplace Physician Visits & Consultations",
            "tagline": "Corporate medical checkups and workplace doctor calls.",
            "description": "On-demand doctor visits to corporate office locations across Dubai for staff assessments, checkups, or wellness reviews.",
            "icon": "Stethoscope",
            "theme_color": "#fbbf24",
            "parent_slug": "doctor-on-call",
            "floating_badge": {
                "title": "Corporate Wellness",
                "desc": "Protecting workforce productivity and health through on-site primary care."
            },
            "benefits": [
                {"title": "Corporate Visits", "desc": "Doctors sent directly to your corporate headquarters or offices"},
                {"title": "Preventative Care", "desc": "Screenings, blood pressure checks, and prescription renewals"},
                {"title": "Zero Work Downtime", "desc": "Employees get treated on-site without travel delays"}
            ]
        },
        {
            "slug": "doctor-at-hotel",
            "title": "Doctor at Hotel",
            "eyebrow": "Hotel Room Medical Consultations",
            "tagline": "24/7 On-demand doctor calls for Dubai hotel guests.",
            "description": "DHA-licensed doctors travel directly to your hotel room for immediate diagnosis, treatment, or prescription renewals.",
            "icon": "Stethoscope",
            "theme_color": "#fbbf24",
            "parent_slug": "doctor-on-call",
            "floating_badge": {
                "title": "Hotel Room Care", 
                "desc": "Doctors arriving directly at your hotel room in 30-45 minutes"
            },
            "benefits": [
                {"title": "Insurance Friendly", "desc": "Official medical reports for travel insurance reimbursement"},
                {"title": "On-call Assistance", "desc": "24/7 treatment for travel fatigue, dehydration, food poisoning, or minor injuries"}
            ]
        },
        {
            "slug": "frozen-shoulder-physiotherapy",
            "title": "Frozen Shoulder Physiotherapy",
            "eyebrow": "Adhesive Capsulitis Therapy & Shoulder Mobility in Dubai",
            "tagline": "Frozen Shoulder Physiotherapy Treatment in Dubai",
            "description": "Struggling with adhesive capsulitis or frozen shoulder stiffness? Our DHA-licensed physiotherapists use joint mobilization, passive stretching, and targeted exercises at home to safely restore shoulder range of motion.",
            "icon": "Activity",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Pain Relief", "desc": "Targeted passive stretching and pain management"},
                {"title": "Restored Mobility", "desc": "Progressive joint mobilization to recover shoulder range of motion"},
                {"title": "DHA Licensed", "desc": "Senior physical therapists specializing in shoulder rehabilitation"}
            ]
        },
        {
            "slug": "pediatric-physiotherapy-services-dubai",
            "title": "Pediatric Physiotherapy",
            "eyebrow": "Specialized Physical Therapy for Children in Dubai",
            "tagline": "Pediatric Physiotherapy Services Dubai",
            "description": "Our pediatric physiotherapists work with infants, toddlers, and children to treat developmental delays, muscular conditions, cerebral palsy, and posture imbalances through engaging, child-friendly therapy at home.",
            "icon": "Users",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Motor Milestones", "desc": "Support for crawling, standing, walking, and motor coordination"},
                {"title": "Infant & Child Care", "desc": "Gentle, child-friendly therapy for torticollis, spasticity, and tone"},
                {"title": "At-Home Comfort", "desc": "Treatment delivered in your child's familiar, play-friendly home environment"}
            ]
        },
        {
            "slug": "joint-pain-treatment",
            "title": "Joint Pain Treatment",
            "eyebrow": "Targeted Joint Relief & Arthritis Management in Dubai",
            "tagline": "Joint Pain Treatment in Dubai",
            "description": "Suffer from osteoarthritis, rheumatoid joint pain, or persistent joint swelling? Our physiotherapists provide non-invasive joint mobilization, hydro-collator therapy, and muscle strengthening to improve joint health.",
            "icon": "HeartPulse",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Knee & Hip Relief", "desc": "Targeted mobilization for arthritis, cartilage wear, and stiffness"},
                {"title": "Swelling Reduction", "desc": "Clinical modalities and soft tissue massage for joint inflammation"},
                {"title": "Non-Invasive", "desc": "Effective pain management to reduce reliance on oral pain medications"}
            ]
        },
        {
            "slug": "manual-therapy",
            "title": "Manual Therapy",
            "eyebrow": "Hands-On Clinical Soft Tissue & Joint Mobilization in Dubai",
            "tagline": "Professional Manual Therapy in Dubai",
            "description": "Manual therapy uses specialized hands-on techniques, myofascial release, joint manipulation, and soft tissue mobilization to reduce pain, release muscle tightness, and improve movement mechanics.",
            "icon": "Sparkles",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Myofascial Release", "desc": "Skilled hands-on techniques to release deep muscle knots and trigger points"},
                {"title": "Spinal Realignment", "desc": "Joint manipulation to relieve neck, shoulder, and back tension"},
                {"title": "Immediate Relief", "desc": "Noticeable improvement in flexibility and pain levels following sessions"}
            ]
        },
        {
            "slug": "geriatric-physiotherapy",
            "title": "Geriatric Physiotherapy at Home",
            "eyebrow": "Specialized Senior Mobility & Fall Prevention in Dubai",
            "tagline": "Helping seniors maintain independence, balance, and pain-free movement at home.",
            "description": "Aging can impact joint flexibility, muscle strength, and balance. Our DHA-licensed geriatric physiotherapists visit senior patients at home to deliver safe, low-impact exercises, gait training, and fall-prevention routines tailored for senior comfort.",
            "icon": "Users",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Fall Prevention", "desc": "Balance retraining and fall risk evaluation at home"},
                {"title": "Joint Flexibility", "desc": "Gentle range of motion and stiffness management"},
                {"title": "Independent Living", "desc": "Mobility exercises to support daily activities"}
            ]
        },
        {
            "slug": "chest-physiotherapy",
            "title": "Chest & Respiratory Physiotherapy",
            "eyebrow": "At-Home Cardiorespiratory Rehabilitation in Dubai",
            "tagline": "Improve breathing, clear lung secretions, and boost lung capacity at home.",
            "description": "Recovering from pneumonia, COPD, bronchitis, or chest surgery? Our specialized respiratory physical therapists provide chest percussion, postural drainage, breathing exercises, and lung expansion therapy in the comfort of your residence.",
            "icon": "Activity",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Secretion Clearance", "desc": "Postural drainage and chest percussion for airway clearance"},
                {"title": "Lung Capacity", "desc": "Incentive spirometry and diaphragmatic breathing exercises"},
                {"title": "Post-Op Recovery", "desc": "Cardiorespiratory rehab after cardiac or abdominal surgery"}
            ]
        },
        {
            "slug": "neurological-rehab",
            "title": "Neurological Rehabilitation at Home",
            "eyebrow": "Stroke, Parkinson's & Neurological Care in Dubai",
            "tagline": "Restoring neuromuscular function, motor skills, and physical independence.",
            "description": "Our DHA-certified neuro-physiotherapists specialize in rehabilitation for stroke recovery, Parkinson's disease, multiple sclerosis, and spinal cord injuries. We provide structured, task-oriented physical therapy to retrain brain and body pathways.",
            "icon": "Activity",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Motor Retraining", "desc": "Neuro-plasticity focused motor skill and movement rehab"},
                {"title": "Stroke Recovery", "desc": "Hemiplegia, balance, and gait rehabilitation"},
                {"title": "Specialized Neuro Staff", "desc": "Senior physical therapists trained in neurological disorders"}
            ]
        },
        {
            "slug": "sports-injury-rehab",
            "title": "Sports Injury Rehabilitation at Home",
            "eyebrow": "Advanced Athletic Recovery & Joint Mobilization in Dubai",
            "tagline": "Fast-track your athletic recovery and return to peak performance safely.",
            "description": "Sustained a ligament tear, ankle sprain, tendonitis, or muscle strain? Our experienced sports physiotherapists bring targeted manual therapy, joint mobilization, and sport-specific conditioning directly to your home or hotel room.",
            "icon": "Activity",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Ligament & Muscle Rehab", "desc": "Targeted therapy for ACL tears, sprains, and tendonitis"},
                {"title": "Return-to-Sport", "desc": "Progressive strength and agility retraining"},
                {"title": "Manual Therapy", "desc": "Joint mobilization and soft tissue release"}
            ]
        },
        {
            "slug": "back-pain-treatment",
            "title": "Back & Neck Pain Physiotherapy",
            "eyebrow": "Spine Realignment & Chronic Pain Relief in Dubai",
            "tagline": "Targeted spinal therapy, posture correction, and lasting pain relief.",
            "description": "Suffering from sciatica, herniated discs, lower back stiffness, or neck tension? Our spine rehabilitation specialists provide targeted manual therapy, core stabilization, and ergonomic guidance to eliminate back pain safely at your home.",
            "icon": "Activity",
            "theme_color": "#08709d",
            "parent_slug": "physiotherapy",
            "benefits": [
                {"title": "Spine Realignment", "desc": "Manual therapy and spinal mobilization for herniated discs & sciatica"},
                {"title": "Posture Correction", "desc": "Ergonomic advice and core strengthening for neck & back tension"},
                {"title": "Pain Elimination", "desc": "Non-invasive long term relief from chronic back pain"}
            ]
        }
    ]

    all_services = services_list + sub_services_list

    for s in all_services:
        Service.objects.create(
            slug=s["slug"],
            title=s["title"],
            eyebrow=s.get("eyebrow", ""),
            tagline=s.get("tagline", ""),
            description=s.get("description", ""),
            icon=s.get("icon", "Activity"),
            theme_color=s.get("theme_color", "#08709d"),
            meta_title=s.get("meta_title", f"{s['title']} in Dubai | Corx Healthcare"),
            meta_description=s.get("meta_description", s.get("description", s.get("tagline", ""))),
            floating_badge=s.get("floating_badge", {}),
            features=s.get("features", []),
            indications=s.get("indications", []),
            indications_title=s.get("indications_title", f"Who May Need {s['title']}?"),
            indications_description=s.get("indications_description", f"You may benefit from our DHA-certified {s['title']} home health service if you have:"),
            lab_columns=s.get("lab_columns", []),
            lab_columns_title=s.get("lab_columns_title", "Comprehensive Diagnostic Test Suites Covered"),
            lab_columns_description=s.get("lab_columns_description", "High-precision laboratory test packages performed by certified clinical specialists right at your home."),
            reasons=s.get("reasons", []),
            why_choose_title=s.get("why_choose_title", f"Why Choose CORx Healthcare for {s['title']}?"),
            why_choose_desc=s.get("why_choose_desc", s.get("description", "Enjoy the convenience and reliability of top-notch healthcare without stepping outside your door.")),
            steps=s.get("steps", []),
            benefits=s.get("benefits", []),
            faqs=s.get("faqs", [])
        )
    print(f"Successfully seeded {len(all_services)} services.")

    # Pass 2: Set parent-child relationships
    for s in all_services:
        parent_slug = s.get("parent_slug")
        if parent_slug:
            try:
                parent_obj = Service.objects.get(slug=parent_slug)
                child_obj = Service.objects.get(slug=s["slug"])
                child_obj.parent = parent_obj
                child_obj.save()
            except Service.DoesNotExist:
                print(f"Warning: Could not link parent '{parent_slug}' to service '{s['slug']}'")
    print("Successfully configured parent-child service links.")

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()

