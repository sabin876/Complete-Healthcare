from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    login_view, StaffProfileViewSet, TaskViewSet, LeaveApplicationViewSet,
    OtApplicationViewSet, SalaryApplicationViewSet, NoticeApplicationViewSet, DutyApplicationViewSet
)

router = DefaultRouter()
router.register(r'staff', StaffProfileViewSet, basename='staff')
router.register(r'tasks', TaskViewSet, basename='tasks')
router.register(r'leaves', LeaveApplicationViewSet, basename='leaves')
router.register(r'ots', OtApplicationViewSet, basename='ots')
router.register(r'salaries', SalaryApplicationViewSet, basename='salaries')
router.register(r'notices', NoticeApplicationViewSet, basename='notices')
router.register(r'duties', DutyApplicationViewSet, basename='duties')

urlpatterns = [
    path('login/', login_view, name='login'),
    path('', include(router.urls)),
]
