from django.contrib import admin
from django import forms
from .models import BlogPost, Service, TeamMember

class BlogPostAdminForm(forms.ModelForm):
    title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 16px; font-weight: 600; padding: 10px 14px; border-radius: 6px;'}),
        help_text="Enter the article title"
    )
    category = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 700px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        help_text="e.g. Home Healthcare, KNEE-REPLACEMENT, Home Nursing"
    )
    date = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 400px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        help_text="e.g. May 30, 2026"
    )
    author = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 700px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        help_text="Author name e.g. Dr. Ulhas Sonar or Corx"
    )
    image = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 14px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="Paste Image URL string or use Image File upload below"
    )
    excerpt = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 4, 'cols': 80, 'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 10px 14px; border-radius: 6px; font-family: inherit;'}),
        required=False,
        help_text="Short preview summary displayed on article cards"
    )
    content = forms.CharField(
        widget=forms.Textarea(attrs={'id': 'id_content', 'class': 'ckeditor'}),
        required=False,
        help_text="Rich Text Editor: Format headers, bold text, bullet points, quotes, links, and images."
    )

    class Meta:
        model = BlogPost
        fields = '__all__'

class ServiceAdminForm(forms.ModelForm):
    title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 16px; font-weight: 600; padding: 10px 14px; border-radius: 6px;'}),
    )
    eyebrow = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False
    )
    tagline = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 10px 14px; border-radius: 6px; font-family: inherit;'}),
        required=False
    )
    description = forms.CharField(
        widget=forms.Textarea(attrs={'id': 'id_description', 'class': 'ckeditor'}),
        required=False,
        help_text="Rich Text Editor: Format service descriptions and details."
    )

    class Meta:
        model = Service
        fields = '__all__'

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ('title', 'category', 'date', 'author')
    list_filter = ('category', 'author')
    search_fields = ('title', 'content')

    class Media:
        js = (
            'https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js',
            'js/admin_ckeditor_init.js',
        )

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    list_display = ('title', 'eyebrow', 'theme_color')
    search_fields = ('title', 'tagline', 'description')

    class Media:
        js = (
            'https://cdn.ckeditor.com/4.22.1/standard/ckeditor.js',
            'js/admin_ckeditor_init.js',
        )

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'post', 'photo')
    search_fields = ('name', 'post')
