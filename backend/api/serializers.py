from rest_framework import serializers
from .models import (
    StaffProfile, Task, LeaveApplication,
    OtApplication, SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service, TeamMember
)
from django.utils.text import slugify


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
    name = serializers.CharField(source='title', read_only=True)
    path = serializers.SerializerMethodField()
    desc = serializers.CharField(source='tagline', default='', read_only=True)
    accent = serializers.CharField(source='theme_color', default='#08709d', read_only=True)
    icon = serializers.CharField(read_only=True)
    parent_title = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ['id', 'name', 'title', 'slug', 'path', 'desc', 'accent', 'icon', 'parent', 'parent_title']

    def get_path(self, obj):
        return f'/services/{obj.slug}' if getattr(obj, 'slug', None) else '/services'

    def get_parent_title(self, obj):
        return obj.parent.title if getattr(obj, 'parent', None) else ''


class ServiceSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)
    sub_services = SubServiceSerializer(many=True, read_only=True)
    name = serializers.CharField(source='title', required=False, read_only=True)
    path = serializers.SerializerMethodField(read_only=True)
    subtitle = serializers.CharField(source='tagline', required=False, allow_blank=True)
    accent = serializers.CharField(source='theme_color', default='#08709d', required=False)

    about_section_title = serializers.SerializerMethodField()
    about_description = serializers.SerializerMethodField()
    indications_section_title = serializers.SerializerMethodField()
    comprehensive_section_title = serializers.SerializerMethodField()
    faq_section_title = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id', 'slug', 'title', 'name', 'path', 'subtitle', 'accent', 'parent', 'sub_services',
            'eyebrow', 'tagline', 'description', 'icon', 'theme_color', 'image_file', 'image', 'floating_badge', 'benefits_title', 'benefits', 'faqs',
            'locations', 'features', 'indications', 'lab_columns', 'reasons', 'steps',
            'about_section_title', 'about_description', 'indications_section_title', 'comprehensive_section_title', 'faq_section_title',
            'created_at', 'updated_at'
        ]
        extra_kwargs = {
            'slug': {'required': False, 'allow_blank': True},
            'title': {'required': True},
        }

    def get_path(self, obj):
        return f'/services/{obj.slug}' if getattr(obj, 'slug', None) else '/services'

    def get_image(self, obj):
        try:
            if getattr(obj, 'image_file', None) and hasattr(obj.image_file, 'url') and obj.image_file.name:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.image_file.url)
                return f"http://localhost:8000{obj.image_file.url}"
        except Exception:
            pass
        return getattr(obj, 'image', '') or ''

    def _get_badge_field(self, obj, key):
        badge = getattr(obj, 'floating_badge', None)
        if isinstance(badge, dict):
            return badge.get(key, '')
        return ''

    def get_about_section_title(self, obj):
        return self._get_badge_field(obj, 'about_section_title')

    def get_about_description(self, obj):
        return self._get_badge_field(obj, 'about_description')

    def get_indications_section_title(self, obj):
        return self._get_badge_field(obj, 'indications_section_title')

    def get_comprehensive_section_title(self, obj):
        return self._get_badge_field(obj, 'comprehensive_section_title')

    def get_faq_section_title(self, obj):
        return self._get_badge_field(obj, 'faq_section_title')

    def create(self, validated_data):
        title = validated_data.get('title', 'service')
        provided_slug = validated_data.get('slug', '').strip()
        if not provided_slug:
            base_slug = slugify(title)
            slug = base_slug
            count = 1
            while Service.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{count}"
                count += 1
            validated_data['slug'] = slug

        if not validated_data.get('eyebrow'):
            validated_data['eyebrow'] = 'DHA-Licensed Healthcare Service Across Dubai'

        return super().create(validated_data)


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'post', 'photo', 'created_at', 'updated_at']
