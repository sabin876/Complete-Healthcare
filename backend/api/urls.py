from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login_view, StaffProfileViewSet, TaskViewSet, LeaveApplicationViewSet,
    OtApplicationViewSet, SalaryApplicationViewSet, NoticeApplicationViewSet, DutyApplicationViewSet,
    BlogPostViewSet, ServiceViewSet, TeamMemberViewSet, DriverScheduleViewSet, upload_blog_image , send_email,
    robots_txt_view, sitemap_xml_view
)

router = DefaultRouter()
router.register(r'staff', StaffProfileViewSet, basename='staff')
router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'leaves', LeaveApplicationViewSet, basename='leaves')
router.register(r'ots', OtApplicationViewSet, basename='ots')
router.register(r'salaries', SalaryApplicationViewSet, basename='salaries')
router.register(r'notices', NoticeApplicationViewSet, basename='notices')
router.register(r'duties', DutyApplicationViewSet, basename='duties')
router.register(r'blogs', BlogPostViewSet, basename='blogs')
router.register(r'services', ServiceViewSet, basename='services')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'driver-schedules', DriverScheduleViewSet, basename='driver-schedules')
router.register(r'driver-schedule', DriverScheduleViewSet, basename='driver-schedule')
router.register(r'driver_schedules', DriverScheduleViewSet, basename='driver_schedules')


urlpatterns = [
    path('login/', login_view, name='login'),
    path('upload_blog_image/', upload_blog_image, name='upload_blog_image'),
    path('robots.txt', robots_txt_view, name='api_robots_txt'),
    path('sitemap.xml', sitemap_xml_view, name='api_sitemap_xml'),
    path('', include(router.urls)),
    path('send-email/', send_email, name='send_email'),
]

