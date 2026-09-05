from rest_framework import serializers
from .models import (
    StaffProfile, Task, LeaveApplication,
    OtApplication, SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service, TeamMember, DriverSchedule, DriverRouteStop
)
from django.utils.text import slugify


class StaffProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffProfile
        fields = ['id', 'staff_id', 'full_name', 'position', 'department', 'photo', 'password', 'role', 'created_at']

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
            'description', 'image', 'status', 'submitted_at'
        ]



class NoticeApplicationSerializer(serializers.ModelSerializer):
    selected_staff_details = serializers.SerializerMethodField()

    class Meta:
        model = NoticeApplication
        fields = [
            'id', 'title', 'content', 'target_audience', 'selected_staff',
            'selected_staff_details', 'target_department', 'priority',
            'staff', 'staff_name', 'status', 'submitted_at'
        ]

    def get_selected_staff_details(self, obj):
        return [{'id': s.staff_id, 'name': s.full_name, 'department': s.department} for s in obj.selected_staff.all()]

class DutyApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DutyApplication
        fields = [
            'id', 'staff', 'staff_name', 'duty_date', 'duty_replacement',
            'duty_reason', 'status', 'submitted_at'
        ]


class DriverRouteStopSerializer(serializers.ModelSerializer):
    staff_passengers_details = serializers.SerializerMethodField()
    staff_dropoffs_details = serializers.SerializerMethodField()

    class Meta:
        model = DriverRouteStop
        fields = [
            'id', 'schedule', 'stop_order',
            'staff_passengers', 'staff_passengers_details',
            'staff_dropoffs', 'staff_dropoffs_details',
            'staff_passenger', 'staff_passenger_name',
            'source_location', 'source_time',
            'destination_location', 'destination_time',
            'status', 'notes',
            'created_at', 'updated_at'
        ]

    def get_staff_passengers_details(self, obj):
        passengers = [
            {
                'id': s.staff_id,
                'staff_id': s.staff_id,
                'name': s.full_name,
                'full_name': s.full_name,
                'department': s.department,
                'position': s.position
            }
            for s in obj.staff_passengers.all()
        ]
        if not passengers and obj.staff_passenger:
            s = obj.staff_passenger
            passengers.append({
                'id': s.staff_id,
                'staff_id': s.staff_id,
                'name': s.full_name,
                'full_name': s.full_name,
                'department': s.department,
                'position': s.position
            })
        elif not passengers and obj.staff_passenger_name:
            passengers.append({
                'id': 'leg-pass',
                'staff_id': '',
                'name': obj.staff_passenger_name,
                'full_name': obj.staff_passenger_name,
                'department': '',
                'position': ''
            })
        return passengers

    def get_staff_dropoffs_details(self, obj):
        dropoffs = [
            {
                'id': s.staff_id,
                'staff_id': s.staff_id,
                'name': s.full_name,
                'full_name': s.full_name,
                'department': s.department,
                'position': s.position
            }
            for s in obj.staff_dropoffs.all()
        ]
        if not dropoffs and obj.staff_passenger:
            s = obj.staff_passenger
            dropoffs.append({
                'id': s.staff_id,
                'staff_id': s.staff_id,
                'name': s.full_name,
                'full_name': s.full_name,
                'department': s.department,
                'position': s.position
            })
        elif not dropoffs and obj.staff_passenger_name:
            dropoffs.append({
                'id': 'leg-drop',
                'staff_id': '',
                'name': obj.staff_passenger_name,
                'full_name': obj.staff_passenger_name,
                'department': '',
                'position': ''
            })
        return dropoffs


class DriverScheduleSerializer(serializers.ModelSerializer):
    route_stops = DriverRouteStopSerializer(many=True, read_only=True)
    driver_staff_id = serializers.CharField(source='driver.staff_id', read_only=True, default='')

    class Meta:
        model = DriverSchedule
        fields = [
            'id', 'driver', 'driver_name', 'driver_phone', 'vehicle_info',
            'driver_staff_id',
            'staff_passenger', 'staff_passenger_name', 'staff_passenger_phone',
            'schedule_date', 'pickup_location', 'pickup_time',
            'drop_location', 'drop_time',
            'route_stops',
            'status', 'notes', 'created_at', 'updated_at'
        ]



class BlogPostSerializer(serializers.ModelSerializer):
    # Writable fields
    slug = serializers.CharField(required=False, allow_blank=True, default='')
    image = serializers.CharField(required=False, allow_blank=True, default='')

    # `tag` is what the frontend Dashboard sends — maps to `category` on the model
    tag = serializers.CharField(source='category', required=False, allow_blank=True, default='')

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'tag', 'date', 'author', 'image', 'image_file',
            'excerpt', 'read_time', 'content', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        if obj.image_file:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image_file.url)
            return obj.image_file.url
        return obj.image or 'https://images.unsplash.com/photo-1580281657527-47f249e8f4df?q=80&w=800&auto=format&fit=crop'

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Always expose `tag` as the category value for frontend compatibility
        ret['tag'] = instance.category or ''
        # Return computed image URL on reads
        ret['image'] = self.get_image_url(instance)
        # Auto-generate slug if blank
        if not ret.get('slug'):
            ret['slug'] = slugify(instance.title or f'post-{instance.id}')
        return ret

    def validate_slug(self, value):
        if not value:
            title = self.initial_data.get('title', '')
            return slugify(title) if title else ''
        return value


class SubServiceSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='title', read_only=True)
    path = serializers.SerializerMethodField()
    desc = serializers.CharField(source='tagline', default='', read_only=True)
    accent = serializers.CharField(source='theme_color', default='#08709d', read_only=True)
    icon = serializers.CharField(read_only=True)
    parent_title = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ['id', 'name', 'title', 'slug', 'custom_url_path', 'path', 'desc', 'accent', 'icon', 'parent', 'parent_title']

    def get_path(self, obj):
        cpath = getattr(obj, 'custom_url_path', None)
        if cpath and isinstance(cpath, str) and cpath.strip():
            path_str = cpath.strip()
            return path_str if path_str.startswith('/') else f'/{path_str}'
        return f'/{obj.slug}' if getattr(obj, 'slug', None) else '/services'

    def get_parent_title(self, obj):
        return obj.parent.title if getattr(obj, 'parent', None) else ''


class ServiceSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)
    benefits_image = serializers.SerializerMethodField(read_only=True)
    understanding_image = serializers.SerializerMethodField(read_only=True)
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
            'id', 'slug', 'custom_url_path', 'title', 'name', 'path', 'subtitle', 'accent', 'parent', 'sub_services',
            'eyebrow', 'tagline', 'description', 'icon', 'theme_color', 'image_file', 'image', 'floating_badge', 
            'benefits_title', 'benefits', 'benefits_image_file', 'benefits_image', 
            'understanding_title', 'understanding_intro', 'understanding_items', 'understanding_image_file', 'understanding_image',
            'faqs', 'locations', 'features', 'indications', 'indications_title', 'indications_description', 'lab_columns', 'lab_columns_title', 'lab_columns_description', 'reasons', 'why_choose_title', 'why_choose_desc', 'steps',
            'meta_title', 'meta_description',
            'about_section_title', 'about_description', 'indications_section_title', 'comprehensive_section_title', 'faq_section_title',
            'created_at', 'updated_at'
        ]
        extra_kwargs = {
            'slug': {'required': False, 'allow_blank': True},
            'custom_url_path': {'required': False, 'allow_blank': True},
            'title': {'required': True},
        }

    def to_internal_value(self, data):
        import json
        mutable_data = data.copy() if hasattr(data, 'copy') else dict(data)
        json_fields = [
            'floating_badge', 'benefits', 'understanding_items', 'faqs', 
            'locations', 'features', 'indications', 'lab_columns', 'reasons', 'steps'
        ]
        for field in json_fields:
            val = mutable_data.get(field)
            if isinstance(val, str):
                val_str = val.strip()
                if (val_str.startswith('{') and val_str.endswith('}')) or (val_str.startswith('[') and val_str.endswith(']')):
                    try:
                        mutable_data[field] = json.loads(val_str)
                    except Exception:
                        pass
        return super().to_internal_value(mutable_data)

    def get_path(self, obj):
        cpath = getattr(obj, 'custom_url_path', None)
        if cpath and isinstance(cpath, str) and cpath.strip():
            path_str = cpath.strip()
            return path_str if path_str.startswith('/') else f'/{path_str}'
        return f'/{obj.slug}' if getattr(obj, 'slug', None) else '/services'

    def get_image(self, obj):
        try:
            if getattr(obj, 'image_file', None) and hasattr(obj.image_file, 'url') and obj.image_file.name:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.image_file.url)
                return obj.image_file.url
        except Exception:
            pass
        return getattr(obj, 'image', '') or ''

    def get_benefits_image(self, obj):
        try:
            if getattr(obj, 'benefits_image_file', None) and hasattr(obj.benefits_image_file, 'url') and obj.benefits_image_file.name:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.benefits_image_file.url)
                return obj.benefits_image_file.url
        except Exception:
            pass
        return getattr(obj, 'benefits_image', '') or ''

    def get_understanding_image(self, obj):
        try:
            if getattr(obj, 'understanding_image_file', None) and hasattr(obj.understanding_image_file, 'url') and obj.understanding_image_file.name:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.understanding_image_file.url)
                return obj.understanding_image_file.url
        except Exception:
            pass
        return getattr(obj, 'understanding_image', '') or ''

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
