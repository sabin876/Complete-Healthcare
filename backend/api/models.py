from django.db import models

class StaffProfile(models.Model):
    ROLE_CHOICES = [
        ('staff', 'Medical / Clinical Staff'),
        ('admin', 'Administrator / Management'),
    ]
    DEPARTMENT_CHOICES = [
        ('Home Nursing', 'Home Nursing'),
        ('Doctor on Call', 'Doctor on Call'),
        ('IV Therapy', 'IV Therapy'),
        ('Physiotherapy', 'Physiotherapy & Rehabilitation'),
        ('Lab Services', 'Diagnostic & Lab Tests'),
        ('Administration', 'Administration & HR'),
        ('Operations', 'Medical Operations'),
    ]

    photo = models.ImageField(
        upload_to='staff_photos/',
        blank=True,
        null=True,
        verbose_name="Passport Size Photo",
        help_text="Upload official passport size photo of the staff member (e.g., JPG, PNG, WEBP)"
    )
    full_name = models.CharField(
        max_length=150,
        verbose_name="Full Name",
        help_text="Full legal name of the staff member (e.g. Dr. Sarah Jenkins, RN)"
    )
    department = models.CharField(
        max_length=100,
        blank=True,
        default='',
        verbose_name="Department",
        help_text="Clinical or administrative department of your choice (e.g. Home Nursing, Doctor on Call, HR, Operations, etc.)"
    )
    position = models.CharField(
        max_length=100,
        verbose_name="Position",
        help_text="Official designation / job position (e.g. Senior DHA Registered Nurse, Consultant Physician)"
    )
    staff_id = models.CharField(
        max_length=50, 
        unique=True, 
        db_index=True,
        verbose_name="Username / ID (Portal Login)",
        help_text="Username / ID used by the staff member to log in to the portal (e.g. STF-101, DOC-202, ADMIN-001)"
    )
    password = models.CharField(
        max_length=128,
        verbose_name="Password",
        help_text="Password for Portal access at /portal"
    )
    role = models.CharField(
        max_length=20, 
        choices=ROLE_CHOICES,
        default='staff',
        verbose_name="Role / Access Level",
        help_text="Select 'Medical / Clinical Staff' for staff dashboard, or 'Administrator' for management dashboard"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Enrolled Date")

    class Meta:
        verbose_name = "Staff Member Profile"
        verbose_name_plural = "Staff Member Directory"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} ({self.staff_id}) - {self.position}"

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
    staff = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='salaries', to_field='staff_id', verbose_name="Choose Staff Member")
    staff_name = models.CharField(max_length=150, blank=True, default='', verbose_name="Staff Name")
    staff_dep = models.CharField(max_length=100, blank=True, default='', verbose_name="Department")
    staff_position = models.CharField(max_length=100, blank=True, default='', verbose_name="Position")
    description = models.TextField(blank=True, default='', verbose_name="Description", help_text="Enter salary slip description or remarks for the staff")
    image = models.FileField(upload_to='salary_slips/', null=True, blank=True, verbose_name="Salary Slip Image / Document", help_text="Upload official salary slip image or document")
    status = models.CharField(max_length=30, default='Issued', verbose_name="Status")
    submitted_at = models.DateTimeField(auto_now_add=True, verbose_name="Date & Time")

    class Meta:
        verbose_name = "Monthly Salary Slip"
        verbose_name_plural = "Monthly Salary Slips"
        ordering = ['-submitted_at']

    def save(self, *args, **kwargs):
        if self.staff:
            self.staff_name = self.staff.full_name
            self.staff_dep = self.staff.department or ''
            self.staff_position = self.staff.position or ''
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.staff_name} - Salary Slip"



class NoticeApplication(models.Model):
    TARGET_AUDIENCE_CHOICES = [
        ('all', '📢 Broadcast to All Staff Members'),
        ('specific_staff', '👤 Select Specific Staff Members'),
        ('specific_dept', '🏢 Select by Department'),
    ]
    PRIORITY_CHOICES = [
        ('normal', '🟢 Normal Notice'),
        ('important', '🟡 Important Announcement'),
        ('urgent', '🔴 Urgent / High Priority'),
    ]

    title = models.CharField(
        max_length=250,
        default="Official Notice",
        verbose_name="Notice Title",
        help_text="Enter the headline / subject of the notice (e.g. Mandatory Clinical Meeting, Holiday Schedule, Shift Update)"
    )
    content = models.TextField(
        default="",
        verbose_name="Notice Content",
        help_text="Detailed description and announcement information for staff members"
    )
    target_audience = models.CharField(
        max_length=30,
        choices=TARGET_AUDIENCE_CHOICES,
        default='all',
        verbose_name="Send Notice To",
        help_text="Select whether to send this notice to all staff, specific individuals, or a department."
    )
    selected_staff = models.ManyToManyField(
        StaffProfile,
        blank=True,
        related_name='received_notices',
        verbose_name="Select Specific Staff Members",
        help_text="Choose one or more staff members who should receive this notice."
    )
    target_department = models.CharField(
        max_length=100,
        blank=True,
        default='',
        verbose_name="Target Department",
        help_text="Enter department name (e.g. Home Nursing, Doctor on Call, HR) if sending by department."
    )
    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='normal',
        verbose_name="Urgency / Priority"
    )
    staff = models.ForeignKey(
        StaffProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='notices',
        to_field='staff_id',
        verbose_name="Issued By"
    )
    staff_name = models.CharField(
        max_length=150,
        blank=True,
        default="Administration / HR",
        verbose_name="Issuer Name"
    )
    status = models.CharField(
        max_length=30,
        default='Published',
        verbose_name="Status"
    )
    submitted_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date & Time"
    )

    class Meta:
        verbose_name = "Notice & Announcement"
        verbose_name_plural = "Notices & Announcements"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.title} ({self.get_target_audience_display()})"

class DutyApplication(models.Model):
    SHIFT_TIMING_CHOICES = [
        ('Day', 'Day Shift'),
        ('Night', 'Night Shift'),
    ]

    SHIFT_TYPE_CHOICES = [
        ('6-hours', '6 Hours'),
        ('8-hours', '8 Hours'),
        ('10-hours', '10 Hours'),
        ('12-hours', '12 Hours'),
        ('24-hours', '24 Hours'),
        ('live-in', 'Live In'),
    ]

    staff = models.ForeignKey(StaffProfile, on_delete=models.CASCADE, related_name='duties', to_field='staff_id')
    staff_name = models.CharField(max_length=150, verbose_name="Staff Name")
    duty_date = models.DateField(verbose_name="Scheduled Duty Date")
    shift_timing = models.CharField(
        max_length=50,
        choices=SHIFT_TIMING_CHOICES,
        default='Day',
        verbose_name="Shift Timing",
        help_text="Select Shift Timing: Day or Night"
    )
    shift_type = models.CharField(
        max_length=50,
        choices=SHIFT_TYPE_CHOICES,
        default='8-hours',
        verbose_name="Shift Type",
        help_text="Select Shift Duration: 6, 8, 10, 12, 24 Hours or Live In"
    )
    duty_replacement = models.CharField(max_length=150, verbose_name="Replacement Staff Name")
    duty_reason = models.TextField(verbose_name="Reason / Handover Notes")
    status = models.CharField(max_length=30, default='Pending')
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Duty Schedule Swap"
        verbose_name_plural = "Duty Schedule Swaps"
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.staff_name} - Duty Swap for {self.duty_date} ({self.shift_timing}, {self.shift_type}) -> {self.duty_replacement}"


class BlogPost(models.Model):
    title = models.CharField(max_length=250)
    slug = models.CharField(max_length=250, blank=True, default='', help_text="Clean URL slug for this blog post")
    category = models.CharField(max_length=100, blank=True, default='')
    date = models.CharField(max_length=50, blank=True, default='')  # Keep string date for frontend compatibility
    author = models.CharField(max_length=100, default='Corx')
    image = models.CharField(max_length=500, blank=True, default='')
    image_file = models.FileField(upload_to='blog_images/', null=True, blank=True, help_text="Upload a local image file from your computer")
    excerpt = models.TextField(blank=True, default='')
    read_time = models.CharField(max_length=50, default='5 min read')
    content = models.TextField(blank=True, default='')
    meta_title = models.CharField(max_length=300, blank=True, default='', help_text="Custom SEO & OpenGraph Title Tag for this Blog Post")
    meta_description = models.TextField(blank=True, default='', help_text="Custom SEO & OpenGraph Meta Description for this Blog Post")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Service(models.Model):
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='sub_services', help_text="Select a parent service if this is a sub-service")
    slug = models.CharField(max_length=100, unique=True, db_index=True)
    custom_url_path = models.CharField(max_length=200, blank=True, default='', help_text="Custom URL path alias for frontend navigation (e.g. '/lab-test-at-home')")
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
    why_choose_title = models.CharField(max_length=300, blank=True, default='', help_text="Custom Heading for Why Choose CORx Healthcare / Reasons Section")
    why_choose_desc = models.TextField(blank=True, default='', help_text="Custom Heading Description for Why Choose CORx Healthcare / Reasons Section")
    steps = models.JSONField(default=list, blank=True)  # [{title, desc}]
    meta_title = models.CharField(max_length=300, blank=True, default='', help_text="Custom SEO & OpenGraph Title Tag for this Service Page")
    meta_description = models.TextField(blank=True, default='', help_text="Custom SEO & OpenGraph Meta Description for this Service Page")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.custom_url_path:
            path = str(self.custom_url_path).strip()
            if path and not path.startswith('/'):
                path = '/' + path
            self.custom_url_path = path
        super().save(*args, **kwargs)

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


class RobotsTxt(models.Model):
    content = models.TextField(
        default="User-agent: *\nDisallow: /admin/\nAllow: /", 
        help_text="Edit your website's robots.txt rules directly below."
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Robots.txt Setting"
        verbose_name_plural = "Robots.txt Setting"

    def __str__(self):
        return "Robots.txt Configuration"


class SitemapXml(models.Model):
    content = models.TextField(
        help_text="Edit your website's sitemap.xml XML content directly below."
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Sitemap.xml Setting"
        verbose_name_plural = "Sitemap.xml Setting"

    def __str__(self):
        return "Sitemap.xml Configuration"


class DriverSchedule(models.Model):
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    driver = models.ForeignKey(
        StaffProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='driver_schedules',
        to_field='staff_id',
        verbose_name="Assigned Driver / Staff Member",
        help_text="Select the registered driver or staff member"
    )
    driver_name = models.CharField(
        max_length=150,
        blank=True,
        default='',
        verbose_name="Driver / Staff Name",
        help_text="Automatically set from selected staff member"
    )
    driver_phone = models.CharField(
        max_length=50,
        blank=True,
        default='',
        verbose_name="Driver Contact Number",
        help_text="Mobile / WhatsApp number of the driver"
    )
    vehicle_info = models.CharField(
        max_length=100,
        blank=True,
        default='',
        verbose_name="Vehicle Plate No.",
        help_text="e.g. DXB 45921 or Toyota HiAce - DXB 45921"
    )
    staff_passenger = models.ForeignKey(
        StaffProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='passenger_schedules',
        to_field='staff_id',
        verbose_name="Staff to Pick Up / Drop (Passenger)",
        help_text="Select the staff member / nurse / doctor to pick up from source and drop at destination"
    )
    staff_passenger_name = models.CharField(
        max_length=150,
        blank=True,
        default='',
        verbose_name="Staff / Passenger Name",
        help_text="Automatically set from selected staff member"
    )
    staff_passenger_phone = models.CharField(
        max_length=50,
        blank=True,
        default='',
        verbose_name="Passenger Contact Number",
        help_text="Mobile / WhatsApp number of the passenger"
    )
    pickup_location = models.CharField(
        max_length=255,
        blank=True,
        default='',
        verbose_name="Primary Source (Starting Location)",
        help_text="Primary starting address or summary source location"
    )
    pickup_time = models.CharField(
        max_length=50,
        blank=True,
        default='',
        verbose_name="Primary Source Time",
        help_text="Time of departure from source (e.g. 09:30 AM)"
    )
    drop_location = models.CharField(
        max_length=255,
        blank=True,
        default='',
        verbose_name="Primary Destination",
        help_text="Primary destination address or summary arrival location"
    )
    drop_time = models.CharField(
        max_length=50,
        blank=True,
        default='',
        verbose_name="Primary Destination Time",
        help_text="Expected time of arrival at destination (e.g. 10:30 AM)"
    )
    schedule_date = models.DateField(
        verbose_name="Schedule Date",
        help_text="Date of the scheduled trip"
    )
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='Scheduled',
        verbose_name="Status"
    )
    notes = models.TextField(
        blank=True,
        default='',
        verbose_name="Notes / Special Instructions",
        help_text="Any special instructions or route notes"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last Updated")

    class Meta:
        verbose_name = "Driver Schedule"
        verbose_name_plural = "Driver Schedules"
        ordering = ['-schedule_date', '-created_at']

    def save(self, *args, **kwargs):
        if self.driver:
            self.driver_name = self.driver.full_name
        elif not self.driver_name:
            self.driver_name = "Unassigned"

        if self.staff_passenger:
            self.staff_passenger_name = self.staff_passenger.full_name
        super().save(*args, **kwargs)

    def __str__(self):
        name = self.driver_name or (self.driver.full_name if self.driver else "Unassigned")
        pass_str = f" [Passenger: {self.staff_passenger_name}]" if self.staff_passenger_name else ""
        if self.pickup_location and self.drop_location:
            return f"{name}{pass_str} - {self.pickup_location} ({self.pickup_time}) -> {self.drop_location} ({self.drop_time}) [{self.schedule_date}]"
        return f"{name}{pass_str} - Schedule for {self.schedule_date}"


class DriverRouteStop(models.Model):
    STATUS_CHOICES = [
        ('Scheduled', 'Scheduled'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]

    schedule = models.ForeignKey(
        DriverSchedule,
        on_delete=models.CASCADE,
        related_name='route_stops',
        verbose_name="Driver Schedule"
    )
    stop_order = models.PositiveIntegerField(
        default=1,
        verbose_name="Stop # / Sequence",
        help_text="Order of this trip stop (e.g. 1, 2, 3...)"
    )
    staff_passenger = models.ForeignKey(
        StaffProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='route_stop_passengers',
        to_field='staff_id',
        verbose_name="Staff to Pick Up / Drop",
        help_text="Select staff member to pick up / drop for this route leg (optional)"
    )
    staff_passengers = models.ManyToManyField(
        StaffProfile,
        blank=True,
        related_name='route_stop_passengers_multi',
        verbose_name="Staff to Pick Up (Passengers)",
        help_text="Select one or more staff members to pick up at source"
    )
    staff_dropoffs = models.ManyToManyField(
        StaffProfile,
        blank=True,
        related_name='route_stop_dropoffs',
        verbose_name="Staff to Drop Off",
        help_text="Select one or more staff members to drop off at destination"
    )
    staff_passenger_name = models.CharField(
        max_length=255,
        blank=True,
        default='',
        verbose_name="Passenger / Staff Name(s)"
    )
    source_location = models.CharField(
        max_length=255,
        verbose_name="Source (Pick-up Location)",
        help_text="Starting address or pick-up point"
    )
    source_time = models.CharField(
        max_length=50,
        blank=True,
        default='',
        verbose_name="Source / Pick-up Time",
        help_text="Departure time from source (e.g. 09:30 AM)"
    )
    destination_location = models.CharField(
        max_length=255,
        verbose_name="Destination (Drop Location)",
        help_text="Destination address or drop-off point"
    )
    destination_time = models.CharField(
        max_length=50,
        blank=True,
        default='',
        verbose_name="Destination / Drop Time",
        help_text="Arrival time at destination (e.g. 10:30 AM)"
    )
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='Scheduled',
        verbose_name="Status"
    )
    notes = models.CharField(
        max_length=255,
        blank=True,
        default='',
        verbose_name="Notes / Instructions",
        help_text="Special instructions for this specific route stop"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last Updated")

    class Meta:
        verbose_name = "Trip Route / Stop"
        verbose_name_plural = "Trip Routes & Stops"
        ordering = ['stop_order', 'id']

    def get_passengers_display(self):
        pickups = [s.full_name for s in self.staff_passengers.all()]
        dropoffs = [s.full_name for s in self.staff_dropoffs.all()]
        parts = []
        if pickups:
            parts.append(f"Pick up: {', '.join(pickups)}")
        if dropoffs:
            parts.append(f"Drop: {', '.join(dropoffs)}")
        if parts:
            return " | ".join(parts)
        if self.staff_passenger_name:
            return self.staff_passenger_name
        if self.staff_passenger:
            return self.staff_passenger.full_name
        return ""

    def save(self, *args, **kwargs):
        if self.staff_passenger and not self.staff_passenger_name:
            self.staff_passenger_name = self.staff_passenger.full_name
        super().save(*args, **kwargs)

    def __str__(self):
        s_time = f" ({self.source_time})" if self.source_time else ""
        d_time = f" ({self.destination_time})" if self.destination_time else ""
        pass_names = self.get_passengers_display()
        pass_str = f" [{pass_names}]" if pass_names else ""
        return f"Stop #{self.stop_order}{pass_str}: {self.source_location}{s_time} -> {self.destination_location}{d_time}"









