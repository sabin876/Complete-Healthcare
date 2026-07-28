from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import (
    StaffProfile, Task, LeaveApplication,
    OtApplication, SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service, TeamMember
)
from .serializers import (
    StaffProfileSerializer, TaskSerializer, LeaveApplicationSerializer,
    OtApplicationSerializer, SalaryApplicationSerializer, NoticeApplicationSerializer, DutyApplicationSerializer,
    BlogPostSerializer, ServiceSerializer, TeamMemberSerializer
)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('staffId', '').strip()
    password = request.data.get('password', '')

    if not username or not password:
        return Response(
            {'success': False, 'message': 'Staff ID and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Case-insensitive login check
        lookup_id = username.strip()
        if lookup_id.upper() == 'ADMIN':
            lookup_id = 'ADMIN-001'
        profile = StaffProfile.objects.get(staff_id__iexact=lookup_id)
        if profile.password == password:
            return Response({
                'success': True,
                'user': {
                    'id': profile.staff_id,
                    'name': profile.full_name,
                    'role': profile.role,
                    'department': profile.department,
                    'position': profile.position
                }
            })
        else:
            return Response(
                {'success': False, 'message': 'Incorrect password.'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except StaffProfile.DoesNotExist:
        return Response(
            {'success': False, 'message': 'Account not found.'},
            status=status.HTTP_400_BAD_REQUEST
        )

class StaffProfileViewSet(viewsets.ModelViewSet):
    queryset = StaffProfile.objects.all().order_index('-created_at') if hasattr(StaffProfile.objects, 'order_index') else StaffProfile.objects.all().order_by('-created_at')
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
        staff_id = request.data.get('staffId')
        try:
            profile = StaffProfile.objects.get(staff_id__iexact=staff_id.strip())
            data = {
                'staff': profile.staff_id,
                'staff_name': profile.full_name,
                'staff_dep': profile.department,
                'staff_position': profile.position,
                'inc_type': request.data.get('incType', 'Merit-Based Performance Review'),
                'status': 'Pending'
            }
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except StaffProfile.DoesNotExist:
            return Response({'error': 'Staff profile not found.'}, status=status.HTTP_400_BAD_REQUEST)

class NoticeApplicationViewSet(viewsets.ModelViewSet):
    queryset = NoticeApplication.objects.all().order_by('-submitted_at')
    serializer_class = NoticeApplicationSerializer

    def get_queryset(self):
        queryset = NoticeApplication.objects.all().order_by('-submitted_at')
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
                'notice_title': request.data.get('noticeTitle'),
                'notice_message': request.data.get('noticeMessage'),
                'status': 'Pending'
            }
            serializer = self.get_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except StaffProfile.DoesNotExist:
            return Response({'error': 'Staff profile not found.'}, status=status.HTTP_400_BAD_REQUEST)

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


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-id')
    serializer_class = BlogPostSerializer


from rest_framework.decorators import api_view, action


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all().order_by('id')
    serializer_class = ServiceSerializer
    lookup_field = 'slug'

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        slug_val = self.kwargs.get('slug', '').strip().lower()

        # 1. Exact slug match
        obj = queryset.filter(slug__iexact=slug_val).first()
        if obj:
            self.check_object_permissions(self.request, obj)
            return obj

        # 2. Keyword/substring match (e.g. 'physiotherapy-at-home-in-dubai' -> 'physiotherapy')
        for item in queryset:
            if item.slug and (item.slug in slug_val or slug_val in item.slug):
                self.check_object_permissions(self.request, item)
                return item

        return super().get_object()

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


from django.http import JsonResponse
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

