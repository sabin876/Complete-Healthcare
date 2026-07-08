from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import StaffProfile, Task, LeaveApplication, OtApplication, SalaryApplication, NoticeApplication, DutyApplication

class HealthcareAPITests(APITestCase):

    def setUp(self):
        # Create standard admin user
        self.admin_profile = StaffProfile.objects.create(
            staff_id="ADMIN-001",
            full_name="System Administrator",
            position="Chief Administrator",
            department="Administration",
            password="Admin@2024",
            role="admin"
        )
        # Create standard staff user
        self.staff_profile = StaffProfile.objects.create(
            staff_id="STF-CO1234",
            full_name="John Doe",
            position="Staff Nurse",
            department="Cardiology",
            password="Staff@2024",
            role="staff"
        )

    def test_login_success(self):
        url = reverse('login')
        data = {
            'staffId': 'STF-CO1234',
            'password': 'Staff@2024'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['user']['name'], 'John Doe')

    def test_login_case_insensitive(self):
        url = reverse('login')
        data = {
            'staffId': 'stf-co1234', # Lowercase
            'password': 'Staff@2024'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])

    def test_login_wrong_password(self):
        url = reverse('login')
        data = {
            'staffId': 'STF-CO1234',
            'password': 'WrongPassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])
        self.assertEqual(response.data['message'], 'Incorrect password.')

    def test_login_missing_credentials(self):
        url = reverse('login')
        data = {
            'staffId': '',
            'password': ''
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])

    def test_create_staff_success(self):
        url = reverse('staff-list')
        data = {
            'staffId': 'STF-CO5678',
            'fullName': 'Clara Oswald',
            'position': 'Medical Officer',
            'department': 'Pediatrics',
            'password': 'ClaraPassword',
            'role': 'staff'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        
        # Verify the staff exists in the DB
        self.assertTrue(StaffProfile.objects.filter(staff_id='STF-CO5678').exists())

    def test_create_staff_reserved_admin_id(self):
        url = reverse('staff-list')
        data = {
            'staffId': 'ADMIN-001',
            'fullName': 'Fake Admin',
            'position': 'Fake Position',
            'department': 'Fake Dept',
            'password': 'FakePassword',
            'role': 'admin'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])

    def test_create_task_success(self):
        url = reverse('tasks-list')
        data = {
            'title': 'Test Task',
            'description': 'Test Description',
            'priority': 'High',
            'dueDate': '2026-12-31',
            'assignedToId': 'STF-CO1234',
            'assignedByName': 'Admin'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], 'Test Task')
        self.assertEqual(response.data['assigned_to'], 'STF-CO1234')

    def test_create_task_invalid_staff(self):
        url = reverse('tasks-list')
        data = {
            'title': 'Test Task Invalid',
            'assignedToId': 'STF-NONEXIST',
            'assignedByName': 'Admin'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_task_filtering_by_assigned_to(self):
        # Create a task for John Doe
        Task.objects.create(
            title="Task 1",
            assigned_to=self.staff_profile,
            assigned_to_name=self.staff_profile.full_name,
            status="Pending"
        )
        # Create a task for admin
        Task.objects.create(
            title="Task 2",
            assigned_to=self.admin_profile,
            assigned_to_name=self.admin_profile.full_name,
            status="Pending"
        )

        url = reverse('tasks-list')
        # Filter for John Doe
        response = self.client.get(url, {'assigned_to': 'STF-CO1234'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Task 1')

    def test_leave_application_lifecycle(self):
        # Create leave
        url = reverse('leaves-list')
        data = {
            'staffId': 'STF-CO1234',
            'leaveType': 'Sick Leave',
            'leaveStart': '2026-07-01',
            'leaveEnd': '2026-07-05',
            'reason': 'Medical operation'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        leave_id = response.data['id']

        # Verify list and filter
        response = self.client.get(url, {'staff_id': 'STF-CO1234'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['leave_type'], 'Sick Leave')

        # Approve leave (PATCH)
        detail_url = reverse('leaves-detail', args=[leave_id])
        patch_response = self.client.patch(detail_url, {'status': 'Approved'}, format='json')
        self.assertEqual(patch_response.status_code, status.HTTP_200_OK)
        self.assertEqual(patch_response.data['status'], 'Approved')

    def test_ot_application_creation(self):
        url = reverse('ots-list')
        data = {
            'staffId': 'STF-CO1234',
            'otType': 'Night Shift',
            'otDate': '2026-06-25',
            'otHours': 4.5
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['ot_hours'], '4.5')

    def test_salary_application_creation(self):
        url = reverse('salaries-list')
        data = {
            'staffId': 'STF-CO1234',
            'incType': 'Promotion Appraisal'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['inc_type'], 'Promotion Appraisal')

    def test_notice_application_creation(self):
        url = reverse('notices-list')
        data = {
            'staffId': 'STF-CO1234',
            'noticeTitle': 'Absence Notice',
            'noticeMessage': 'Will be late tomorrow'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['notice_title'], 'Absence Notice')

    def test_duty_application_creation(self):
        url = reverse('duties-list')
        data = {
            'staffId': 'STF-CO1234',
            'dutyDate': '2026-06-28',
            'dutyReplacement': 'STF-CO5678',
            'dutyReason': 'Family event'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['duty_replacement'], 'STF-CO5678')
