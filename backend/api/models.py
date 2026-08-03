from django.db import models

class StaffProfile(models.Model):
    staff_id = models.CharField(max_length=50, unique=True, db_index=True)
    full_name = models.CharField(max_length=150)
    position = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    password = models.CharField(max_length=128) # Plain text for demo simplicity, matches seeded passwords
    role = models.CharField(max_length=20, default='staff') # 'admin' or 'staff'
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.staff_id})"

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    priority = models.CharField(max_length=20, default='Medium') # 'Low', 'Medium', 'High'
    due_date = models.DateField(null=True, blank=True)
    assigned_to = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='tasks', to_field='staff_id')
    assigned_to_name = models.CharField(max_length=150, blank=True, default='')
    assigned_by_name = models.CharField(max_length=150, default='System Administrator')
    status = models.CharField(max_length=30, default='Pending') # 'Pending', 'In Progress', 'Completed'
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class LeaveApplication(models.Model):
    staff = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='leaves', to_field='staff_id')
    staff_name = models.CharField(max_length=150)
    staff_dep = models.CharField(max_length=100)
    staff_position = models.CharField(max_length=100)
    leave_type = models.CharField(max_length=50, default='Annual Leave')
    leave_start = models.DateField()
    leave_end = models.DateField()
    reason = models.TextField(blank=True, default='')
    status = models.CharField(max_length=30, default='Pending') # 'Pending', 'Approved', 'Rejected'
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.staff_name} - {self.leave_type}"

class OtApplication(models.Model):
    staff = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='ots', to_field='staff_id')
    staff_name = models.CharField(max_length=150)
    staff_dep = models.CharField(max_length=100)
    staff_position = models.CharField(max_length=100)
    ot_type = models.CharField(max_length=50, default='Day Shift')
    ot_date = models.DateField()
    ot_hours = models.CharField(max_length=20) # Stored as string to match frontend e.g., '6.5'
    status = models.CharField(max_length=30, default='Pending') # 'Pending', 'Approved', 'Rejected'
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.staff_name} - OT on {self.ot_date}"

class SalaryApplication(models.Model):
    staff = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='salaries', to_field='staff_id')
    staff_name = models.CharField(max_length=150)
    staff_dep = models.CharField(max_length=100)
    staff_position = models.CharField(max_length=100)
    inc_type = models.CharField(max_length=100, default='Merit-Based Performance Review')
    status = models.CharField(max_length=30, default='Pending') # 'Pending', 'Approved', 'Rejected'
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.staff_name} - Salary Appraisal"

class NoticeApplication(models.Model):
    staff = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='notices', to_field='staff_id')
    staff_name = models.CharField(max_length=150)
    notice_title = models.CharField(max_length=200)
    notice_message = models.TextField()
    status = models.CharField(max_length=30, default='Pending')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.staff_name} - Notice: {self.notice_title}"

class DutyApplication(models.Model):
    staff = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='duties', to_field='staff_id')
    staff_name = models.CharField(max_length=150)
    duty_date = models.DateField()
    duty_replacement = models.CharField(max_length=150)
    duty_reason = models.TextField()
    status = models.CharField(max_length=30, default='Pending')
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.staff_name} - Duty Replacement for {self.duty_date}"


class BlogPost(models.Model):
    title = models.CharField(max_length=250)
    category = models.CharField(max_length=100)
    date = models.CharField(max_length=50)  # Keep string date for frontend compatibility
    author = models.CharField(max_length=100, default='Corx')
    image = models.CharField(max_length=500, blank=True, default='')
    image_file = models.FileField(upload_to='blog_images/', null=True, blank=True, help_text="Upload a local image file from your computer")
    excerpt = models.TextField(blank=True, default='')
    read_time = models.CharField(max_length=50, default='5 min read')
    content = models.TextField(blank=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Service(models.Model):
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='sub_services', help_text="Select a parent service if this is a sub-service")
    slug = models.CharField(max_length=100, unique=True, db_index=True)
    title = models.CharField(max_length=200)
    eyebrow = models.CharField(max_length=250, blank=True, default='')
    tagline = models.TextField(blank=True, default='')
    description = models.TextField(blank=True, default='')
    icon = models.CharField(max_length=100, default='Activity', blank=True)
    image_file = models.FileField(upload_to='service_images/', null=True, blank=True, help_text="Upload a local image file from your computer")
    theme_color = models.CharField(max_length=20, default='#08709d', blank=True)
    floating_badge = models.JSONField(default=dict, blank=True)  # {title, desc}
    benefits_title = models.CharField(max_length=300, blank=True, default='')
    benefits = models.JSONField(default=list, blank=True)  # [{title, desc}]
    benefits_image_file = models.FileField(upload_to='service_images/', null=True, blank=True, help_text="Upload custom image file for Benefits Section")
    understanding_title = models.CharField(max_length=300, blank=True, default='')
    understanding_intro = models.TextField(blank=True, default='')
    understanding_items = models.JSONField(default=list, blank=True)  # [{num, title, desc}]
    understanding_image_file = models.FileField(upload_to='service_images/', null=True, blank=True, help_text="Upload custom illustration for Understanding Section")
    faqs = models.JSONField(default=list, blank=True)  # [{q, a}]
    locations = models.JSONField(default=list, blank=True)  # [{label}]
    features = models.JSONField(default=list, blank=True)  # [{title}]
    indications = models.JSONField(default=list, blank=True)  # [str]
    indications_title = models.CharField(max_length=300, blank=True, default='', help_text="Custom Heading for Indications / Who May Need Section")
    indications_description = models.TextField(blank=True, default='', help_text="Custom Heading Description for Indications / Who May Need Section")
    lab_columns = models.JSONField(default=list, blank=True)  # [{title, tagline, iconBg, tests}]
    lab_columns_title = models.CharField(max_length=300, blank=True, default='', help_text="Custom Heading for Diagnostic Test Suites / Lab Columns Section")
    lab_columns_description = models.TextField(blank=True, default='', help_text="Custom Heading Description for Diagnostic Test Suites / Lab Columns Section")
    reasons = models.JSONField(default=list, blank=True)  # [{num, label, title, desc}]
    steps = models.JSONField(default=list, blank=True)  # [{title, desc}]
    meta_title = models.CharField(max_length=300, blank=True, default='', help_text="Custom SEO & OpenGraph Title Tag for this Service Page")
    meta_description = models.TextField(blank=True, default='', help_text="Custom SEO & OpenGraph Meta Description for this Service Page")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    name = models.CharField(max_length=150)
    post = models.CharField(max_length=150)
    photo = models.FileField(upload_to='team_photos/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

