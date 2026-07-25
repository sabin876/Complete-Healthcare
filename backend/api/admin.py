import json
from django.contrib import admin
from django import forms
from django.utils.safestring import mark_safe
from .models import BlogPost, Service, TeamMember

class FAQJsonWidget(forms.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        if value is None:
            value = []
        if isinstance(value, str):
            try:
                value = json.loads(value)
            except Exception:
                value = []
        
        json_str = json.dumps(value)
        escaped_json = json_str.replace("&", "&amp;").replace("'", "&#39;").replace('"', "&quot;")

        html = f"""
        <div id="faq-widget-container" style="max-width: 950px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
            <input type="hidden" name="{name}" id="id_{name}_hidden" value="{escaped_json}" />
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <span style="font-weight: 700; font-size: 13px; color: #1e293b; text-transform: uppercase; tracking-wider;">FAQ Dropdown Manager</span>
                <div style="display: flex; gap: 8px;">
                    <button type="button" id="expand-all-faqs" style="background: #e2e8f0; color: #334155; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 600; cursor: pointer;">▼ Expand All</button>
                    <button type="button" id="collapse-all-faqs" style="background: #e2e8f0; color: #334155; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 600; cursor: pointer;">► Collapse All</button>
                </div>
            </div>

            <div id="faq-items-list" style="display: flex; flex-direction: column; gap: 12px;"></div>
            
            <div style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: space-between; align-items: center;">
                <button type="button" id="add-faq-btn" style="background: #08709d; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(8,112,157,0.2);">
                    + Add New FAQ Dropdown Item
                </button>
                <span style="font-size: 12px; color: #64748b; font-style: italic;">Click any FAQ dropdown header to expand or collapse.</span>
            </div>
        </div>

        <script>
        (function() {{
            const hiddenInput = document.getElementById('id_{name}_hidden');
            const container = document.getElementById('faq-items-list');
            const addBtn = document.getElementById('add-faq-btn');
            const expandAllBtn = document.getElementById('expand-all-faqs');
            const collapseAllBtn = document.getElementById('collapse-all-faqs');
            
            let faqs = [];
            let openStates = {{}}; // tracks expanded dropdown states
            
            try {{
                faqs = JSON.parse(hiddenInput.value || '[]');
            }} catch(e) {{
                faqs = [];
            }}
            if (!Array.isArray(faqs)) faqs = [];
            
            function sync() {{
                hiddenInput.value = JSON.stringify(faqs);
            }}

            function escapeHtml(str) {{
                return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            }}
            
            function renderItems() {{
                container.innerHTML = '';
                if (faqs.length === 0) {{
                    container.innerHTML = '<div style="text-align: center; padding: 24px; color: #94a3b8; font-size: 13px; font-style: italic; background: white; border-radius: 8px; border: 1px dashed #cbd5e1;">No FAQs added yet. Click "+ Add New FAQ Dropdown Item" to create your first dropdown item.</div>';
                    return;
                }}
                
                faqs.forEach((faq, idx) => {{
                    const isOpen = openStates[idx] !== undefined ? openStates[idx] : (idx === 0);
                    const card = document.createElement('div');
                    card.style.cssText = "background: white; border: 1.5px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.03);";
                    
                    const qTitle = faq.q ? escapeHtml(faq.q) : '(Untitled Question)';

                    card.innerHTML = `
                        <div class="faq-dropdown-header" data-idx="${{idx}}" style="display: flex; justify-content: space-between; align-items: center; background: ${{isOpen ? '#e0f2fe' : '#f1f5f9'}}; padding: 12px 16px; cursor: pointer; user-select: none; transition: background 0.2s; border-bottom: ${{isOpen ? '1px solid #bae6fd' : 'none'}};">
                            <div style="display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 13.5px; color: #08709d; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 80%;">
                                <span style="font-size: 12px; font-weight: 800; color: ${{isOpen ? '#0284c7' : '#64748b'}};">${{isOpen ? '▼' : '►'}}</span>
                                <span style="color: #08709d; font-weight: 800;">FAQ #${{idx + 1}}:</span>
                                <span style="color: #1e293b; font-weight: 600; overflow: hidden; text-overflow: ellipsis;">${{qTitle}}</span>
                            </div>
                            <div style="display: flex; gap: 8px; align-items: center;" onclick="event.stopPropagation();">
                                <button type="button" class="remove-faq-btn" data-idx="${{idx}}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 4px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 700; cursor: pointer;">
                                    🗑️ Remove
                                </button>
                            </div>
                        </div>
                        <div class="faq-dropdown-body" style="display: ${{isOpen ? 'block' : 'none'}}; padding: 16px; background: white;">
                            <div style="margin-bottom: 12px;">
                                <label style="display: block; font-weight: 700; font-size: 12px; color: #1e293b; margin-bottom: 5px;">Question:</label>
                                <input type="text" class="faq-q-input" data-idx="${{idx}}" value="${{escapeHtml(faq.q)}}" placeholder="e.g. Is Doctor On Call service available 24/7 in Dubai?" style="width: 100%; box-sizing: border-box; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13.5px; outline: none;" />
                            </div>
                            <div>
                                <label style="display: block; font-weight: 700; font-size: 12px; color: #1e293b; margin-bottom: 5px;">Answer:</label>
                                <textarea class="faq-a-input" data-idx="${{idx}}" rows="3" placeholder="Enter detailed answer here..." style="width: 100%; box-sizing: border-box; padding: 9px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13.5px; font-family: inherit; resize: vertical;">${{escapeHtml(faq.a)}}</textarea>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                }});
                
                // Toggle accordion header
                container.querySelectorAll('.faq-dropdown-header').forEach(header => {{
                    header.addEventListener('click', (e) => {{
                        const idx = parseInt(header.getAttribute('data-idx'));
                        openStates[idx] = !openStates[idx];
                        renderItems();
                    }});
                }});

                // Attach inputs
                container.querySelectorAll('.faq-q-input').forEach(input => {{
                    input.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        faqs[idx].q = e.target.value;
                        sync();
                        // Update header title live
                        const headerTitle = container.querySelector(`.faq-dropdown-header[data-idx="${{idx}}"] span:last-child`);
                        if (headerTitle) headerTitle.textContent = e.target.value || '(Untitled Question)';
                    }});
                }});
                
                container.querySelectorAll('.faq-a-input').forEach(textarea => {{
                    textarea.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        faqs[idx].a = e.target.value;
                        sync();
                    }});
                }});
                
                container.querySelectorAll('.remove-faq-btn').forEach(btn => {{
                    btn.addEventListener('click', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        faqs.splice(idx, 1);
                        delete openStates[idx];
                        renderItems();
                        sync();
                    }});
                }});
            }}
            
            addBtn.addEventListener('click', () => {{
                faqs.push({{ q: '', a: '' }});
                openStates[faqs.length - 1] = true; // Open newly added FAQ
                renderItems();
                sync();
            }});

            expandAllBtn.addEventListener('click', () => {{
                faqs.forEach((_, idx) => openStates[idx] = true);
                renderItems();
            }});

            collapseAllBtn.addEventListener('click', () => {{
                faqs.forEach((_, idx) => openStates[idx] = false);
                renderItems();
            }});
            
            renderItems();
        }})();
        </script>
        """
        return mark_safe(html)

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
    faqs = forms.JSONField(
        widget=FAQJsonWidget(),
        required=False,
        help_text="User-Friendly FAQ Builder: Add, edit, or remove Question & Answer cards without writing JSON."
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

