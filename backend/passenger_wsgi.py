import os
import sys

# Ensure Django project root is in sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Fallback for PyMySQL if mysqlclient C extension is not compiled on server
try:
    import pymysql
    pymysql.install_as_MySQLdb()
except ImportError:
    pass

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'healthcare_backend.settings')

from healthcare_backend.wsgi import application

# Auto-run pending database migrations on server boot
try:
    from django.core.management import call_command
    call_command('migrate', interactive=False)
except Exception as e:
    pass

