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
    image = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'category', 'date', 'author', 'image', 'image_file',
            'excerpt', 'read_time', 'content', 'created_at', 'updated_at'
        ]

    def get_image(self, obj):
        if obj.image_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image_file.url)
            return f"http://localhost:8000{obj.image_file.url}"
        return obj.image or 'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?q=80&w=800&auto=format&fit=crop'


class SubServiceSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='title')
    path = serializers.SerializerMethodField()
    desc = serializers.CharField(source='tagline', default='')
    accent = serializers.CharField(source='theme_color', default='#08709d')

    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'path', 'desc', 'accent']

    def get_path(self, obj):
        return f'/services/{obj.slug}'


class ServiceSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    sub_services = SubServiceSerializer(many=True, read_only=True)
    name = serializers.CharField(source='title', required=False)
    path = serializers.SerializerMethodField()
    subtitle = serializers.CharField(source='tagline', required=False, allow_blank=True)
    accent = serializers.CharField(source='theme_color', default='#08709d', required=False)

    class Meta:
        model = Service
        fields = [
            'id', 'slug', 'title', 'name', 'path', 'subtitle', 'accent', 'parent', 'sub_services',
            'eyebrow', 'description', 'icon', 'image_file', 'image', 'floating_badge', 'benefits', 'faqs',
            'locations', 'features', 'indications', 'lab_columns', 'reasons', 'steps',
            'created_at', 'updated_at'
        ]

    def get_path(self, obj):
        return f'/services/{obj.slug}'

    def get_image(self, obj):
        if obj.image_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image_file.url)
            return f"http://localhost:8000{obj.image_file.url}"
        return ''



class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'post', 'photo', 'created_at', 'updated_at']

