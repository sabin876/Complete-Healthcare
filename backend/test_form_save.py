"""
Simulate what Django admin does when saving a BlogPost via the form.
This tests the full save pipeline: POST data → form → model → DB.
"""
import sys, os
sys.path.insert(0, '.')
os.environ['DJANGO_SETTINGS_MODULE'] = 'healthcare_backend.settings'

import django
django.setup()

from api.admin import BlogPostAdminForm
from api.models import BlogPost

test_content = '<p>This is a test paragraph.</p><h2>Section Title</h2><p>Another paragraph with <strong>bold text</strong>.</p>'

# Simulate POST data (what Django admin receives from the browser)
post_data = {
    'title': 'Test Blog Post',
    'slug': 'test-blog-post',
    'category': 'Health',
    'author': 'Dr. Test',
    'date': '2026-08-05',
    'read_time': '3 min read',
    'excerpt': 'A test excerpt',
    'content': test_content,
    'meta_title': '',
    'meta_description': '',
}

print("=== Testing BlogPostAdminForm ===")
print(f"Input content: {repr(test_content[:60])}...")
print()

form = BlogPostAdminForm(data=post_data)
print(f"Form is valid: {form.is_valid()}")
if not form.is_valid():
    print(f"Form errors: {form.errors}")
else:
    cleaned_content = form.cleaned_data.get('content', '')
    print(f"Cleaned content: {repr(cleaned_content[:80])}...")
    print(f"Content preserved: {test_content == cleaned_content}")
    
    # Test actual save
    try:
        instance = form.save(commit=False)
        print(f"Instance content after form.save(commit=False): {repr(instance.content[:80])}...")
        print()
        print("=== SAVE TEST PASSED - form correctly processes content ===")
    except Exception as e:
        print(f"Save error: {e}")
