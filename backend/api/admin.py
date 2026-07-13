from django.contrib import admin
from .models import BlogPost, Service, TeamMember

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'author')
    list_filter = ('category', 'author')
    search_fields = ('title', 'content')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'eyebrow', 'theme_color')
    search_fields = ('title', 'tagline', 'description')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'post', 'photo')
    search_fields = ('name', 'post')

