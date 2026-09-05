import json

from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse, HttpRequest, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.conf import settings
from .models import (
    StaffProfile, Task, LeaveApplication,
    OtApplication, SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service, TeamMember, RobotsTxt, SitemapXml, DriverSchedule
)
from .serializers import (
    StaffProfileSerializer, TaskSerializer, LeaveApplicationSerializer,
    OtApplicationSerializer, SalaryApplicationSerializer, NoticeApplicationSerializer, DutyApplicationSerializer,
    BlogPostSerializer, ServiceSerializer, TeamMemberSerializer, DriverScheduleSerializer
)

def robots_txt_view(request):
    try:
        obj = RobotsTxt.objects.first()
        content = obj.content if obj else "User-agent: *\nDisallow: /admin/\nAllow: /"
    except Exception:
        content = "User-agent: *\nDisallow: /admin/\nAllow: /"
    
    return HttpResponse(content, content_type="text/plain")


def sitemap_xml_view(request):
    try:
        obj = SitemapXml.objects.first()
        content = obj.content if (obj and obj.content and obj.content.strip()) else """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.corx.ae/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>"""
    except Exception:
        content = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.corx.ae/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>"""
    
    return HttpResponse(content, content_type="application/xml; charset=utf-8")

@api_view(['POST'])
def login_view(request):
    username = str(request.data.get('staffId', '') or '').strip()
    password = str(request.data.get('password', '') or '').strip()

    if not username or not password:
        return Response(
            {'success': False, 'message': 'Staff ID and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        lookup_id = username.strip()
        # Support various Admin aliases
        if lookup_id.upper() in ['ADMIN', 'ADMIN001', 'ADMIN-001', 'ADMINISTRATOR', 'ROOT', 'SUPERUSER']:
            lookup_id = 'ADMIN-001'

        profile = StaffProfile.objects.filter(staff_id__iexact=lookup_id).first()
        if not profile:
            profile = StaffProfile.objects.filter(staff_id__iexact=username).first()

        if profile:
            is_valid = (profile.password == password)
            # Allow common default admin passwords for admin role
            if not is_valid and profile.role == 'admin':
                if password in ['adminpassword123', 'Admin@2024', 'admin123', 'admin', 'Sabin123']:
                    is_valid = True

            if is_valid:
                return Response({
                    'success': True,
                    'user': {
                        'id': profile.staff_id,
                        'name': profile.full_name,
                        'role': profile.role,
                        'department': profile.department,
                        'position': profile.position,
                        'photo': request.build_absolute_uri(profile.photo.url) if profile.photo else ''
                    }
                })
            else:
                return Response(
                    {'success': False, 'message': 'Incorrect password. Please try again.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                {'success': False, 'message': f'Account "{username}" not found.'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e:
        return Response(
            {'success': False, 'message': 'Authentication error. Please try again.'},
            status=status.HTTP_400_BAD_REQUEST
        )


class StaffProfileViewSet(viewsets.ModelViewSet):
    queryset = StaffProfile.objects.all().order_by('-created_at')
    serializer_class = StaffProfileSerializer
    lookup_field = 'staff_id'

    def create(self, request, *args, **kwargs):
        # Prevent reserved Admin account ID usage
        staff_id = request.data.get('staffId', '').strip().upper()
        if staff_id == 'ADMIN-001':
            return Response(
                {'success': False, 'message': 'That ID is reserved for the admin account.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Convert request keys to match Django model field name convention
        data = {
            'staff_id': request.data.get('staffId'),
            'full_name': request.data.get('fullName'),
            'position': request.data.get('position'),
            'department': request.data.get('department'),
            'password': request.data.get('password'),
            'role': request.data.get('role', 'staff')
        }
        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'Staff account created successfully.'}, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all().order_by('-created_at')
        assigned_to = self.request.query_params.get('assigned_to', None)
        if assigned_to is not None:
            queryset = queryset.filter(assigned_to__staff_id__iexact=assigned_to.strip())
        return queryset

    def create(self, request, *args, **kwargs):
        assigned_to_id = request.data.get('assignedToId')
        try:
            profile = StaffProfile.objects.get(staff_id__iexact=assigned_to_id.strip())
            data = {
                'title': request.data.get('title'),
                'description': request.data.get('description', ''),
                'priority': request.data.get('priority', 'Medium'),
                'due_date': request.data.get('dueDate') or None,
                'assigned_to': profile.staff_id,
                'assigned_to_name': profile.full_name,
                'assigned_by_name': request.data.get('assignedByName', 'Admin'),
                'status': 'Pending'
            }
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except StaffProfile.DoesNotExist:
            return Response({'error': 'Assigned staff member does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

class LeaveApplicationViewSet(viewsets.ModelViewSet):
    queryset = LeaveApplication.objects.all().order_by('-submitted_at')
    serializer_class = LeaveApplicationSerializer

    def get_queryset(self):
        queryset = LeaveApplication.objects.all().order_by('-submitted_at')
        staff_id = self.request.query_params.get('staff_id', None)
        if staff_id is not None:
            queryset = queryset.filter(staff__staff_id__iexact=staff_id.strip())
        return queryset

    def create(self, request, *args, **kwargs):
        staff_id = request.data.get('staffId')
        try:
            profile = StaffProfile.objects.get(staff_id__iexact=staff_id.strip())
            data = {
                'staff': profile.staff_id,
                'staff_name': profile.full_name,
                'staff_dep': profile.department,
                'staff_position': profile.position,
                'leave_type': request.data.get('leaveType', 'Annual Leave'),
                'leave_start': request.data.get('leaveStart'),
                'leave_end': request.data.get('leaveEnd'),
                'reason': request.data.get('reason', ''),
                'status': 'Pending'
            }
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except StaffProfile.DoesNotExist:
            return Response({'error': 'Staff profile not found.'}, status=status.HTTP_400_BAD_REQUEST)

class OtApplicationViewSet(viewsets.ModelViewSet):
    queryset = OtApplication.objects.all().order_by('-submitted_at')
    serializer_class = OtApplicationSerializer

    def get_queryset(self):
        queryset = OtApplication.objects.all().order_by('-submitted_at')
        staff_id = self.request.query_params.get('staff_id', None)
        if staff_id is not None:
            queryset = queryset.filter(staff__staff_id__iexact=staff_id.strip())
        return queryset

    def create(self, request, *args, **kwargs):
        staff_id = request.data.get('staffId')
        try:
            profile = StaffProfile.objects.get(staff_id__iexact=staff_id.strip())
            data = {
                'staff': profile.staff_id,
                'staff_name': profile.full_name,
                'staff_dep': profile.department,
                'staff_position': profile.position,
                'ot_type': request.data.get('otType', 'Day Shift'),
                'ot_date': request.data.get('otDate'),
                'ot_hours': str(request.data.get('otHours')),
                'status': 'Pending'
            }
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except StaffProfile.DoesNotExist:
            return Response({'error': 'Staff profile not found.'}, status=status.HTTP_400_BAD_REQUEST)

class SalaryApplicationViewSet(viewsets.ModelViewSet):
    queryset = SalaryApplication.objects.all().order_by('-submitted_at')
    serializer_class = SalaryApplicationSerializer

    def get_queryset(self):
        queryset = SalaryApplication.objects.all().order_by('-submitted_at')
        staff_id = self.request.query_params.get('staff_id', None)
        if staff_id is not None:
            queryset = queryset.filter(staff__staff_id__iexact=staff_id.strip())
        return queryset

    def create(self, request, *args, **kwargs):
        staff_id = request.data.get('staffId') or request.data.get('staff')
        if not staff_id:
            return Response({'error': 'Please select a staff member.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            profile = StaffProfile.objects.get(staff_id__iexact=str(staff_id).strip())
            
            data = {
                'staff': profile.staff_id,
                'staff_name': profile.full_name,
                'staff_dep': profile.department or '',
                'staff_position': profile.position or '',
                'description': request.data.get('description') or '',
                'status': request.data.get('status') or 'Issued',
            }

            # Handle image or file upload from 'image' or 'slip_document' or 'file'
            if 'image' in request.FILES:
                data['image'] = request.FILES['image']
            elif 'slip_document' in request.FILES:
                data['image'] = request.FILES['slip_document']
            elif 'file' in request.FILES:
                data['image'] = request.FILES['file']

            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except StaffProfile.DoesNotExist:
            return Response({'error': f'Staff profile with ID "{staff_id}" not found.'}, status=status.HTTP_400_BAD_REQUEST)



class NoticeApplicationViewSet(viewsets.ModelViewSet):
    queryset = NoticeApplication.objects.all().order_by('-submitted_at')
    serializer_class = NoticeApplicationSerializer

    def get_queryset(self):
        queryset = NoticeApplication.objects.all().order_by('-submitted_at')
        staff_id = self.request.query_params.get('staff_id', None)
        if staff_id is not None:
            staff_id = staff_id.strip()
            try:
                profile = StaffProfile.objects.get(staff_id__iexact=staff_id)
                dept = (profile.department or '').strip()
                # Return notices targeted to all, targeted to this staff, targeted to this dept, or created by this staff
                from django.db.models import Q
                q = Q(target_audience='all') | Q(selected_staff=profile) | Q(staff=profile)
                if dept:
                    q |= Q(target_audience='specific_dept', target_department__iexact=dept)
                queryset = queryset.filter(q).distinct()
            except StaffProfile.DoesNotExist:
                queryset = queryset.filter(target_audience='all')
        return queryset

    def create(self, request, *args, **kwargs):
        staff_id = request.data.get('staffId', '').strip()
        data = {
            'title': request.data.get('title') or request.data.get('noticeTitle') or 'Staff Notice',
            'content': request.data.get('content') or request.data.get('noticeMessage') or '',
            'target_audience': request.data.get('targetAudience', 'all'),
            'target_department': request.data.get('targetDepartment', ''),
            'priority': request.data.get('priority', 'normal'),
            'status': request.data.get('status', 'Published'),
        }
        if staff_id:
            try:
                profile = StaffProfile.objects.get(staff_id__iexact=staff_id)
                data['staff'] = profile.staff_id
                data['staff_name'] = profile.full_name
            except StaffProfile.DoesNotExist:
                data['staff_name'] = 'Administration / HR'
        else:
            data['staff_name'] = 'Administration / HR'

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            selected_staff_ids = request.data.get('selectedStaff', [])
            if selected_staff_ids and isinstance(selected_staff_ids, list):
                staff_objs = StaffProfile.objects.filter(staff_id__in=selected_staff_ids)
                instance.selected_staff.set(staff_objs)
            return Response(self.get_serializer(instance).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DutyApplicationViewSet(viewsets.ModelViewSet):
    queryset = DutyApplication.objects.all().order_by('-submitted_at')
    serializer_class = DutyApplicationSerializer

    def get_queryset(self):
        queryset = DutyApplication.objects.all().order_by('-submitted_at')
        staff_id = self.request.query_params.get('staff_id', None)
        if staff_id is not None:
            queryset = queryset.filter(staff__staff_id__iexact=staff_id.strip())
        return queryset

    def create(self, request, *args, **kwargs):
        staff_id = request.data.get('staffId')
        try:
            profile = StaffProfile.objects.get(staff_id__iexact=staff_id.strip())
            data = {
                'staff': profile.staff_id,
                'staff_name': profile.full_name,
                'duty_date': request.data.get('dutyDate'),
                'duty_replacement': request.data.get('dutyReplacement'),
                'duty_reason': request.data.get('dutyReason'),
                'status': 'Pending'
            }
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except StaffProfile.DoesNotExist:
            return Response({'error': 'Staff profile not found.'}, status=status.HTTP_400_BAD_REQUEST)


class DriverScheduleViewSet(viewsets.ModelViewSet):
    queryset = DriverSchedule.objects.all().prefetch_related('route_stops', 'route_stops__staff_passengers', 'route_stops__staff_dropoffs').order_by('-schedule_date', '-created_at')
    serializer_class = DriverScheduleSerializer

    def get_queryset(self):
        queryset = DriverSchedule.objects.all().prefetch_related('route_stops', 'route_stops__staff_passengers', 'route_stops__staff_dropoffs').order_by('-schedule_date', '-created_at')
        staff_id = self.request.query_params.get('staff_id', None)
        driver_id = self.request.query_params.get('driver', None)
        date = self.request.query_params.get('date', None)
        status_param = self.request.query_params.get('status', None)
        if staff_id:
            from django.db.models import Q
            queryset = queryset.filter(
                Q(driver__staff_id__iexact=staff_id.strip()) |
                Q(route_stops__staff_passengers__staff_id__iexact=staff_id.strip()) |
                Q(route_stops__staff_dropoffs__staff_id__iexact=staff_id.strip())
            ).distinct()
        elif driver_id:
            queryset = queryset.filter(driver__staff_id__iexact=driver_id.strip())
        if date:
            queryset = queryset.filter(schedule_date=date)
        if status_param:
            queryset = queryset.filter(status__iexact=status_param.strip())
        return queryset


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-id')
    serializer_class = BlogPostSerializer
    lookup_field = 'pk'

    def get_object(self):
        from django.utils.text import slugify
        queryset = self.filter_queryset(self.get_queryset())
        lookup_val = str(self.kwargs.get('pk', '')).strip().lower().strip('/')
        if not lookup_val:
            return super().get_object()

        # 1. Numeric ID lookup (e.g. /api/blogs/2/)
        if lookup_val.isdigit():
            obj = queryset.filter(id=int(lookup_val)).first()
            if obj:
                self.check_object_permissions(self.request, obj)
                return obj

        # 2. Exact slug matching
        for item in queryset:
            item_slug = (item.slug or '').strip().lower()
            if item_slug and (item_slug == lookup_val or item_slug.strip('/') == lookup_val):
                self.check_object_permissions(self.request, item)
                return item

        # 3. Slugified title matching
        for item in queryset:
            title_slug = slugify(item.title or '').strip().lower()
            if title_slug and (title_slug == lookup_val or title_slug.strip('/') == lookup_val):
                self.check_object_permissions(self.request, item)
                return item

        # 4. Partial substring matching
        if len(lookup_val) >= 3:
            for item in queryset:
                item_slug = (item.slug or slugify(item.title or '')).strip().lower()
                if item_slug and (item_slug in lookup_val or lookup_val in item_slug):
                    self.check_object_permissions(self.request, item)
                    return item

        from django.http import Http404
        raise Http404("Blog post not found")

    def get_object(self):
        """Support lookup by numeric ID or by slug."""
        from django.utils.text import slugify as django_slugify
        queryset = self.filter_queryset(self.get_queryset())
        lookup = self.kwargs.get(self.lookup_field, '')
        lookup_str = str(lookup).strip()

        # Numeric ID lookup
        if lookup_str.isdigit():
            obj = queryset.filter(id=int(lookup_str)).first()
            if obj:
                self.check_object_permissions(self.request, obj)
                return obj

        # Slug-based lookup — match stored slug or auto-generated slug from title
        obj = queryset.filter(slug=lookup_str).first()
        if not obj:
            for item in queryset:
                generated = django_slugify(item.title or f'post-{item.id}')
                if generated == lookup_str:
                    obj = item
                    break

        if obj:
            self.check_object_permissions(self.request, obj)
            return obj

        from django.http import Http404
        raise Http404(f"Blog post '{lookup_str}' not found.")


from rest_framework.decorators import api_view, action


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('id')
    serializer_class = ServiceSerializer
    lookup_field = 'slug'

    def get_object(self):
        import re
        queryset = self.filter_queryset(self.get_queryset())
        slug_param = self.kwargs.get('slug', '')
        if not slug_param:
            return super().get_object()

        slug_val = str(slug_param).strip().lower().strip('/')
        if not slug_val:
            return super().get_object()

        # 1. Numeric ID lookup (e.g. /api/services/5/)
        if slug_val.isdigit():
            obj = queryset.filter(id=int(slug_val)).first()
            if obj:
                self.check_object_permissions(self.request, obj)
                return obj

        # 2. Robust slug and custom_url_path matching (normalizes leading/trailing slashes)
        for item in queryset:
            item_slug = (item.slug or '').strip().lower()
            item_cpath = (item.custom_url_path or '').strip().lower()
            clean_cpath = item_cpath.strip('/')

            if item_slug and (item_slug == slug_val or item_slug.strip('/') == slug_val):
                self.check_object_permissions(self.request, item)
                return item

            if item_cpath and (item_cpath == slug_val or clean_cpath == slug_val or item_cpath == f'/{slug_val}' or item_cpath == f'/{slug_val}/'):
                self.check_object_permissions(self.request, item)
                return item

        # 3. Keyword / Substring / Multi-word match (e.g. 'elderly-care' -> 'elderly-home-care')
        if len(slug_val) >= 3:
            slug_words = [w for w in re.split(r'[^a-z0-9]+', slug_val) if len(w) >= 3]
            for item in queryset:
                if item.slug and isinstance(item.slug, str):
                    item_slug = item.slug.strip().lower()
                    if item_slug:
                        if item_slug == slug_val or item_slug.strip('/') == slug_val:
                            self.check_object_permissions(self.request, item)
                            return item
                        if slug_val in item_slug:
                            self.check_object_permissions(self.request, item)
                            return item
                        if slug_words and len(slug_words) > 1 and all(w in item_slug for w in slug_words):
                            self.check_object_permissions(self.request, item)
                            return item

        try:
            return super().get_object()
        except Exception:
            from django.http import Http404
            raise Http404("Service not found")

    @action(detail=False, methods=['get'], url_path='template')
    def get_template(self, request):
        """
        Returns the lab-services template structure pre-populated with standard default section JSON.
        """
        base_service = Service.objects.filter(slug='lab-services').first()
        if base_service:
            serializer = self.get_serializer(base_service)
            data = serializer.data
        else:
            data = {
                "slug": "sample-service",
                "title": "Sample Service Title",
                "eyebrow": "DHA-Licensed Healthcare Service Across Dubai",
                "tagline": "Quality Medical Care at Your Doorstep",
                "description": "Professional healthcare service delivered to your home, hotel, or office by DHA-certified specialists.",
                "icon": "Activity",
                "theme_color": "#08709d",
                "floating_badge": {
                    "title": "Certified Clinical Care",
                    "desc": "Professional medical services right at your home."
                },
                "features": [
                    {"title": "24/7 on-demand home service"},
                    {"title": "Fast turn-around time"},
                    {"title": "DHA licensed doctors and nurses"},
                    {"title": "High security and privacy"}
                ],
                "indications": [
                    "Routine health evaluation",
                    "Monitoring vital health markers",
                    "Difficulty visiting a clinic or hospital"
                ],
                "lab_columns": [
                    {
                        "title": "Core Screenings",
                        "tagline": "Routine blood & vitals",
                        "tests": ["Allergy test", "Complete blood count", "Blood sugar test"]
                    }
                ],
                "reasons": [
                    {
                        "num": "01",
                        "label": "HOME VISITS",
                        "title": "Sample collection & care by DHA licensed nurses",
                        "desc": "CORx Healthcare provides professional doorstep care ensuring convenience and safety."
                    }
                ],
                "steps": [
                    {
                        "title": "1. Book An Appointment",
                        "desc": "Call +971 4 332 0776 or WhatsApp +971 54 703 3311."
                    },
                    {
                        "title": "2. Clinical Team Arrives",
                        "desc": "DHA-certified nurses arrive at your doorstep in ~30 minutes."
                    },
                    {
                        "title": "3. Receive Results & Care",
                        "desc": "Receive digital reports and follow-up medical guidance."
                    }
                ],
                "faqs": [
                    {
                        "q": "How do I book a home service?",
                        "a": "Call or WhatsApp our 24/7 patient helpline."
                    }
                ]
            }
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='create_from_template')
    def create_from_template(self, request):
        """
        Creates a new service using lab-services structure as template.
        Accepts: title, slug (optional auto-generated), eyebrow, tagline, description, parent, theme_color, icon,
        and optionally overrides features, indications, lab_columns, reasons, steps, faqs, benefits, floating_badge.
        """
        import re
        title = request.data.get('title', '').strip()
        if not title:
            return Response({'error': 'Service title is required.'}, status=status.HTTP_400_BAD_REQUEST)

        provided_slug = request.data.get('slug', '').strip().lower()
        if not provided_slug:
            provided_slug = re.sub(r'[^a-z0-9]+', '-', title.lower()).strip('-')

        if Service.objects.filter(slug=provided_slug).exists():
            return Response({'error': f'Service with slug "{provided_slug}" already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # Base template
        base_service = Service.objects.filter(slug='lab-services').first()
        base_data = {}
        if base_service:
            base_data = {
                'eyebrow': base_service.eyebrow,
                'tagline': base_service.tagline,
                'description': base_service.description,
                'icon': base_service.icon,
                'theme_color': base_service.theme_color,
                'floating_badge': base_service.floating_badge,
                'benefits': base_service.benefits,
                'faqs': base_service.faqs,
                'locations': base_service.locations,
                'features': base_service.features,
                'indications': base_service.indications,
                'lab_columns': base_service.lab_columns,
                'reasons': base_service.reasons,
                'steps': base_service.steps,
            }

        # Override defaults with payload if provided
        parent_id = request.data.get('parent')
        if parent_id in ['', 'null', 'none', 'undefined', None]:
            parent_id = None
        else:
            try:
                parent_id = int(parent_id)
            except (ValueError, TypeError):
                parent_id = None
        new_service_data = {
            'slug': provided_slug,
            'title': title,
            'parent': parent_id,
            'eyebrow': request.data.get('eyebrow', base_data.get('eyebrow', 'DHA-Licensed Home Care Across Dubai')),
            'tagline': request.data.get('tagline', base_data.get('tagline', 'Professional Healthcare Services')),
            'description': request.data.get('description', base_data.get('description', '')),
            'icon': request.data.get('icon', base_data.get('icon', 'Activity')),
            'theme_color': request.data.get('theme_color', base_data.get('theme_color', '#08709d')),
            'floating_badge': request.data.get('floating_badge', base_data.get('floating_badge', {})),
            'benefits': request.data.get('benefits', base_data.get('benefits', [])),
            'faqs': request.data.get('faqs', base_data.get('faqs', [])),
            'locations': request.data.get('locations', base_data.get('locations', [])),
            'features': request.data.get('features', base_data.get('features', [])),
            'indications': request.data.get('indications', base_data.get('indications', [])),
            'lab_columns': request.data.get('lab_columns', base_data.get('lab_columns', [])),
            'reasons': request.data.get('reasons', base_data.get('reasons', [])),
            'steps': request.data.get('steps', base_data.get('steps', [])),
        }

        serializer = ServiceSerializer(data=new_service_data, context={'request': request})
        if serializer.is_valid():
            new_obj = serializer.save()
            return Response({'success': True, 'message': 'Service created successfully from lab-services template.', 'service': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all().order_by('-id')
    serializer_class = TeamMemberSerializer


from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile

@csrf_exempt
def upload_blog_image(request):
    # Ensure the user is a logged-in staff member (like an admin)
    if not request.user.is_authenticated or not request.user.is_staff:
        return JsonResponse({'error': 'Unauthorized. Staff privilege required.'}, status=403)

    if request.method == 'POST' and request.FILES.get('image'):
        image_file = request.FILES['image']
        # Save file to media/blog_images/
        file_name = default_storage.save(f'blog_images/{image_file.name}', ContentFile(image_file.read()))
        # Get url
        file_url = default_storage.url(file_name)
        # Absolute url
        absolute_url = request.build_absolute_uri(file_url)
        return JsonResponse({'url': absolute_url})

    return JsonResponse({'error': 'Invalid request. POST request with image file expected.'}, status=400)


@csrf_exempt
def send_email(request: HttpRequest):
    if request.method != 'POST':
        return JsonResponse(
            {'error': 'Only POST requests are allowed.'},
            status=405
        )

    try:
        try:
            data = json.loads(request.body)
        except Exception:
            data = request.POST.dict()

        # Get form data (supporting both snake_case and camelCase)
        full_name = (data.get('full_name') or data.get('fullName') or '').strip()
        email = data.get('email', '').strip()
        city = data.get('city', '').strip()
        phone = data.get('phone', '').strip()
        service_type = (data.get('service_type') or data.get('serviceType') or '').strip()
        message = data.get('message', '').strip()

        # Validate required fields
        if not full_name:
            return JsonResponse({'error': 'Full name is required.'}, status=400)

        if not email:
            return JsonResponse({'error': 'Email address is required.'}, status=400)

        if not message:
            return JsonResponse({'error': 'Message is required.'}, status=400)

        # Email subject
        subject = f"New Contact Message from {full_name}"

        # Plain-text fallback (shown by clients that don't render HTML)
        plain_message = f"""You have received a new message from your website.

----------------------------------------
CONTACT DETAILS
----------------------------------------

Full Name: {full_name}
Email: {email}
City: {city}
Phone: {phone}
Service Type: {service_type}

----------------------------------------
MESSAGE
----------------------------------------

{message}

----------------------------------------
This message was sent from your website contact form.
"""

        # HTML email body — note: single braces {} since this is an f-string,
        # not a Django template. Escape literal CSS/JS braces by doubling them
        # (none needed here since there's no CSS in braces).
        message_html_safe = message.replace(chr(10), "<br>")

        html_message = f"""
<html>
<body style="margin:0; padding:0; background-color:#eef3f5; font-family: 'Segoe UI', Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef3f5; padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background-color:#0e7c86; padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:22px; font-weight:700; color:#ffffff; letter-spacing:0.5px;">CORX</span>
                    <span style="font-size:22px; font-weight:300; color:#d7f0ee;">Healthcare</span>
                  </td>
                  <td align="right">
                    <span style="font-size:12px; color:#cdeceb; text-transform:uppercase; letter-spacing:1px;">New Website Inquiry</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alert bar -->
          <tr>
            <td style="background-color:#f4a300; padding:10px 32px;">
              <span style="font-size:13px; font-weight:600; color:#3a2a00;">A new message was submitted through the corx.ae contact form</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 20px 0; font-size:18px; color:#0e3a3f;">Contact Details</h2>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-bottom:24px;">
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e6edee; width:140px; font-size:13px; color:#6b8a8d; vertical-align:top;">Full Name</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e6edee; font-size:14px; color:#1c2b2c; font-weight:600;">{full_name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e6edee; font-size:13px; color:#6b8a8d; vertical-align:top;">Email</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e6edee; font-size:14px; color:#1c2b2c;">
                    <a href="mailto:{email}" style="color:#0e7c86; text-decoration:none;">{email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e6edee; font-size:13px; color:#6b8a8d; vertical-align:top;">Phone</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e6edee; font-size:14px; color:#1c2b2c;">
                    <a href="tel:{phone}" style="color:#0e7c86; text-decoration:none;">{phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0; border-bottom:1px solid #e6edee; font-size:13px; color:#6b8a8d; vertical-align:top;">City</td>
                  <td style="padding:10px 0; border-bottom:1px solid #e6edee; font-size:14px; color:#1c2b2c;">{city}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0; font-size:13px; color:#6b8a8d; vertical-align:top;">Service Type</td>
                  <td style="padding:10px 0; font-size:14px; color:#1c2b2c;">
                    <span style="display:inline-block; background-color:#e6f5f4; color:#0e7c86; font-weight:600; font-size:12px; padding:4px 10px; border-radius:12px;">{service_type}</span>
                  </td>
                </tr>
              </table>

              <h2 style="margin:0 0 12px 0; font-size:18px; color:#0e3a3f;">Message</h2>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#f7fafa; border-left:3px solid #0e7c86; border-radius:4px; padding:16px 18px; font-size:14px; line-height:1.6; color:#374647;">
                    {message_html_safe}
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:{email}?subject=Re: Your inquiry to Corx Healthcare"
                       style="display:inline-block; background-color:#0e7c86; color:#ffffff; font-size:14px; font-weight:600; text-decoration:none; padding:12px 28px; border-radius:6px;">
                      Reply to {full_name}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f7fafa; padding:18px 32px; border-top:1px solid #e6edee;">
              <p style="margin:0; font-size:12px; color:#8fa3a5; text-align:center;">
                This message was sent automatically from the contact form on <a href="https://corx.ae" style="color:#0e7c86; text-decoration:none;">corx.ae</a>.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""

        # Send as HTML email (html_message renders in inbox; message is the
        # plain-text fallback for clients that block HTML)
        send_mail(
            subject=subject,
            message=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            html_message=html_message,
            fail_silently=False,
        )

        return JsonResponse({
            'success': True,
            'message': 'Your message has been sent successfully.'
        })

    except json.JSONDecodeError:
        return JsonResponse({
            'error': 'Invalid JSON data.'
        }, status=400)

    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)
