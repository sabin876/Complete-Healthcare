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
