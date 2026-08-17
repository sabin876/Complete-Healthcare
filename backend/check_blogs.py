import sys, os
sys.path.insert(0, '.')
os.environ['DJANGO_SETTINGS_MODULE'] = 'healthcare_backend.settings'

import django
django.setup()

from api.models import BlogPost

# Check all blog posts and their content
posts = BlogPost.objects.all()
print(f"Total blog posts: {posts.count()}")
print()

for p in posts:
    content_preview = (p.content or '')[:120].replace('\n', ' ').strip()
    print(f"ID={p.id} | title='{p.title[:40]}' | content_len={len(p.content or '')} | content_preview='{content_preview}'")

print()
print("---")
print("If content_len is 0 for posts you edited, the save is definitely not working.")
print("If content_len > 0, the issue may be in the frontend rendering.")
