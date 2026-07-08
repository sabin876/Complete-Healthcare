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
