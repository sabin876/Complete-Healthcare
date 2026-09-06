"""
URL configuration for healthcare_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect
from django.views.static import serve
from api.views import send_email, robots_txt_view, sitemap_xml_view

urlpatterns = [
    path('', lambda request: redirect('admin:index'), name='root_redirect'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('send-email/', send_email, name='root_send_email'),
    path('send-email', send_email, name='root_send_email_noslash'),
    path('robots.txt', robots_txt_view, name='robots_txt'),
    path('sitemap.xml', sitemap_xml_view, name='sitemap_xml'),
]

# Unconditionally serve media files to support production environments where the front-end server is not configured to serve them directly
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

