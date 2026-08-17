import sys, os
sys.path.insert(0, '.')
os.environ['DJANGO_SETTINGS_MODULE'] = 'healthcare_backend.settings'

import django
django.setup()

from api.admin import RichTextEditorWidget

w = RichTextEditorWidget()

# Test 1: empty content
out_empty = w.render('content', '')
print("=== TEST 1: Empty content ===")
print("Has textarea name=content:", 'name="content"' in out_empty)
print("Has empty initialContent:", 'const initialContent = "";' in out_empty)
print()

# Test 2: existing HTML content
out_html = w.render('content', '<p>Hello World</p><h2>Title</h2>')
print("=== TEST 2: HTML content ===")
print("Has textarea name=content:", 'name="content"' in out_html)
idx = out_html.find('const initialContent =')
if idx != -1:
    snippet = out_html[idx:idx+100]
    print("initialContent line:", snippet)
else:
    print("ERROR: initialContent not found!")
print()

# Test 3: value_from_datadict
from django.http import QueryDict
qd = QueryDict('content=%3Cp%3EHello%3C%2Fp%3E')  # <p>Hello</p> URL-encoded
val = w.value_from_datadict(qd, {}, 'content')
print("=== TEST 3: value_from_datadict ===")
print("Extracted value:", repr(val))
print("PASS" if val == '<p>Hello</p>' else "FAIL - got: " + repr(val))
