from rest_framework import serializers
from .models import (
    StaffProfile, Task, LeaveApplication,
    OtApplication, SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service, TeamMember
)


class StaffProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffProfile
        fields = ['id', 'staff_id', 'full_name', 'position', 'department', 'password', 'role', 'created_at']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'priority', 'due_date',
            'assigned_to', 'assigned_to_name', 'assigned_by_name', 'status',
            'created_at', 'updated_at'
        ]

class LeaveApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveApplication
        fields = [
            'id', 'staff', 'staff_name', 'staff_dep', 'staff_position',
            'leave_type', 'leave_start', 'leave_end', 'reason', 'status', 'submitted_at'
        ]

class OtApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtApplication
        fields = [
            'id', 'staff', 'staff_name', 'staff_dep', 'staff_position',
            'ot_type', 'ot_date', 'ot_hours', 'status', 'submitted_at'
        ]

class SalaryApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalaryApplication
        fields = [
            'id', 'staff', 'staff_name', 'staff_dep', 'staff_position',
            'inc_type', 'status', 'submitted_at'
        ]

class NoticeApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoticeApplication
        fields = [
            'id', 'staff', 'staff_name', 'notice_title', 'notice_message',
            'status', 'submitted_at'
        ]

class DutyApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DutyApplication
        fields = [
            'id', 'staff', 'staff_name', 'duty_date', 'duty_replacement',
            'duty_reason', 'status', 'submitted_at'
        ]


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'category', 'date', 'author', 'image',
            'excerpt', 'read_time', 'content', 'created_at', 'updated_at'
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            'id', 'slug', 'title', 'eyebrow', 'tagline', 'description',
            'icon', 'theme_color', 'floating_badge', 'benefits', 'faqs',
            'locations', 'created_at', 'updated_at'
        ]


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'post', 'photo', 'created_at', 'updated_at']

