from django.contrib import admin
from .models import (
    StaffProfile, Task, LeaveApplication,
    OtApplication, SalaryApplication, NoticeApplication, DutyApplication
)

@admin.register(StaffProfile)
class StaffProfileAdmin(admin.ModelAdmin):
    list_display = ('staff_id', 'full_name', 'position', 'department', 'role', 'created_at')
    search_fields = ('staff_id', 'full_name')

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'assigned_to_name', 'assigned_to', 'priority', 'status', 'due_date')
    list_filter = ('status', 'priority')
    search_fields = ('title', 'assigned_to_name')

@admin.register(LeaveApplication)
class LeaveApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'leave_type', 'leave_start', 'leave_end', 'status')
    list_filter = ('status',)

@admin.register(OtApplication)
class OtApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'ot_type', 'ot_date', 'ot_hours', 'status')
    list_filter = ('status',)

@admin.register(SalaryApplication)
class SalaryApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'inc_type', 'status')
    list_filter = ('status',)

@admin.register(NoticeApplication)
class NoticeApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'notice_title', 'status')
    list_filter = ('status',)

@admin.register(DutyApplication)
class DutyApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'duty_date', 'duty_replacement', 'status')
    list_filter = ('status',)
