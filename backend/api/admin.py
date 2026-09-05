import os
import json
from django.contrib import admin
from django import forms
from django.utils.safestring import mark_safe
from .models import (
    StaffProfile, Task, LeaveApplication, OtApplication,
    SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service, TeamMember, DriverSchedule, DriverRouteStop
)
from django.utils.html import conditional_escape

# Ensure custom Notice submit_line template exists
_tpl_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'templates', 'admin', 'api', 'noticeapplication')
os.makedirs(_tpl_dir, exist_ok=True)
_tpl_file = os.path.join(_tpl_dir, 'submit_line.html')
with open(_tpl_file, 'w', encoding='utf-8') as _f:
    _f.write("""{% load i18n admin_urls jazzmin %}
{% get_jazzmin_ui_tweaks as jazzmin_ui %}

{% block submit-row %}
<div class="d-flex flex-wrap gap-3 align-items-center mt-3 pt-3" style="border-top: 1.5px solid #e2e8f0; width: 100%;">
    <button type="submit" name="_save" class="btn" style="background: linear-gradient(135deg, #08709d 0%, #0ea5e9 100%); color: #ffffff; font-weight: 800; font-size: 14px; padding: 12px 32px; border-radius: 12px; border: none; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 16px rgba(8, 112, 157, 0.35); text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer;">
        <i class="fas fa-paper-plane" style="font-size: 15px;"></i> Send Notice
    </button>

    <a href="{% url opts|admin_urlname:'changelist' %}" class="btn" style="background: #f1f5f9; color: #475569; font-weight: 700; font-size: 13px; padding: 12px 20px; border-radius: 12px; border: 1px solid #cbd5e1; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
        <i class="fas fa-times"></i> Cancel
    </a>

    {% if show_delete_link and original %}
        {% url opts|admin_urlname:'delete' original.pk|admin_urlquote as delete_url %}
        <a href="{% add_preserved_filters delete_url %}" class="btn ms-auto" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; font-weight: 700; font-size: 13px; padding: 12px 20px; border-radius: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fas fa-trash-alt"></i> Delete Notice
        </a>
    {% endif %}
</div>
{% endblock %}
""")

# ----------------------------------------------------------------------
# Helper functions for UI widgets
# ----------------------------------------------------------------------

def escape_json_for_attr(val):
    if val is None:
        val = []
    if isinstance(val, str):
        try:
            val = json.loads(val)
        except Exception:
            val = []
    json_str = json.dumps(val)
    return json_str.replace("&", "&amp;").replace("'", "&#39;").replace('"', "&quot;")

# ----------------------------------------------------------------------
# 1. Simple List Widget (For Indications & Features)
# ----------------------------------------------------------------------
class SimpleListJsonWidget(forms.Widget):
    def __init__(self, item_label="Item", placeholder="Enter text...", is_object_title=False, attrs=None):
        super().__init__(attrs)
        self.item_label = item_label
        self.placeholder = placeholder
        self.is_object_title = is_object_title

    def render(self, name, value, attrs=None, renderer=None):
        escaped_json = escape_json_for_attr(value)
        container_id = f"list-widget-{name}"

        html = f"""
        <div id="{container_id}" style="max-width: 950px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
            <input type="hidden" name="{name}" id="id_{name}_hidden" value="{escaped_json}" />
            
            <div style="font-weight: 700; font-size: 13px; color: #1e293b; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
                {self.item_label} List Builder
            </div>

            <div id="{container_id}-items" style="display: flex; flex-direction: column; gap: 8px;"></div>
            
            <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
                <button type="button" id="{container_id}-add-btn" style="background: #08709d; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 12.5px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                    + Add New {self.item_label}
                </button>
            </div>
        </div>

        <script>
        (function() {{
            const hiddenInput = document.getElementById('id_{name}_hidden');
            const itemsContainer = document.getElementById('{container_id}-items');
            const addBtn = document.getElementById('{container_id}-add-btn');
            const isObjTitle = { 'true' if self.is_object_title else 'false' };
            
            let listData = [];
            try {{
                listData = JSON.parse(hiddenInput.value || '[]');
            }} catch(e) {{
                listData = [];
            }}
            if (!Array.isArray(listData)) listData = [];

            function sync() {{
                hiddenInput.value = JSON.stringify(listData);
            }}

            function render() {{
                itemsContainer.innerHTML = '';
                if (listData.length === 0) {{
                    itemsContainer.innerHTML = '<div style="color: #94a3b8; font-size: 13px; font-style: italic; padding: 10px; background: white; border-radius: 6px; border: 1px dashed #cbd5e1;">No items added yet. Click "+ Add New {self.item_label}" above.</div>';
                    return;
                }}

                listData.forEach((item, idx) => {{
                    const val = isObjTitle ? (item.title || '') : (typeof item === 'string' ? item : '');
                    const row = document.createElement('div');
                    row.style.cssText = "display: flex; gap: 10px; align-items: center; background: white; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 8px;";
                    
                    row.innerHTML = `
                        <span style="font-weight: 700; color: #64748b; font-size: 12px; width: 24px;">#${{idx + 1}}</span>
                        <input type="text" class="item-input" data-idx="${{idx}}" value="${{(val || '').replace(/"/g, '&quot;')}}" placeholder="{self.placeholder}" style="flex: 1; padding: 7px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13.5px; outline: none;" />
                        <button type="button" class="del-btn" data-idx="${{idx}}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">🗑️ Delete</button>
                    `;
                    itemsContainer.appendChild(row);
                }});

                itemsContainer.querySelectorAll('.item-input').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        if (isObjTitle) {{
                            listData[idx] = {{ title: e.target.value }};
                        }} else {{
                            listData[idx] = e.target.value;
                        }}
                        sync();
                    }});
                }});

                itemsContainer.querySelectorAll('.del-btn').forEach(btn => {{
                    btn.addEventListener('click', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        listData.splice(idx, 1);
                        render();
                        sync();
                    }});
                }});
            }}

            addBtn.addEventListener('click', () => {{
                if (isObjTitle) {{
                    listData.push({{ title: '' }});
                }} else {{
                    listData.push('');
                }}
                render();
                sync();
            }});

            render();
        }})();
        </script>
        """
        return mark_safe(html)


# ----------------------------------------------------------------------
# 2. Categorized Test Suites / Lab Columns Widget
# ----------------------------------------------------------------------
class LabColumnsJsonWidget(forms.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        escaped_json = escape_json_for_attr(value)
        container_id = f"lab-columns-widget-{name}"

        html = f"""
        <div id="{container_id}" style="max-width: 950px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
            <input type="hidden" name="{name}" id="id_{name}_hidden" value="{escaped_json}" />
            
            <div style="font-weight: 700; font-size: 13px; color: #1e293b; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
                Categorized Test Suites / Columns Builder
            </div>

            <div id="{container_id}-columns" style="display: flex; flex-direction: column; gap: 16px;"></div>
            
            <div style="margin-top: 16px; padding-top: 14px; border-top: 1px dashed #cbd5e1;">
                <button type="button" id="{container_id}-add-col-btn" style="background: #08709d; color: white; border: none; padding: 9px 18px; border-radius: 6px; font-weight: 600; font-size: 13px; cursor: pointer;">
                    + Add New Category Suite Column
                </button>
            </div>
        </div>

        <script>
        (function() {{
            const hiddenInput = document.getElementById('id_{name}_hidden');
            const columnsContainer = document.getElementById('{container_id}-columns');
            const addColBtn = document.getElementById('{container_id}-add-col-btn');
            
            let colsData = [];
            try {{
                colsData = JSON.parse(hiddenInput.value || '[]');
            }} catch(e) {{
                colsData = [];
            }}
            if (!Array.isArray(colsData)) colsData = [];

            function sync() {{
                hiddenInput.value = JSON.stringify(colsData);
            }}

            function render() {{
                columnsContainer.innerHTML = '';
                if (colsData.length === 0) {{
                    columnsContainer.innerHTML = '<div style="color: #94a3b8; font-size: 13px; font-style: italic; padding: 12px; background: white; border-radius: 8px; border: 1px dashed #cbd5e1;">No test categories added yet. Click "+ Add New Category Suite Column" to create one.</div>';
                    return;
                }}

                colsData.forEach((col, colIdx) => {{
                    const card = document.createElement('div');
                    card.style.cssText = "background: white; border: 1.5px solid #cbd5e1; border-radius: 10px; padding: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);";
                    
                    const testsList = Array.isArray(col.tests) ? col.tests : [];

                    let testsHtml = '';
                    testsList.forEach((t, tIdx) => {{
                        testsHtml += `
                            <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
                                <input type="text" class="test-name-input" data-col="${{colIdx}}" data-t="${{tIdx}}" value="${{(t || '').replace(/"/g, '&quot;')}}" placeholder="e.g. Allergy test or Complete blood count" style="flex: 1; padding: 6px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px;" />
                                <button type="button" class="del-test-btn" data-col="${{colIdx}}" data-t="${{tIdx}}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 4px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;">✕ Delete</button>
                            </div>
                        `;
                    }});

                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px;">
                            <span style="font-weight: 800; font-size: 14px; color: #08709d;">Test Column #${{colIdx + 1}}</span>
                            <button type="button" class="del-col-btn" data-col="${{colIdx}}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">🗑️ Remove Column</button>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                            <label style="display: block; font-weight: 700; font-size: 12px; color: #334155; margin-bottom: 8px;">Tests Included in this Column:</label>
                            <div class="tests-container-${{colIdx}}">${{testsHtml}}</div>
                            <button type="button" class="add-test-btn" data-col="${{colIdx}}" style="margin-top: 6px; background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">+ Add Test to Column</button>
                        </div>
                    `;
                    columnsContainer.appendChild(card);
                }});

                // Attach Listeners
                columnsContainer.querySelectorAll('.test-name-input').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const colIdx = parseInt(e.target.getAttribute('data-col'));
                        const tIdx = parseInt(e.target.getAttribute('data-t'));
                        colsData[colIdx].tests[tIdx] = e.target.value;
                        sync();
                    }});
                }});

                columnsContainer.querySelectorAll('.add-test-btn').forEach(btn => {{
                    btn.addEventListener('click', (e) => {{
                        const colIdx = parseInt(e.target.getAttribute('data-col'));
                        if (!Array.isArray(colsData[colIdx].tests)) colsData[colIdx].tests = [];
                        colsData[colIdx].tests.push('');
                        render();
                        sync();
                    }});
                }});

                columnsContainer.querySelectorAll('.del-test-btn').forEach(btn => {{
                    btn.addEventListener('click', (e) => {{
                        const colIdx = parseInt(e.target.getAttribute('data-col'));
                        const tIdx = parseInt(e.target.getAttribute('data-t'));
                        colsData[colIdx].tests.splice(tIdx, 1);
                        render();
                        sync();
                    }});
                }});

                columnsContainer.querySelectorAll('.del-col-btn').forEach(btn => {{
                    btn.addEventListener('click', (e) => {{
                        const colIdx = parseInt(e.target.getAttribute('data-col'));
                        colsData.splice(colIdx, 1);
                        render();
                        sync();
                    }});
                }});
            }}

            addColBtn.addEventListener('click', () => {{
                colsData.push({{
                    iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
                    tests: []
                }});
                render();
                sync();
            }});

            render();
        }})();
        </script>
        """
        return mark_safe(html)


# ----------------------------------------------------------------------
# 3. Why Choose Reasons Widget
# ----------------------------------------------------------------------
class ReasonsJsonWidget(forms.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        escaped_json = escape_json_for_attr(value)
        container_id = f"reasons-widget-{name}"

        html = f"""
        <div id="{container_id}" style="max-width: 950px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
            <input type="hidden" name="{name}" id="id_{name}_hidden" value="{escaped_json}" />
            
            <div style="font-weight: 700; font-size: 13px; color: #1e293b; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
                Why Choose Reasons Cards Builder
            </div>

            <div id="{container_id}-reasons" style="display: flex; flex-direction: column; gap: 14px;"></div>
            
            <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
                <button type="button" id="{container_id}-add-reason-btn" style="background: #08709d; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 12.5px; cursor: pointer;">
                    + Add New Reason Card
                </button>
            </div>
        </div>

        <script>
        (function() {{
            const hiddenInput = document.getElementById('id_{name}_hidden');
            const reasonsContainer = document.getElementById('{container_id}-reasons');
            const addBtn = document.getElementById('{container_id}-add-reason-btn');
            
            let reasonsData = [];
            try {{
                reasonsData = JSON.parse(hiddenInput.value || '[]');
            }} catch(e) {{
                reasonsData = [];
            }}
            if (!Array.isArray(reasonsData)) reasonsData = [];

            function sync() {{
                hiddenInput.value = JSON.stringify(reasonsData);
            }}

            function render() {{
                reasonsContainer.innerHTML = '';
                if (reasonsData.length === 0) {{
                    reasonsContainer.innerHTML = '<div style="color: #94a3b8; font-size: 13px; font-style: italic; padding: 10px; background: white; border-radius: 6px; border: 1px dashed #cbd5e1;">No reason cards added yet. Click "+ Add New Reason Card".</div>';
                    return;
                }}

                reasonsData.forEach((r, idx) => {{
                    const card = document.createElement('div');
                    card.style.cssText = "background: white; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);";
                    
                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">
                            <span style="font-weight: 800; font-size: 13px; color: #08709d;">Reason Card #${{idx + 1}}</span>
                            <button type="button" class="del-reason-btn" data-idx="${{idx}}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; cursor: pointer;">🗑️ Remove</button>
                        </div>
                        <div style="display: grid; grid-template-columns: 80px 1fr 2fr; gap: 10px; margin-bottom: 10px;">
                            <div>
                                <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">Number:</label>
                                <input type="text" class="r-num" data-idx="${{idx}}" value="${{(r.num || `0${{idx+1}}`).replace(/"/g, '&quot;')}}" placeholder="01" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;" />
                            </div>
                            <div>
                                <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">Badge Label:</label>
                                <input type="text" class="r-label" data-idx="${{idx}}" value="${{(r.label || '').replace(/"/g, '&quot;')}}" placeholder="e.g. FAST RESULTS" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;" />
                            </div>
                            <div>
                                <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">Title:</label>
                                <input type="text" class="r-title" data-idx="${{idx}}" value="${{(r.title || '').replace(/"/g, '&quot;')}}" placeholder="e.g. Results in just 2-3 hours" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;" />
                            </div>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">Description:</label>
                            <textarea class="r-desc" data-idx="${{idx}}" rows="2" placeholder="Enter explanation text..." style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px; font-family: inherit; resize: vertical;">${{(r.desc || '').replace(/</g, '&lt;')}}</textarea>
                        </div>
                    `;
                    reasonsContainer.appendChild(card);
                }});

                reasonsContainer.querySelectorAll('.r-num').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        reasonsData[idx].num = e.target.value;
                        sync();
                    }});
                }});

                reasonsContainer.querySelectorAll('.r-label').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        reasonsData[idx].label = e.target.value;
                        sync();
                    }});
                }});

                reasonsContainer.querySelectorAll('.r-title').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        reasonsData[idx].title = e.target.value;
                        sync();
                    }});
                }});

                reasonsContainer.querySelectorAll('.r-desc').forEach(ta => {{
                    ta.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        reasonsData[idx].desc = e.target.value;
                        sync();
                    }});
                }});

                reasonsContainer.querySelectorAll('.del-reason-btn').forEach(btn => {{
                    btn.addEventListener('click', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        reasonsData.splice(idx, 1);
                        render();
                        sync();
                    }});
                }});
            }}

            addBtn.addEventListener('click', () => {{
                reasonsData.push({{
                    num: `0${{reasonsData.length + 1}}`,
                    label: '',
                    title: '',
                    desc: ''
                }});
                render();
                sync();
            }});

            render();
        }})();
        </script>
        """
        return mark_safe(html)


# ----------------------------------------------------------------------
# 4. Process Steps & Benefits Widget
# ----------------------------------------------------------------------
class TitleDescListJsonWidget(forms.Widget):
    def __init__(self, title_label="Title", desc_label="Description", attrs=None):
        super().__init__(attrs)
        self.title_label = title_label
        self.desc_label = desc_label

    def render(self, name, value, attrs=None, renderer=None):
        escaped_json = escape_json_for_attr(value)
        container_id = f"td-widget-{name}"

        html = f"""
        <div id="{container_id}" style="max-width: 950px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
            <input type="hidden" name="{name}" id="id_{name}_hidden" value="{escaped_json}" />
            
            <div style="font-weight: 700; font-size: 13px; color: #1e293b; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em;">
                List Builder ({self.title_label} & {self.desc_label})
            </div>

            <div id="{container_id}-items" style="display: flex; flex-direction: column; gap: 12px;"></div>
            
            <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
                <button type="button" id="{container_id}-add-btn" style="background: #08709d; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 12.5px; cursor: pointer;">
                    + Add New Item
                </button>
            </div>
        </div>

        <script>
        (function() {{
            const hiddenInput = document.getElementById('id_{name}_hidden');
            const container = document.getElementById('{container_id}-items');
            const addBtn = document.getElementById('{container_id}-add-btn');
            
            let listData = [];
            try {{
                listData = JSON.parse(hiddenInput.value || '[]');
            }} catch(e) {{
                listData = [];
            }}
            if (!Array.isArray(listData)) listData = [];

            function sync() {{
                hiddenInput.value = JSON.stringify(listData);
            }}

            function render() {{
                container.innerHTML = '';
                if (listData.length === 0) {{
                    container.innerHTML = '<div style="color: #94a3b8; font-size: 13px; font-style: italic; padding: 10px; background: white; border-radius: 6px; border: 1px dashed #cbd5e1;">No items added yet. Click "+ Add New Item".</div>';
                    return;
                }}

                listData.forEach((item, idx) => {{
                    const card = document.createElement('div');
                    card.style.cssText = "background: white; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);";
                    
                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-weight: 700; font-size: 12px; color: #08709d;">Item #${{idx + 1}}</span>
                            <button type="button" class="del-item-btn" data-idx="${{idx}}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; cursor: pointer;">🗑️ Remove</button>
                        </div>
                        <div style="margin-bottom: 8px;">
                            <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">{self.title_label}:</label>
                            <input type="text" class="item-title" data-idx="${{idx}}" value="${{(item.title || '').replace(/"/g, '&quot;')}}" placeholder="Enter title..." style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px;" />
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">{self.desc_label}:</label>
                            <textarea class="item-desc" data-idx="${{idx}}" rows="2" placeholder="Enter description..." style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px; font-family: inherit; resize: vertical;">${{(item.desc || '').replace(/</g, '&lt;')}}</textarea>
                        </div>
                    `;
                    container.appendChild(card);
                }});

                container.querySelectorAll('.item-title').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        listData[idx].title = e.target.value;
                        sync();
                    }});
                }});

                container.querySelectorAll('.item-desc').forEach(ta => {{
                    ta.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        listData[idx].desc = e.target.value;
                        sync();
                    }});
                }});

                container.querySelectorAll('.del-item-btn').forEach(btn => {{
                    btn.addEventListener('click', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        listData.splice(idx, 1);
                        render();
                        sync();
                    }});
                }});
            }}

            addBtn.addEventListener('click', () => {{
                listData.push({{ num: (listData.length + 1).toString(), title: '', desc: '' }});
                render();
                sync();
            }});

            render();
        }})();
        </script>
        """
        return mark_safe(html)


# ----------------------------------------------------------------------
# Understanding Condition Stages Widget
# ----------------------------------------------------------------------
class UnderstandingStagesJsonWidget(forms.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        escaped_json = escape_json_for_attr(value)
        container_id = f"us-widget-{name}"

        html = f"""
        <div id="{container_id}" style="max-width: 950px; background: #f0f9ff; border: 1.5px solid #08709d; border-radius: 12px; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
            <input type="hidden" name="{name}" id="id_{name}_hidden" value="{escaped_json}" />
            
            <div style="font-weight: 800; font-size: 13px; color: #08709d; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.05em; display: flex; align-items: center; justify-content: space-between;">
                <span>💡 Condition Stages Builder (Numbered Points matching user screenshot)</span>
            </div>

            <div id="{container_id}-items" style="display: flex; flex-direction: column; gap: 12px;"></div>
            
            <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
                <button type="button" id="{container_id}-add-btn" style="background: #08709d; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 700; font-size: 12.5px; cursor: pointer;">
                    + Add New Condition Stage / Numbered Point
                </button>
            </div>
        </div>

        <script>
        (function() {{
            const hiddenInput = document.getElementById('id_{name}_hidden');
            const container = document.getElementById('{container_id}-items');
            const addBtn = document.getElementById('{container_id}-add-btn');
            
            let listData = [];
            try {{
                listData = JSON.parse(hiddenInput.value || '[]');
            }} catch(e) {{
                listData = [];
            }}
            if (!Array.isArray(listData)) listData = [];

            function escapeHtml(str) {{
                if (!str) return '';
                return String(str)
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;');
            }}

            function sync() {{
                hiddenInput.value = JSON.stringify(listData);
            }}

            function render() {{
                container.innerHTML = '';
                if (listData.length === 0) {{
                    container.innerHTML = '<div style="color: #94a3b8; font-size: 13px; font-style: italic; padding: 10px; background: white; border-radius: 6px; border: 1px dashed #cbd5e1;">No condition stages added yet. Click "+ Add New Condition Stage".</div>';
                    return;
                }}

                listData.forEach((item, idx) => {{
                    const card = document.createElement('div');
                    card.style.cssText = "background: white; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);";
                    
                    const numVal = item.num || (idx + 1).toString();
                    const titleVal = typeof item === 'string' ? item : (item.title || '');
                    const descVal = typeof item === 'string' ? '' : (item.desc || item.description || '');

                    card.innerHTML = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-weight: 800; font-size: 12px; color: #08709d;">Stage #${{idx + 1}}</span>
                            <button type="button" class="del-item-btn" data-idx="${{idx}}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; cursor: pointer;">🗑️ Remove</button>
                        </div>
                        <div style="display: flex; gap: 10px; margin-bottom: 8px;">
                            <div style="width: 70px;">
                                <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">Number:</label>
                                <input type="text" class="item-num" data-idx="${{idx}}" value="${{escapeHtml(numVal)}}" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px; font-weight: bold; text-align: center;" />
                            </div>
                            <div style="flex: 1;">
                                <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">Subheading (e.g. 1. Freezing Stage:):</label>
                                <input type="text" class="item-title" data-idx="${{idx}}" value="${{escapeHtml(titleVal)}}" placeholder="e.g. 1. Freezing Stage:" style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px; font-weight: bold;" />
                            </div>
                        </div>
                        <div>
                            <label style="display: block; font-weight: 700; font-size: 11px; color: #475569; margin-bottom: 3px;">Detailed Description:</label>
                            <textarea class="item-desc" data-idx="${{idx}}" rows="3" placeholder="Enter detailed description..." style="width: 100%; box-sizing: border-box; padding: 6px 8px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 12.5px; font-family: inherit; resize: vertical;">${{escapeHtml(descVal)}}</textarea>
                        </div>
                    `;
                    container.appendChild(card);
                }});

                container.querySelectorAll('.item-num').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        if (!listData[idx]) listData[idx] = {{}};
                        listData[idx].num = e.target.value;
                        sync();
                    }});
                }});

                container.querySelectorAll('.item-title').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        if (typeof listData[idx] === 'string') listData[idx] = {{ title: listData[idx] }};
                        listData[idx].title = e.target.value;
                        sync();
                    }});
                }});

                container.querySelectorAll('.item-desc').forEach(ta => {{
                    ta.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        if (typeof listData[idx] === 'string') listData[idx] = {{ title: listData[idx] }};
                        listData[idx].desc = e.target.value;
                        sync();
                    }});
                }});

                container.querySelectorAll('.del-item-btn').forEach(btn => {{
                    btn.addEventListener('click', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        listData.splice(idx, 1);
                        render();
                        sync();
                    }});
                }});
            }}

            addBtn.addEventListener('click', () => {{
                listData.push({{ num: (listData.length + 1).toString(), title: '', desc: '' }});
                render();
                sync();
            }});

            render();
        }})();
        </script>
        """
        return mark_safe(html)


# ----------------------------------------------------------------------
# 5. Floating Badge Widget
# ----------------------------------------------------------------------
class FloatingBadgeJsonWidget(forms.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        if not isinstance(value, dict):
            if isinstance(value, str):
                try:
                    value = json.loads(value)
                except Exception:
                    value = {}
            if not isinstance(value, dict):
                value = {}

        escaped_json = json.dumps(value).replace("&", "&amp;").replace("'", "&#39;").replace('"', "&quot;")
        container_id = f"badge-widget-{name}"

        title_val = (value.get('title', '') or '').replace('"', '&quot;')
        desc_val = (value.get('desc', '') or '').replace('"', '&quot;')

        html = f"""
        <div id="{container_id}" style="max-width: 950px; background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 18px; font-family: system-ui, -apple-system, sans-serif;">
            <input type="hidden" name="{name}" id="id_{name}_hidden" value="{escaped_json}" />
            
            <div style="font-weight: 700; font-size: 13px; color: #1e293b; text-transform: uppercase; margin-bottom: 10px;">
                Floating Hero Badge Builder
            </div>

            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
                <div>
                    <label style="display: block; font-weight: 700; font-size: 11.5px; color: #475569; margin-bottom: 4px;">Badge Headline:</label>
                    <input type="text" id="{container_id}-title" value="{title_val}" placeholder="e.g. Accredited Lab Diagnostics" style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px;" />
                </div>
                <div>
                    <label style="display: block; font-weight: 700; font-size: 11.5px; color: #475569; margin-bottom: 4px;">Badge Description:</label>
                    <input type="text" id="{container_id}-desc" value="{desc_val}" placeholder="e.g. Clean, certified medical blood tests right at your home." style="width: 100%; box-sizing: border-box; padding: 7px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px;" />
                </div>
            </div>
        </div>

        <script>
        (function() {{
            const hiddenInput = document.getElementById('id_{name}_hidden');
            const titleInp = document.getElementById('{container_id}-title');
            const descInp = document.getElementById('{container_id}-desc');

            function sync() {{
                hiddenInput.value = JSON.stringify({{
                    title: titleInp.value,
                    desc: descInp.value
                }});
            }}

            titleInp.addEventListener('input', sync);
            descInp.addEventListener('input', sync);
        }})();
        </script>
        """
        return mark_safe(html)


# ----------------------------------------------------------------------
# 6. FAQ Accordion Widget (Already Working)
# ----------------------------------------------------------------------
class FAQJsonWidget(forms.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        escaped_json = escape_json_for_attr(value)

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
                <button type="button" id="add-faq-btn" style="background: #08709d; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
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
            let openStates = {{}};
            
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
                    container.innerHTML = '<div style="text-align: center; padding: 24px; color: #94a3b8; font-size: 13px; font-style: italic; background: white; border-radius: 8px; border: 1px dashed #cbd5e1;">No FAQs added yet. Click "+ Add New FAQ Dropdown Item".</div>';
                    return;
                }}
                
                faqs.forEach((faq, idx) => {{
                    const isOpen = openStates[idx] !== undefined ? openStates[idx] : (idx === 0);
                    const card = document.createElement('div');
                    card.style.cssText = "background: white; border: 1.5px solid #cbd5e1; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.03);";
                    
                    const qTitle = faq.q ? escapeHtml(faq.q) : '(Untitled Question)';

                    card.innerHTML = `
                        <div class="faq-dropdown-header" data-idx="${{idx}}" style="display: flex; justify-content: space-between; align-items: center; background: ${{isOpen ? '#e0f2fe' : '#f1f5f9'}}; padding: 12px 16px; cursor: pointer; user-select: none;">
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
                
                container.querySelectorAll('.faq-dropdown-header').forEach(header => {{
                    header.addEventListener('click', (e) => {{
                        const idx = parseInt(header.getAttribute('data-idx'));
                        openStates[idx] = !openStates[idx];
                        renderItems();
                    }});
                }});

                container.querySelectorAll('.faq-q-input').forEach(input => {{
                    input.addEventListener('input', (e) => {{
                        const idx = parseInt(e.target.getAttribute('data-idx'));
                        faqs[idx].q = e.target.value;
                        sync();
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
                openStates[faqs.length - 1] = true;
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


# ----------------------------------------------------------------------
# 7. Rich Text Content Editor Widget for Blog Posts
# ----------------------------------------------------------------------
class RichTextEditorWidget(forms.Widget):

    def render(self, name, value, attrs=None, renderer=None):

        if value is None:
            value = ""

        # Safely escape the value before putting it inside textarea
        escaped_value = conditional_escape(str(value))

        container_id = f"rte-widget-{name}"

        html = f"""
        <div id="{container_id}"
             class="custom-rte-wrapper"
             style="
                max-width: 950px;
                background: #ffffff;
                border: 1.5px solid #cbd5e1;
                border-radius: 12px;
                overflow: hidden;
                font-family: system-ui, -apple-system, sans-serif;
                box-shadow: 0 4px 12px rgba(0,0,0,0.05);
             ">

            <!--
                IMPORTANT:
                This textarea is the actual Django form field.
                The contenteditable editor is only the visual editor.
            -->
            <textarea
                name="{name}"
                id="id_{name}"
                style="display:none;"
            >{escaped_value}</textarea>


            <!-- TOOLBAR -->
            <div
                class="rte-toolbar"
                style="
                    background:#f8fafc;
                    border-bottom:1.5px solid #e2e8f0;
                    padding:10px 14px;
                    display:flex;
                    flex-wrap:wrap;
                    gap:6px;
                    align-items:center;
                    user-select:none;
                "
            >

                <!-- Format -->
                <select
                    id="{container_id}-format"
                    style="
                        padding:6px 10px;
                        border:1px solid #cbd5e1;
                        border-radius:6px;
                        font-size:13px;
                        background:white;
                        cursor:pointer;
                        color:#334155;
                        font-weight:600;
                    "
                >
                    <option value="p">Normal Paragraph</option>
                    <option value="h2">Heading 2 (H2)</option>
                    <option value="h3">Heading 3 (H3)</option>
                    <option value="h4">Heading 4 (H4)</option>
                    <option value="pullquote">Pull Quote Box</option>
                </select>


                <div style="
                    width:1px;
                    height:22px;
                    background:#cbd5e1;
                    margin:0 4px;
                "></div>


                <!-- Text formatting -->

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="bold"
                    title="Bold (Ctrl+B)"
                >B</button>

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="italic"
                    title="Italic (Ctrl+I)"
                >I</button>

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="underline"
                    title="Underline (Ctrl+U)"
                >U</button>

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="strikeThrough"
                    title="Strikethrough"
                >S</button>


                <div style="
                    width:1px;
                    height:22px;
                    background:#cbd5e1;
                    margin:0 4px;
                "></div>


                <!-- Lists -->

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="insertUnorderedList"
                >• List</button>

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="insertOrderedList"
                >1. List</button>


                <div style="
                    width:1px;
                    height:22px;
                    background:#cbd5e1;
                    margin:0 4px;
                "></div>


                <!-- Alignment -->

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="justifyLeft"
                >⬅ Left</button>

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="justifyCenter"
                >↔ Center</button>

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="justifyRight"
                >➡ Right</button>


                <div style="
                    width:1px;
                    height:22px;
                    background:#cbd5e1;
                    margin:0 4px;
                "></div>


                <!-- Insert -->

                <button
                    type="button"
                    id="{container_id}-link-btn"
                >🔗 Link</button>

                <button
                    type="button"
                    id="{container_id}-img-btn"
                >🖼️ Image</button>

                <button
                    type="button"
                    id="{container_id}-quote-btn"
                >💬 Quote</button>

                <button
                    type="button"
                    class="rte-btn"
                    data-cmd="insertHorizontalRule"
                >― Divider</button>


                <div style="
                    width:1px;
                    height:22px;
                    background:#cbd5e1;
                    margin:0 4px;
                "></div>


                <!-- Tools -->
                <button type="button" id="{container_id}-md-btn" title="Convert raw Markdown links [Text](URL) & Headings to HTML" style="padding: 6px 10px; background: #f0f9ff; color: #0284c7; border: 1px solid #bae6fd; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer;">⚡ Convert Markdown Links</button>
                <button type="button" class="rte-btn" data-cmd="removeFormat" title="Clear Formatting" style="padding: 6px 9px; background: #fff1f2; color: #9f1239; border: 1px solid #fecdd3; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">🧹 Clear</button>
                <button type="button" id="{container_id}-code-btn" title="Toggle Code Mode" style="padding: 6px 10px; background: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 6px; font-weight: 700; cursor: pointer; font-size: 12.5px;">&lt;/&gt; Code</button>
            </div>

            <!-- Editable Editor Area -->
            <div id="{container_id}-editor" contenteditable="true" style="min-height: 400px; max-height: 750px; overflow-y: auto; padding: 22px 26px; outline: none; background: #ffffff; color: #1e293b; font-size: 16px; line-height: 1.7; font-family: Georgia, 'Times New Roman', serif;"></div>

            <!-- CODE EDITOR -->

            <textarea
                id="{container_id}-codemode"
                style="
                    display:none;
                    width:100%;
                    min-height:400px;
                    max-height:750px;
                    padding:22px 26px;
                    box-sizing:border-box;
                    font-family:Consolas, Monaco, monospace;
                    font-size:14px;
                    background:#0f172a;
                    color:#f8fafc;
                    border:none;
                    outline:none;
                    line-height:1.6;
                    resize:vertical;
                "
            ></textarea>


            <!-- STATUS -->

            <div
                style="
                    background:#f8fafc;
                    border-top:1px solid #e2e8f0;
                    padding:8px 16px;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    font-size:12.5px;
                    color:#64748b;
                "
            >
                <span
                    id="{container_id}-stats"
                    style="font-weight:600;"
                >
                    0 words | 0 characters
                </span>

                <span
                    style="font-weight:700;color:#08709d;"
                >
                    ✨ Rich Visual Content Editor
                </span>
            </div>

        </div>


        <style>
            #{container_id}-editor p {{ margin: 0 0 18px 0; font-size: 16px; color: #334155; line-height: 1.7; }}
            #{container_id}-editor h2 {{ color: #1f5f9e; font-size: 24px; font-weight: 700; margin: 30px 0 14px 0; font-family: Georgia, serif; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }}
            #{container_id}-editor h3 {{ color: #1f5f9e; font-size: 20px; font-weight: 700; margin: 24px 0 12px 0; font-family: Georgia, serif; }}
            #{container_id}-editor h4 {{ color: #08709d; font-size: 17px; font-weight: 700; margin: 18px 0 8px 0; }}
            #{container_id}-editor ul, #{container_id}-editor ol {{ margin: 0 0 20px 0; padding-left: 26px; }}
            #{container_id}-editor li {{ margin-bottom: 8px; font-size: 16px; color: #334155; }}
            #{container_id}-editor .pull-note {{ background: #f4f8fb; border-left: 4px solid #1f6fb2; padding: 16px 20px; font-size: 15px; color: #475569; margin: 24px 0; font-style: italic; border-radius: 0 8px 8px 0; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }}
            #{container_id}-editor img {{ max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; display: block; box-shadow: 0 4px 14px rgba(0,0,0,0.1); }}
            #{container_id}-editor a {{ color: #1f6fb2; text-decoration: underline; font-weight: 600; }}
            #{container_id}-editor hr {{ border: none; border-top: 2px dashed #cbd5e1; margin: 28px 0; }}
        </style>


        <script>
        (function() {{
            // FIX: was 'id_{name}_textarea' (an ID that does not exist anywhere in the DOM).
            // The real Django field rendered above is <textarea name="{name}" id="id_{name}">.
            // The old ID caused getElementById() to return null, which threw a TypeError on the
            // very next line (editor.innerHTML = textarea.value) and killed the entire IIFE before
            // the submit-sync listener, input listener, or any toolbar button listener could attach.
            // That's why typed content never made it back into the real form field and was lost on save.
            const textarea = document.getElementById('id_{name}');
            const editor = document.getElementById('{container_id}-editor');
            const codeInput = document.getElementById('{container_id}-codemode');
            const formatSelect = document.getElementById('{container_id}-format');
            const stats = document.getElementById('{container_id}-stats');

            const codeBtn = document.getElementById('{container_id}-code-btn');
            const mdBtn = document.getElementById('{container_id}-md-btn');
            const linkBtn = document.getElementById('{container_id}-link-btn');
            const imgBtn = document.getElementById('{container_id}-img-btn');
            const quoteBtn = document.getElementById('{container_id}-quote-btn');

            if (!editor || !textarea) return;

            let isCodeView = false;

            // Initial load
            editor.innerHTML = textarea.value || '';
            updateStats();

            function sync() {{
                if (isCodeView) {{
                    textarea.value = codeInput.value;
                    editor.innerHTML = codeInput.value;
                }} else {{
                    textarea.value = editor.innerHTML;
                }}

                updateStats();
            }}


            // =====================================================
            // FORM SUBMIT
            // This guarantees Django receives the latest content.
            // =====================================================

            const form = textarea.closest('form');

            if (form) {{

                form.addEventListener('submit', function() {{

                    if (isCodeView) {{
                        textarea.value = codeInput.value;
                    }} else {{
                        textarea.value = editor.innerHTML;
                    }}

                }});

            }}


            // =====================================================
            // STATS
            // =====================================================

            function updateStats() {{
                const text = editor.innerText || editor.textContent || '';
                const cleanText = text.trim();

                const words = cleanText
                    ? cleanText.split(/\\s+/).length
                    : 0;

                const chars = cleanText.length;

                const readMin = Math.max(
                    1,
                    Math.ceil(words / 200)
                );

                stats.textContent =
                    `${{words}} words | ${{chars}} characters | ~${{readMin}} min read`;

            }}

            // =====================================================
            // TOOLBAR COMMANDS
            // =====================================================

            const toolbarBtns =
                document.querySelectorAll(
                    '#{container_id} .rte-btn'
                );

            toolbarBtns.forEach(function(btn) {{

                btn.addEventListener('click', function() {{

                    const cmd =
                        btn.getAttribute('data-cmd');

                    if (cmd) {{
                        document.execCommand(cmd, false, null);
                        sync();
                    }}
                }});
            }});

            // Format block selector
            formatSelect.addEventListener('change', (e) => {{
                const val = e.target.value;
                if (val === 'pullquote') {{
                    document.execCommand('formatBlock', false, '<div>');
                    const selection = window.getSelection();
                    if (selection.rangeCount) {{
                        let node = selection.getRangeAt(0).commonAncestorContainer;
                        if (node.nodeType === 3) node = node.parentNode;
                        if (node && node !== editor) {{
                            node.className = 'pull-note';
                        }}
                    }}
                }} else {{
                    document.execCommand('formatBlock', false, `<${{val}}>`);
                }}
                formatSelect.value = 'p';
                sync();
            }});

            // Insert Link
            linkBtn.addEventListener('click', () => {{
                const url = prompt('Enter link URL (e.g. https://example.com):');
                if (url) {{
                    document.execCommand('createLink', false, url);
                    sync();
                }}
            }});

            // Insert Image
            imgBtn.addEventListener('click', () => {{
                const url = prompt('Enter Image URL (e.g. https://images.unsplash.com/... or /media/blog_images/...):');
                if (url) {{
                    document.execCommand('insertImage', false, url);
                    sync();
                }}
            }});

            // Insert Quote
            quoteBtn.addEventListener('click', () => {{
                const text = prompt('Enter Pull Quote text:', 'Stem cell research gives the body better tools to heal.');
                if (text) {{
                    const quoteHtml = `<div class="pull-note">"${{text}}"</div><p></p>`;
                    document.execCommand('insertHTML', false, quoteHtml);
                    sync();
                }}
            }});

            // Toggle Code Mode
            codeBtn.addEventListener('click', () => {{
                isCodeView = !isCodeView;
                if (isCodeView) {{
                    codeInput.value = editor.innerHTML;
                    editor.style.display = 'none';
                    codeInput.style.display = 'block';
                    codeBtn.style.background = '#08709d';
                    codeBtn.style.color = '#ffffff';
                    codeBtn.textContent = '👁️ Visual View';
                }} else {{
                    editor.innerHTML = codeInput.value;
                    codeInput.style.display = 'none';
                    editor.style.display = 'block';
                    codeBtn.style.background = '#f1f5f9';
                    codeBtn.style.color = '#0f172a';
                    codeBtn.textContent = '</> Code View';
                    sync();
                }}
            }});

            // Listeners
            editor.addEventListener('input', sync);
            editor.addEventListener('blur', sync);
            codeInput.addEventListener('input', sync);
        }})();
        </script>
        """

        return mark_safe(html)

class ServiceAdminForm(forms.ModelForm):
    title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 16px; font-weight: 600; padding: 10px 14px; border-radius: 6px;'}),
        help_text="Name of the service (e.g. Lab Services | Blood Test at Home)"
    )
    slug = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 450px; font-size: 14px; padding: 8px 12px; border-radius: 6px;'}),
        help_text="URL Identifier slug (e.g. lab-services, physiotherapy, iv-therapy)"
    )
    icon = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 450px; font-size: 14px; padding: 8px 12px; border-radius: 6px;'}),
        required=False,
        initial='Activity',
        help_text="Lucide Icon name (e.g. Activity, HeartPulse, Droplets, Stethoscope, Users)"
    )
    theme_color = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 450px; font-size: 14px; padding: 8px 12px; border-radius: 6px;'}),
        required=False,
        initial='#08709d',
        help_text="Hex color code (e.g. #08709d, #63b158, #38bdf8, #f43f5e, #fbbf24)"
    )
    eyebrow = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="Top badge text e.g. DHA-Licensed Home Sample Collection Across Dubai"
    )
    
    # Custom Section Titles & Content
    about_section_title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="Custom title for 'About the Service' section. Leaves empty to use default 'About {Title}'"
    )
    about_description = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 5, 'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 10px 14px; border-radius: 6px; font-family: inherit;'}),
        required=False,
        help_text="Custom description for 'ABOUT THE SERVICE' section. Separate paragraphs with double newlines."
    )
    indications_section_title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="Custom title for 'Who May Need' section. Leaves empty to use default 'Who May Need {Title} in Dubai?'"
    )
    comprehensive_section_title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="Custom title for 'Comprehensive Services' section. Leaves empty to use default 'Comprehensive {Title} Services'"
    )
    faq_section_title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="Custom title for 'FAQs' section. Leaves empty to use default '{Title} FAQs'"
    )
    tagline = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 2, 'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 10px 14px; border-radius: 6px; font-family: inherit;'}),
        required=False,
        help_text="Catchy tagline text e.g. Get an Accurate Lab Result at Your Doorsteps"
    )
    description = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 4, 'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 10px 14px; border-radius: 6px; font-family: inherit;'}),
        required=False,
        help_text="Detailed description of the service"
    )

    floating_badge = forms.JSONField(
        widget=FloatingBadgeJsonWidget(),
        required=False,
        help_text="Configure hero floating badge headline and description"
    )

    features = forms.JSONField(
        widget=SimpleListJsonWidget(item_label="Key Highlight", placeholder="e.g. 24/7 blood test home service", is_object_title=True),
        required=False,
        help_text="Add highlight points displayed in the hero section"
    )

    indications = forms.JSONField(
        widget=SimpleListJsonWidget(item_label="Clinical Indication", placeholder="e.g. Routine annual health & body checkups"),
        required=False,
        help_text="Add clinical indications / Who May Need checklist items"
    )

    lab_columns = forms.JSONField(
        widget=LabColumnsJsonWidget(),
        required=False,
        help_text="Build categorized test suites (e.g. Core Screenings, Organ & Metabolic, Advanced Diagnostics)"
    )

    reasons = forms.JSONField(
        widget=ReasonsJsonWidget(),
        required=False,
        help_text="Build 'Why Choose CORx' feature cards"
    )

    steps = forms.JSONField(
        widget=TitleDescListJsonWidget(title_label="Step Title", desc_label="Step Description"),
        required=False,
        help_text="Build 3-Step Process ('How It Works')"
    )

    benefits = forms.JSONField(
        widget=TitleDescListJsonWidget(title_label="Benefit Title", desc_label="Benefit Description"),
        required=False,
        help_text="Build general service benefits list"
    )

    faqs = forms.JSONField(
        widget=FAQJsonWidget(),
        required=False,
        help_text="User-Friendly FAQ Builder: Add, edit, or remove Question & Answer cards without writing JSON."
    )

    understanding_title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="Main heading e.g. What is Frozen Shoulder / Understanding Frozen Shoulder"
    )

    understanding_intro = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 10px 14px; border-radius: 6px; font-family: inherit;'}),
        required=False,
        help_text="Introductory paragraph explaining the condition or service overview"
    )

    understanding_items = forms.JSONField(
        widget=UnderstandingStagesJsonWidget(),
        required=False,
        help_text="Interactive Builder for Numbered Condition Stages (e.g. 1. Freezing Stage, 2. Frozen Stage, 3. Thawing Stage)"
    )

    def clean_floating_badge(self):
        val = self.cleaned_data.get('floating_badge')
        if not val or val == '':
            return {}
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return {}
        return val

    def clean_features(self):
        val = self.cleaned_data.get('features')
        if not val or val == '':
            return []
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return []
        return val

    def clean_indications(self):
        val = self.cleaned_data.get('indications')
        if not val or val == '':
            return []
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return []
        return val

    def clean_lab_columns(self):
        val = self.cleaned_data.get('lab_columns')
        if not val or val == '':
            return []
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return []
        return val

    def clean_reasons(self):
        val = self.cleaned_data.get('reasons')
        if not val or val == '':
            return []
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return []
        return val

    def clean_steps(self):
        val = self.cleaned_data.get('steps')
        if not val or val == '':
            return []
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return []
        return val

    def clean_benefits(self):
        val = self.cleaned_data.get('benefits')
        if not val or val == '':
            return []
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return []
        return val

    def clean_faqs(self):
        val = self.cleaned_data.get('faqs')
        if not val or val == '':
            return []
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return []
        return val

    def clean_understanding_items(self):
        val = self.cleaned_data.get('understanding_items')
        if not val or val == '':
            return []
        if isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return []
        return val

    class Meta:
        model = Service
        fields = '__all__'


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            badge = self.instance.floating_badge
            if isinstance(badge, str):
                try:
                    badge = json.loads(badge)
                except Exception:
                    badge = {}
            if isinstance(badge, dict):
                self.fields['about_section_title'].initial = badge.get('about_section_title', '')
                self.fields['about_description'].initial = badge.get('about_description', '')
                self.fields['indications_section_title'].initial = badge.get('indications_section_title', '')
                self.fields['comprehensive_section_title'].initial = badge.get('comprehensive_section_title', '')
                self.fields['faq_section_title'].initial = badge.get('faq_section_title', '')

    def save(self, commit=True):
        instance = super().save(commit=False)
        badge = instance.floating_badge
        if isinstance(badge, str):
            try:
                badge = json.loads(badge)
            except Exception:
                badge = {}
        if not isinstance(badge, dict):
            badge = {}
        
        badge['about_section_title'] = self.cleaned_data.get('about_section_title', '') or ''
        badge['about_description'] = self.cleaned_data.get('about_description', '') or ''
        badge['indications_section_title'] = self.cleaned_data.get('indications_section_title', '') or ''
        badge['comprehensive_section_title'] = self.cleaned_data.get('comprehensive_section_title', '') or ''
        badge['faq_section_title'] = self.cleaned_data.get('faq_section_title', '') or ''
        
        instance.floating_badge = badge
        if commit:
            instance.save()
        return instance


class BlogPostAdminForm(forms.ModelForm):
    title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 16px; font-weight: 600; padding: 10px 14px; border-radius: 6px;'}),
    )
    slug = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 450px; font-size: 14px; padding: 8px 12px; border-radius: 6px;'}),
        required=False,
        help_text="URL slug for this blog post (auto-generated if left blank)"
    )
    category = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 700px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
    )
    date = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 400px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
    )
    author = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 700px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        initial='Corx',
    )
    read_time = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 400px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="e.g. 5 min read"
    )
    excerpt = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'style': 'width: 100%; max-width: 950px; font-size: 14.5px; padding: 10px 14px; border-radius: 6px; font-family: inherit;'}),
        required=False,
        help_text="Brief summary snippet displayed on article cards"
    )
    content = forms.CharField(
        widget=RichTextEditorWidget(),
        required=False,
        help_text="Full article body content: Use formatting toolbar for Headings, Bold, Lists, Pull Quotes, Links & Images."
    )

    class Meta:
        model = BlogPost
        fields = '__all__'


class SubServiceInline(admin.TabularInline):
    model = Service
    fk_name = 'parent'
    extra = 1
    verbose_name = "Nested Sub-Service"
    verbose_name_plural = "➕ Nested Sub-Services (Add & Edit Sub-Services under this Parent Service)"
    fields = ('title', 'tagline')
    show_change_link = True


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    inlines = [SubServiceInline]
    list_display = ('title', 'service_hierarchy', 'sub_services_count', 'view_public_button', 'edit_button', 'delete_button')
    search_fields = ('title', 'slug', 'tagline', 'description')
    list_filter = ('parent', 'created_at', 'updated_at')
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ('created_at', 'updated_at')
    actions = ['duplicate_as_lab_template']

    def service_hierarchy(self, obj):
        if obj.parent:
            return mark_safe(f'<span style="background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 14px; font-weight: 700; font-size: 11.5px; border: 1px solid #bae6fd;">🔷 Sub-Service of <strong>{obj.parent.title}</strong></span>')
        return mark_safe('<span style="background: #dcfce7; color: #15803d; padding: 4px 12px; border-radius: 14px; font-weight: 700; font-size: 11.5px; border: 1px solid #bbf7d0;">🟢 Top-Level Service</span>')
    service_hierarchy.short_description = "Service Level & Parent"

    def sub_services_count(self, obj):
        count = obj.sub_services.count()
        if count > 0:
            return mark_safe(f'<span style="font-weight: 800; color: #08709d; background: #f0f9ff; padding: 3px 10px; border-radius: 10px; border: 1px solid #e0f2fe;">{count} Sub-Services</span>')
        return mark_safe('<span style="color: #94a3b8; font-style: italic;">—</span>')
    sub_services_count.short_description = "Sub-Services"

    def edit_button(self, obj):
        return mark_safe(f'<a href="/admin/api/service/{obj.pk}/change/" style="background: #0284c7; color: white; padding: 5px 12px; border-radius: 8px; font-weight: 700; font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">✏️ Edit</a>')
    edit_button.short_description = "Edit"

    def delete_button(self, obj):
        return mark_safe(f'<a href="/admin/api/service/{obj.pk}/delete/" style="background: #ef4444; color: white; padding: 5px 12px; border-radius: 8px; font-weight: 700; font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">🗑️ Delete</a>')
    delete_button.short_description = "Delete"

    def view_public_button(self, obj):
        return mark_safe(f'<a href="/services/{obj.slug}" target="_blank" style="background: #10b981; color: white; padding: 5px 12px; border-radius: 8px; font-weight: 700; font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">🌐 View</a>')
    view_public_button.short_description = "View Live"

    @admin.action(description="📋 Duplicate selected service(s) using Lab-Services template structure")
    def duplicate_as_lab_template(self, request, queryset):
        count = 0
        for service in queryset:
            new_slug = f"{service.slug}-copy"
            idx = 1
            while Service.objects.filter(slug=new_slug).exists():
                idx += 1
                new_slug = f"{service.slug}-copy-{idx}"
            
            Service.objects.create(
                slug=new_slug,
                title=f"{service.title} (Copy)",
                parent=service.parent,
                eyebrow=service.eyebrow,
                tagline=service.tagline,
                description=service.description,
                icon=service.icon,
                theme_color=service.theme_color,
                floating_badge=service.floating_badge,
                benefits=service.benefits,
                faqs=service.faqs,
                locations=service.locations,
                features=service.features,
                indications=service.indications,
                lab_columns=service.lab_columns,
                reasons=service.reasons,
                steps=service.steps
            )
            count += 1
        self.message_user(request, f"Successfully created {count} service duplicate(s) with lab-services template layout.")
    
    fieldsets = (
        ('📌 General Information', {
            'fields': ('title', 'slug', 'parent', 'theme_color', 'icon', 'image_file')
        }),
        ('🔍 SEO & OpenGraph Meta Tags', {
            'fields': ('meta_title', 'meta_description'),
            'description': 'Custom SEO Title and Meta Description for search engines and social media sharing previews.',
        }),
        ('✨ Hero Section Content', {
            'fields': ('eyebrow', 'tagline', 'description', 'floating_badge', 'features')
        }),
        ('✏️ Section Custom Content & Titles', {
            'fields': ('about_section_title', 'about_description', 'indications_section_title', 'comprehensive_section_title', 'faq_section_title'),
            'description': 'Specify or override custom description text and titles for sections on the service page.',
            'classes': ('collapse',),
        }),
        ('📋 Diagnostic Test Suites & Indications', {
            'fields': ('indications_title', 'indications_description', 'indications', 'lab_columns_title', 'lab_columns_description', 'lab_columns')
        }),
        ('⭐ Process & Benefits Section', {
            'fields': ('why_choose_title', 'why_choose_desc', 'reasons', 'steps', 'benefits_title', 'benefits', 'benefits_image_file')
        }),
        ('💡 Understanding & Condition Stages Section', {
            'fields': ('understanding_title', 'understanding_intro', 'understanding_items', 'understanding_image_file')
        }),
        ('❓ FAQs', {
            'fields': ('faqs',)
        }),
        ('🕒 Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ('title', 'category', 'author', 'date')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'content', 'category', 'author', 'slug')
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('📰 Article Header & Info', {
            'fields': ('title', 'slug', 'category', 'author', 'date', 'read_time')
        }),
        ('🖼️ Featured Media & Excerpt', {
            'fields': ('image_file', 'image', 'excerpt')
        }),
        ('✍️ Main Article Content (Rich Visual Editor)', {
            'fields': ('content',)
        }),
    )



@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'post', 'photo')
    search_fields = ('name', 'post')


class TaskInline(admin.TabularInline):
    model = Task
    fk_name = 'assigned_to'
    extra = 0
    fields = ('title', 'priority', 'status', 'due_date')
    classes = ('collapse',)


class LeaveApplicationInline(admin.TabularInline):
    model = LeaveApplication
    fk_name = 'staff'
    extra = 0
    fields = ('leave_type', 'leave_start', 'leave_end', 'status', 'submitted_at')
    readonly_fields = ('submitted_at',)
    classes = ('collapse',)


class StaffProfileForm(forms.ModelForm):
    confirm_password = forms.CharField(
        label="Re-type Password (Portal)",
        required=False,
        widget=forms.TextInput(attrs={
            'placeholder': 'Re-type password to confirm',
            'style': 'font-family: Consolas, monospace;'
        }),
        help_text="Re-enter the portal login password to confirm."
    )

    class Meta:
        model = StaffProfile
        fields = ['full_name', 'department', 'position', 'staff_id', 'password', 'confirm_password', 'photo']
        widgets = {
            'full_name': forms.TextInput(attrs={
                'placeholder': 'e.g. Dr. Sarah Jenkins, RN',
                'style': 'font-weight: 600;'
            }),
            'department': forms.TextInput(attrs={
                'placeholder': 'Enter Department (e.g. Home Nursing, Doctor on Call, HR, Lab, etc.)',
                'style': 'font-weight: 600;'
            }),
            'position': forms.TextInput(attrs={
                'placeholder': 'e.g. Senior DHA Registered Nurse / Consultant Physician',
            }),
            'staff_id': forms.TextInput(attrs={
                'placeholder': 'e.g. STF-101 or ADMIN-001',
                'style': 'font-weight: 700; font-family: Consolas, monospace; letter-spacing: 0.05em;'
            }),
            'password': forms.TextInput(attrs={
                'placeholder': 'Enter Portal Login Password (e.g. Staff@2024)',
                'style': 'font-family: Consolas, monospace;'
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['confirm_password'].initial = self.instance.password

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', "Passwords do not match! Please re-type the exact same password.")

        return cleaned_data

    def save(self, commit=True):
        instance = super().save(commit=False)
        if not instance.role:
            instance.role = 'staff'
        if commit:
            instance.save()
        return instance


@admin.register(StaffProfile)
class StaffProfileAdmin(admin.ModelAdmin):
    form = StaffProfileForm
    list_display = ('passport_photo_thumbnail', 'full_name', 'staff_id_badge', 'department_badge', 'position', 'actions_buttons')
    list_display_links = ('passport_photo_thumbnail', 'full_name')
    search_fields = ('staff_id', 'full_name', 'position', 'department')
    list_filter = ('department',)
    list_per_page = 25
    readonly_fields = ('photo_preview',)

    fieldsets = (
        ('👤 Staff Member Details', {
            'fields': (
                'full_name',
                'department',
                'position',
            ),
            'description': 'Official medical registration name, healthcare specialty title, and clinical department.'
        }),
        ('🔒 Portal Login Credentials', {
            'fields': (
                'staff_id',
                'password',
                'confirm_password',
            ),
            'description': mark_safe('<span style="color: #08709d; font-weight: 600;">ℹ️ These credentials allow the staff member to log into the frontend Staff Portal at <code>/portal</code>.</span>')
        }),
        ('📷 Passport Size Photo', {
            'fields': ('photo', 'photo_preview'),
            'description': 'Upload clear official passport-size profile photograph for staff ID card and portal directory.'
        }),
    )

    def photo_preview(self, obj):
        if obj.photo:
            return mark_safe(f"""
                <div style="display: inline-block; padding: 6px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
                    <img src="{obj.photo.url}" alt="Passport Photo" style="width: 120px; height: 140px; object-fit: cover; border-radius: 8px;" />
                </div>
            """)
        return mark_safe('<div style="color: #94a3b8; font-size: 13px; font-style: italic;">No passport photo uploaded yet. Choose an image file above.</div>')
    photo_preview.short_description = "Passport Photo Preview"

    def passport_photo_thumbnail(self, obj):
        if obj.photo:
            return mark_safe(f"""
                <div style="display: inline-flex; align-items: center;">
                    <img src="{obj.photo.url}" alt="{obj.full_name}" style="width: 36px; height: 42px; object-fit: cover; border-radius: 6px; border: 1.5px solid #cbd5e1; box-shadow: 0 2px 6px rgba(0,0,0,0.08);" />
                </div>
            """)
        initials = "".join([w[0].upper() for w in obj.full_name.split() if w])[:2] if obj.full_name else "??"
        color = "#08709d" if obj.role == 'admin' else "#10b981"
        return mark_safe(f"""
            <div style="width: 36px; height: 42px; border-radius: 6px; background: {color}20; color: {color}; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px; border: 1.5px dashed {color}50;">
                {initials}
            </div>
        """)
    passport_photo_thumbnail.short_description = "Photo"

    def staff_id_badge(self, obj):
        return mark_safe(f"""
            <span style="font-family: Consolas, monospace; font-weight: 700; color: #08709d; background: #e0f2fe; padding: 4px 8px; border-radius: 6px; font-size: 12.5px; border: 1px solid #bae6fd;">
                {obj.staff_id}
            </span>
        """)
    staff_id_badge.short_description = "Username / Login ID"

    def department_badge(self, obj):
        return mark_safe(f'<span style="background: #f1f5f9; color: #334155; border: 1px solid #e2e8f0; font-size: 11.5px; font-weight: 600; padding: 3px 9px; border-radius: 6px;">{obj.department}</span>')
    department_badge.short_description = "Department"

    def actions_buttons(self, obj):
        edit_url = f"/admin/api/staffprofile/{obj.id}/change/"
        delete_url = f"/admin/api/staffprofile/{obj.id}/delete/"
        return mark_safe(f"""
            <div style="display: flex; gap: 8px; align-items: center;">
                <a href="{edit_url}" style="background: #08709d; color: #ffffff; padding: 5px 12px; border-radius: 6px; font-weight: 700; font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 6px rgba(8, 112, 157, 0.2);">
                    <i class="fas fa-edit"></i> Edit
                </a>
                <a href="{delete_url}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 5px 12px; border-radius: 6px; font-weight: 700; font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
                    <i class="fas fa-trash-alt"></i> Delete
                </a>
            </div>
        """)
    actions_buttons.short_description = "Actions"




@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'assigned_to_name', 'priority', 'status', 'due_date')
    list_filter = ('priority', 'status')
    search_fields = ('title', 'assigned_to_name')


from django.urls import path
from django.http import HttpResponseRedirect
from django.contrib import messages

@admin.register(LeaveApplication)
class LeaveApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'staff_card',
        'submitted_at_fmt',
        'quick_actions'
    )
    list_display_links = ('staff_card',)
    list_filter = ('status', 'leave_type', 'submitted_at', 'staff_dep')
    search_fields = ('staff_name', 'staff__staff_id', 'staff_dep', 'reason', 'leave_type')
    list_per_page = 20
    actions = ['approve_selected', 'reject_selected', 'reset_to_pending']

    readonly_fields = ('leave_details_hero', 'submitted_at')
    fieldsets = (
        ('📋 Clinical Leave Application Overview', {
            'fields': ('leave_details_hero',),
            'description': mark_safe('<span style="color: #08709d; font-weight: 700;">Complete overview of staff leave request, duration, and cover arrangements.</span>')
        }),
        ('⚙️ Administrative Decision & Record Details', {
            'fields': (
                'status',
                'leave_type',
                ('leave_start', 'leave_end'),
                'reason',
                ('staff', 'staff_name'),
                ('staff_dep', 'staff_position'),
                'submitted_at',
            ),
        }),
    )

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<int:leave_id>/approve/', self.admin_site.admin_view(self.quick_approve_view), name='api_leave_approve'),
            path('<int:leave_id>/reject/', self.admin_site.admin_view(self.quick_reject_view), name='api_leave_reject'),
        ]
        return custom_urls + urls

    def quick_approve_view(self, request, leave_id):
        try:
            leave = LeaveApplication.objects.get(id=leave_id)
            leave.status = 'Approved'
            leave.save()
            self.message_user(request, f"✅ Leave application for {leave.staff_name} has been APPROVED successfully.", level=messages.SUCCESS)
        except LeaveApplication.DoesNotExist:
            self.message_user(request, "Leave application not found.", level=messages.ERROR)
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/admin/api/leaveapplication/'))

    def quick_reject_view(self, request, leave_id):
        try:
            leave = LeaveApplication.objects.get(id=leave_id)
            leave.status = 'Rejected'
            leave.save()
            self.message_user(request, f"❌ Leave application for {leave.staff_name} has been REJECTED.", level=messages.WARNING)
        except LeaveApplication.DoesNotExist:
            self.message_user(request, "Leave application not found.", level=messages.ERROR)
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/admin/api/leaveapplication/'))

    # ── Custom List Display Methods ──────────────────────────────────────────
    def staff_card(self, obj):
        profile = getattr(obj, 'staff', None)
        photo_url = profile.photo.url if (profile and profile.photo) else None
        initials = "".join([w[0].upper() for w in obj.staff_name.split() if w])[:2] if obj.staff_name else "??"
        
        avatar_html = (
            f'<img src="{photo_url}" style="width: 38px; height: 38px; border-radius: 10px; object-fit: cover; border: 1.5px solid #08709d;" />'
            if photo_url else
            f'<div style="width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #1a294a, #08709d); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px;">{initials}</div>'
        )
        
        dept = obj.staff_dep or (profile.department if profile else '') or 'Clinical'
        pos = obj.staff_position or (profile.position if profile else '') or 'Staff'
        staff_id = profile.staff_id if profile else (obj.staff_id if hasattr(obj, 'staff_id') else '')

        return mark_safe(f"""
            <div style="display: flex; align-items: center; gap: 12px; font-family: system-ui, -apple-system, sans-serif;">
                {avatar_html}
                <div>
                    <div style="font-weight: 800; font-size: 13.5px; color: #0f172a;">{obj.staff_name}</div>
                    <div style="font-size: 11px; color: #64748b; font-weight: 600; display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                        <span style="background: #f1f5f9; color: #08709d; padding: 1px 6px; border-radius: 4px; font-family: monospace; font-weight: 700;">{staff_id}</span>
                        <span>• {pos} ({dept})</span>
                    </div>
                </div>
            </div>
        """)
    staff_card.short_description = "Staff Member"

    def leave_type_badge(self, obj):
        colors = {
            'Annual Leave': ('#0284c7', '#e0f2fe', '#bae6fd', '🌴'),
            'Sick Leave': ('#dc2626', '#fee2e2', '#fca5a5', '🩺'),
            'Casual Leave': ('#d97706', '#fef3c7', '#fde68a', '☕'),
            'Emergency Leave': ('#b91c1c', '#fef2f2', '#fecaca', '🚨'),
            'Unpaid Leave': ('#64748b', '#f1f5f9', '#cbd5e1', '📋'),
        }
        fg, bg, border, icon = colors.get(obj.leave_type, ('#08709d', '#f0f9ff', '#bae6fd', '📅'))
        return mark_safe(f"""
            <span style="background: {bg}; color: {fg}; border: 1px solid {border}; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
                <span>{icon}</span> {obj.leave_type}
            </span>
        """)
    leave_type_badge.short_description = "Leave Type"

    def duration_and_dates(self, obj):
        if obj.leave_start and obj.leave_end:
            days = (obj.leave_end - obj.leave_start).days + 1
            days_text = f"{days} Day{'s' if days != 1 else ''}"
            start_fmt = obj.leave_start.strftime('%d %b %Y')
            end_fmt = obj.leave_end.strftime('%d %b %Y')
            return mark_safe(f"""
                <div style="font-family: system-ui, -apple-system, sans-serif;">
                    <div style="font-weight: 800; font-size: 13px; color: #08709d; display: flex; align-items: center; gap: 5px;">
                        <span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 6px; border: 1px solid #bae6fd; font-size: 11.5px;">⏳ {days_text}</span>
                    </div>
                    <div style="font-size: 11.5px; color: #475569; margin-top: 3px; font-weight: 600;">
                        📅 {start_fmt} <span style="color: #94a3b8;">→</span> {end_fmt}
                    </div>
                </div>
            """)
        return "—"
    duration_and_dates.short_description = "Duration & Date Range"

    def reason_excerpt(self, obj):
        if not obj.reason:
            return mark_safe('<span style="color: #94a3b8; font-style: italic; font-size: 12px;">No reason specified</span>')
        trimmed = obj.reason[:60] + ('...' if len(obj.reason) > 60 else '')
        return mark_safe(f'<span style="font-size: 12px; color: #334155; font-weight: 500;" title="{obj.reason}">{trimmed}</span>')
    reason_excerpt.short_description = "Reason / Plan"

    def status_pill(self, obj):
        cfg = {
            'Approved': ('#16a34a', '#dcfce7', '#bbf7d0', '✓ Approved'),
            'Pending': ('#d97706', '#fef3c7', '#fde68a', '⏳ Pending Approval'),
            'Rejected': ('#dc2626', '#fee2e2', '#fecaca', '✕ Rejected'),
        }
        fg, bg, border, label = cfg.get(obj.status, ('#64748b', '#f1f5f9', '#cbd5e1', obj.status))
        return mark_safe(f"""
            <span style="background: {bg}; color: {fg}; border: 1px solid {border}; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 4px;">
                {label}
            </span>
        """)
    status_pill.short_description = "Status"

    def submitted_at_fmt(self, obj):
        if obj.submitted_at:
            return mark_safe(f"""
                <span style="font-size: 11.5px; color: #64748b; font-weight: 600;">
                    {obj.submitted_at.strftime('%d %b %Y')}<br/>
                    <small style="color: #94a3b8;">{obj.submitted_at.strftime('%I:%M %p')}</small>
                </span>
            """)
        return "—"
    submitted_at_fmt.short_description = "Submitted"

    def quick_actions(self, obj):
        approve_url = f"/admin/api/leaveapplication/{obj.id}/approve/"
        reject_url = f"/admin/api/leaveapplication/{obj.id}/reject/"
        edit_url = f"/admin/api/leaveapplication/{obj.id}/change/"

        return mark_safe(f"""
            <div style="display: flex; gap: 8px; align-items: center;">
                <a href="{edit_url}" style="background: #08709d; color: white; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 6px rgba(8,112,157,0.25);" title="View Full Leave Details">
                    <i class="fas fa-eye"></i> View Details
                </a>
                <a href="{approve_url}" style="background: #dcfce7; color: #16a34a; border: 1px solid #bbf7d0; padding: 6px 10px; border-radius: 8px; font-weight: 700; font-size: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;" title="Quick Approve">
                    <i class="fas fa-check"></i>
                </a>
                <a href="{reject_url}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 6px 10px; border-radius: 8px; font-weight: 700; font-size: 12px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;" title="Quick Reject">
                    <i class="fas fa-times"></i>
                </a>
            </div>
        """)
    quick_actions.short_description = "Actions"

    # ── Custom Readonly Hero View on Change Page ────────────────────────────
    def leave_details_hero(self, obj):
        if not obj or not obj.pk:
            return mark_safe('<div style="color: #64748b; font-style: italic;">Save the record first to view clinical details card.</div>')

        profile = getattr(obj, 'staff', None)
        photo_url = profile.photo.url if (profile and profile.photo) else None
        initials = "".join([w[0].upper() for w in obj.staff_name.split() if w])[:2] if obj.staff_name else "??"
        
        avatar_html = (
            f'<img src="{photo_url}" style="width: 56px; height: 56px; border-radius: 16px; object-fit: cover; border: 2.5px solid #08709d; box-shadow: 0 4px 12px rgba(8,112,157,0.2);" />'
            if photo_url else
            f'<div style="width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, #1a294a, #08709d); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; box-shadow: 0 4px 12px rgba(8,112,157,0.2);">{initials}</div>'
        )

        days = (obj.leave_end - obj.leave_start).days + 1 if (obj.leave_start and obj.leave_end) else 0
        start_str = obj.leave_start.strftime('%A, %d %B %Y') if obj.leave_start else '—'
        end_str = obj.leave_end.strftime('%A, %d %B %Y') if obj.leave_end else '—'

        cfg = {
            'Approved': ('#16a34a', '#dcfce7', '#bbf7d0', '✓ APPROVED BY ADMINISTRATION'),
            'Pending': ('#d97706', '#fef3c7', '#fde68a', '⏳ PENDING REVIEW & DECISION'),
            'Rejected': ('#dc2626', '#fee2e2', '#fecaca', '✕ REJECTED'),
        }
        fg, bg, border, status_text = cfg.get(obj.status, ('#64748b', '#f1f5f9', '#cbd5e1', obj.status))
        
        approve_url = f"/admin/api/leaveapplication/{obj.id}/approve/"
        reject_url = f"/admin/api/leaveapplication/{obj.id}/reject/"

        return mark_safe(f"""
        <div style="max-width: 950px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 18px; padding: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); font-family: system-ui, -apple-system, sans-serif;">
            
            <!-- Top Applicant Profile Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-bottom: 1.5px solid #f1f5f9; padding-bottom: 18px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                    {avatar_html}
                    <div>
                        <div style="font-weight: 800; font-size: 18px; color: #0f172a;">{obj.staff_name}</div>
                        <div style="font-size: 12.5px; color: #64748b; font-weight: 600; margin-top: 3px; display: flex; align-items: center; gap: 8px;">
                            <span style="background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 6px; font-weight: 800; font-family: monospace;">{obj.staff_id or 'STF'}</span>
                            <span>• {obj.staff_position or 'Healthcare Staff'}</span>
                            <span>• Department: <strong style="color: #08709d;">{obj.staff_dep or 'Clinical'}</strong></span>
                        </div>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
                    <span style="background: {bg}; color: {fg}; border: 1.5px solid {border}; font-weight: 800; font-size: 12px; padding: 6px 14px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.05em;">
                        {status_text}
                    </span>
                    <span style="font-size: 11px; color: #94a3b8; font-weight: 500;">
                        Submitted on {obj.submitted_at.strftime('%d %b %Y, %I:%M %p') if obj.submitted_at else 'Recently'}
                    </span>
                </div>
            </div>

            <!-- Leave Dates & Duration Grid -->
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: center; margin: 20px 0; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 18px;">
                <div style="text-align: center; background: white; padding: 14px; border-radius: 10px; border: 1px solid #cbd5e1;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">📅 Start Date</div>
                    <div style="font-size: 15px; font-weight: 800; color: #0f172a;">{start_str}</div>
                </div>

                <div style="text-align: center; padding: 0 10px;">
                    <div style="background: #08709d; color: white; font-size: 14px; font-weight: 800; padding: 8px 16px; border-radius: 999px; box-shadow: 0 4px 12px rgba(8,112,157,0.3); display: inline-block;">
                        ⏳ {days} Day{'s' if days != 1 else ''} Leave
                    </div>
                </div>

                <div style="text-align: center; background: white; padding: 14px; border-radius: 10px; border: 1px solid #cbd5e1;">
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">📅 End Date</div>
                    <div style="font-size: 15px; font-weight: 800; color: #0f172a;">{end_str}</div>
                </div>
            </div>

            <!-- Reason Box -->
            <div style="margin-bottom: 20px;">
                <div style="font-weight: 700; font-size: 12.5px; color: #475569; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.04em;">
                    📝 Stated Reason & Clinical Cover Arrangements:
                </div>
                <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 16px; color: #166534; font-size: 13.5px; line-height: 1.6; font-weight: 500; white-space: pre-wrap;">
                    {obj.reason or 'No additional cover notes provided by the applicant.'}
                </div>
            </div>

            <!-- Quick Approval Toolbar -->
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; pt-3; border-top: 1.5px solid #f1f5f9; padding-top: 16px; flex-wrap: wrap;">
                <div style="font-size: 12.5px; color: #64748b; font-weight: 600;">
                    Quick Decision:
                </div>
                <div style="display: flex; gap: 10px;">
                    <a href="{approve_url}" style="background: #16a34a; color: white; font-weight: 800; font-size: 12.5px; padding: 9px 20px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 10px rgba(22,163,74,0.25);">
                        <i class="fas fa-check-circle"></i> Approve Leave
                    </a>
                    <a href="{reject_url}" style="background: #dc2626; color: white; font-weight: 800; font-size: 12.5px; padding: 9px 20px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 10px rgba(220,38,38,0.25);">
                        <i class="fas fa-times-circle"></i> Reject Leave
                    </a>
                </div>
            </div>

        </div>
        """)
    leave_details_hero.short_description = "Leave Application Summary"

    # ── Bulk Admin Actions ───────────────────────────────────────────────────
    def approve_selected(self, request, queryset):
        count = queryset.update(status='Approved')
        self.message_user(request, f"Successfully approved {count} leave application(s).", level=messages.SUCCESS)
    approve_selected.short_description = "✓ Approve selected leave applications"

    def reject_selected(self, request, queryset):
        count = queryset.update(status='Rejected')
        self.message_user(request, f"Successfully rejected {count} leave application(s).", level=messages.WARNING)
    reject_selected.short_description = "✕ Reject selected leave applications"

    def reset_to_pending(self, request, queryset):
        count = queryset.update(status='Pending')
        self.message_user(request, f"Reset {count} leave application(s) to Pending.", level=messages.INFO)
    reset_to_pending.short_description = "⏳ Reset status to Pending"



@admin.register(OtApplication)
class OtApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'ot_type', 'ot_date', 'ot_hours', 'status')
    list_filter = ('status', 'ot_type')


# ----------------------------------------------------------------------
# Staff Single Recipient Picker Widget (For Salary Slip)
# ----------------------------------------------------------------------
class StaffSingleRecipientPickerWidget(forms.Widget):
    def render(self, name, value, attrs=None, renderer=None):
        selected_val = str(value) if value is not None else ""
        staff_list = list(StaffProfile.objects.all().order_by('full_name'))

        # Find selected staff object if any
        selected_staff_obj = None
        for s in staff_list:
            if selected_val == str(s.id) or selected_val == str(s.staff_id):
                selected_staff_obj = s
                selected_val = str(s.staff_id)
                break

        # Extract unique departments for filter chips
        departments = sorted(list(set([s.department for s in staff_list if s.department])))

        dept_chips_html = '<button type="button" class="salary-dept-filter active" data-dept="all" style="padding: 5px 14px; font-size: 12px; font-weight: 700; border-radius: 20px; border: 1.5px solid #08709d; background: #08709d; color: #ffffff; cursor: pointer; transition: all 0.15s ease;">All Staff</button>'
        for d in departments:
            dept_chips_html += f'<button type="button" class="salary-dept-filter" data-dept="{d.lower()}" style="padding: 5px 14px; font-size: 12px; font-weight: 700; border-radius: 20px; border: 1.5px solid #cbd5e1; background: #f8fafc; color: #475569; cursor: pointer; transition: all 0.15s ease;">{d}</button>'

        selected_banner_html = ""
        if selected_staff_obj:
            s_init = "".join([w[0].upper() for w in selected_staff_obj.full_name.split() if w])[:2] if selected_staff_obj.full_name else "??"
            s_photo = f'<img src="{selected_staff_obj.photo.url}" style="width: 44px; height: 44px; border-radius: 12px; object-fit: cover; border: 2px solid #059669; box-shadow: 0 2px 8px rgba(5,150,105,0.2);" />' if selected_staff_obj.photo else f'<div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(5,150,105,0.2);">{s_init}</div>'
            selected_banner_html = f"""
            <div id="salary-staff-selected-banner" style="display: flex; align-items: center; gap: 14px; padding: 14px 18px; background: #ecfdf5; border: 2px solid #059669; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(5,150,105,0.08);">
                {s_photo}
                <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 10.5px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px;">✓ Selected Recipient</div>
                    <div style="font-size: 15px; font-weight: 800; color: #0f172a;">{selected_staff_obj.full_name} <span style="font-size: 12px; font-weight: 700; color: #08709d; background: #e0f2fe; padding: 2px 8px; border-radius: 8px; margin-left: 4px;">ID: {selected_staff_obj.staff_id}</span></div>
                    <div style="font-size: 12px; color: #475569; font-weight: 600; margin-top: 2px;">{selected_staff_obj.position or 'Staff'} • {selected_staff_obj.department or 'General'}</div>
                </div>
                <div style="width: 32px; height: 32px; border-radius: 50%; background: #059669; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 15px;">
                    <i class="fas fa-check"></i>
                </div>
            </div>
            """
        else:
            selected_banner_html = f"""
            <div id="salary-staff-selected-banner" style="display: none; align-items: center; gap: 14px; padding: 14px 18px; background: #ecfdf5; border: 2px solid #059669; border-radius: 16px; margin-bottom: 16px; box-shadow: 0 4px 12px rgba(5,150,105,0.08);">
                <div id="salary-banner-avatar"></div>
                <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 10.5px; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px;">✓ Selected Recipient</div>
                    <div id="salary-banner-name" style="font-size: 15px; font-weight: 800; color: #0f172a;"></div>
                    <div id="salary-banner-dept" style="font-size: 12px; color: #475569; font-weight: 600; margin-top: 2px;"></div>
                </div>
                <div style="width: 32px; height: 32px; border-radius: 50%; background: #059669; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 15px;">
                    <i class="fas fa-check"></i>
                </div>
            </div>
            """

        output = [f"""
        <style>
            .field-staff .related-widget-wrapper-link {{ display: none !important; }}
            .field-staff .related-widget-wrapper {{ width: 100% !important; max-width: 100% !important; display: block !important; }}
            .salary-staff-card:hover {{
                border-color: #08709d !important;
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(8, 112, 157, 0.12) !important;
            }}
            .salary-dept-filter:hover {{
                border-color: #08709d !important;
                color: #08709d !important;
            }}
            .salary-dept-filter.active {{
                background: #08709d !important;
                border-color: #08709d !important;
                color: #ffffff !important;
            }}
        </style>
        <div class="salary-staff-picker" style="max-width: 950px; background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 20px; padding: 22px; box-shadow: 0 4px 24px rgba(0,0,0,0.04);">
            <input type="hidden" name="{name}" id="id_{name}_selected" value="{selected_val}" />
            
            {selected_banner_html}

            <!-- Top Search & Header Bar -->
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 14px; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 38px; height: 38px; border-radius: 10px; background: #e0f2fe; color: #08709d; display: flex; align-items: center; justify-content: center; font-size: 16px;">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div>
                        <div style="font-weight: 800; font-size: 14px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.04em;">Choose Staff Member</div>
                        <div style="font-size: 11.5px; color: #64748b; font-weight: 600;">{len(staff_list)} active employees available</div>
                    </div>
                </div>

                <div style="position: relative; min-width: 260px; flex: 1; max-width: 340px;">
                    <input type="text" id="salary-staff-search" placeholder="Search by name, ID, position..." style="width: 100%; padding: 9px 14px 9px 36px; font-size: 13px; border-radius: 12px; border: 1.5px solid #cbd5e1; outline: none; background: #f8fafc; transition: all 0.2s;" />
                    <i class="fas fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 13px;"></i>
                </div>
            </div>

            <!-- Department Filter Chips -->
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; overflow-x: auto; padding-bottom: 4px;">
                {dept_chips_html}
            </div>

            <!-- Staff Grid -->
            <div id="salary-staff-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; max-height: 380px; overflow-y: auto; padding: 4px;">
        """]

        for s in staff_list:
            is_selected = (selected_val == str(s.id) or selected_val == str(s.staff_id))
            border_col = "#059669" if is_selected else "#e2e8f0"
            bg_col = "#ecfdf5" if is_selected else "#ffffff"
            initials = "".join([w[0].upper() for w in s.full_name.split() if w])[:2] if s.full_name else "??"
            dept_str = s.department if s.department else "General"
            dept_lower = dept_str.lower()

            photo_html = f'<img src="{s.photo.url}" style="width: 46px; height: 46px; border-radius: 12px; object-fit: cover; flex-shrink: 0; border: 1.5px solid #cbd5e1;" />' if s.photo else f'<div style="width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%); color: #08709d; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1.5px solid #bae6fd;">{initials}</div>'

            output.append(f"""
                <div class="salary-staff-card" data-staff-id="{s.staff_id}" data-name="{s.full_name}" data-dept="{s.position or 'Staff'} • {dept_str}" data-dept-raw="{dept_lower}" data-initials="{initials}" data-photo="{s.photo.url if s.photo else ''}" data-search-text="{s.full_name.lower()} {s.staff_id.lower()} {s.department.lower()} {s.position.lower()}" style="display: flex; align-items: center; gap: 14px; padding: 14px 16px; border: 2px solid {border_col}; background: {bg_col}; border-radius: 16px; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); user-select: none; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
                    {photo_html}
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 800; font-size: 14px; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{s.full_name}</div>
                        <div style="display: flex; align-items: center; gap: 6px; margin-top: 3px; flex-wrap: wrap;">
                            <span style="font-size: 11px; color: #08709d; font-weight: 700; background: #e0f2fe; padding: 1px 7px; border-radius: 6px; font-family: monospace;">{s.staff_id}</span>
                            <span style="font-size: 11px; color: #64748b; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{dept_str}</span>
                        </div>
                        <div style="font-size: 11.5px; color: #059669; font-weight: 600; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{s.position or 'Staff'}</div>
                    </div>
                    <div class="check-circle-wrapper" style="width: 24px; height: 24px; border-radius: 50%; border: 2px solid {'#059669' if is_selected else '#cbd5e1'}; background: {'#059669' if is_selected else '#ffffff'}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; transition: all 0.2s;">
                        <i class="fas fa-check" style="display: {'block' if is_selected else 'none'};"></i>
                    </div>
                </div>
            """)

        output.append(f"""
            </div>
            <script>
            (function() {{
                const hiddenInput = document.getElementById('id_{name}_selected');
                const cards = document.querySelectorAll('.salary-staff-card');
                const searchInput = document.getElementById('salary-staff-search');
                const deptFilters = document.querySelectorAll('.salary-dept-filter');
                const banner = document.getElementById('salary-staff-selected-banner');
                const bannerAvatar = document.getElementById('salary-banner-avatar');
                const bannerName = document.getElementById('salary-banner-name');
                const bannerDept = document.getElementById('salary-banner-dept');

                let currentDeptFilter = 'all';

                function filterCards() {{
                    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
                    cards.forEach(card => {{
                        const text = card.getAttribute('data-search-text') || '';
                        const cardDept = card.getAttribute('data-dept-raw') || '';
                        const matchesQuery = !query || text.includes(query);
                        const matchesDept = (currentDeptFilter === 'all') || (cardDept === currentDeptFilter);
                        card.style.display = (matchesQuery && matchesDept) ? 'flex' : 'none';
                    }});
                }}

                cards.forEach(card => {{
                    card.addEventListener('click', function() {{
                        const sId = this.getAttribute('data-staff-id');
                        const sName = this.getAttribute('data-name');
                        const sDept = this.getAttribute('data-dept');
                        const sInit = this.getAttribute('data-initials');
                        const sPhoto = this.getAttribute('data-photo');

                        hiddenInput.value = sId;
                        
                        cards.forEach(c => {{
                            c.style.borderColor = '#e2e8f0';
                            c.style.background = '#ffffff';
                            const chk = c.querySelector('.check-circle-wrapper');
                            if (chk) {{
                                chk.style.borderColor = '#cbd5e1';
                                chk.style.background = '#ffffff';
                                const icon = chk.querySelector('i');
                                if (icon) icon.style.display = 'none';
                            }}
                        }});

                        this.style.borderColor = '#059669';
                        this.style.background = '#ecfdf5';
                        const myChk = this.querySelector('.check-circle-wrapper');
                        if (myChk) {{
                            myChk.style.borderColor = '#059669';
                            myChk.style.background = '#059669';
                            const icon = myChk.querySelector('i');
                            if (icon) icon.style.display = 'block';
                        }}

                        if (banner) {{
                            banner.style.display = 'flex';
                            if (bannerAvatar) {{
                                if (sPhoto) {{
                                    bannerAvatar.innerHTML = '<img src="' + sPhoto + '" style="width: 44px; height: 44px; border-radius: 12px; object-fit: cover; border: 2px solid #059669;" />';
                                }} else {{
                                    bannerAvatar.innerHTML = '<div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center;">' + sInit + '</div>';
                                }}
                            }}
                            if (bannerName) bannerName.innerHTML = sName + ' <span style="font-size: 12px; font-weight: 700; color: #08709d; background: #e0f2fe; padding: 2px 8px; border-radius: 8px; margin-left: 4px;">ID: ' + sId + '</span>';
                            if (bannerDept) bannerDept.innerText = sDept;
                        }}
                    }});
                }});

                deptFilters.forEach(btn => {{
                    btn.addEventListener('click', function() {{
                        deptFilters.forEach(b => {{
                            b.classList.remove('active');
                            b.style.background = '#f8fafc';
                            b.style.borderColor = '#cbd5e1';
                            b.style.color = '#475569';
                        }});
                        this.classList.add('active');
                        this.style.background = '#08709d';
                        this.style.borderColor = '#08709d';
                        this.style.color = '#ffffff';

                        currentDeptFilter = this.getAttribute('data-dept');
                        filterCards();
                    }});
                }});

                if (searchInput) {{
                    searchInput.addEventListener('input', filterCards);
                }}
            }})();
            </script>
        </div>
        """)
        return mark_safe("".join(output))




class SalarySlipAdminForm(forms.ModelForm):
    class Meta:
        model = SalaryApplication
        fields = ['staff', 'description', 'image']
        widgets = {
            'staff': StaffSingleRecipientPickerWidget(),
            'description': forms.Textarea(attrs={
                'rows': 4,
                'placeholder': 'Enter monthly salary slip description (e.g. Salary Slip for August 2026 - Transferred via WPS)...',
                'style': 'font-size: 13.5px; max-width: 850px;'
            }),
        }


@admin.register(SalaryApplication)
class SalaryApplicationAdmin(admin.ModelAdmin):
    form = SalarySlipAdminForm
    list_display = ('staff_badge', 'description_summary', 'image_preview', 'status_badge', 'submitted_at')
    list_display_links = ('staff_badge',)
    list_filter = ('submitted_at', 'status')
    search_fields = ('staff_name', 'staff__staff_id', 'description', 'staff_dep', 'staff_position')
    list_per_page = 20

    fieldsets = (
        ('👤 1. Choose Staff Member', {
            'fields': ('staff',),
            'description': mark_safe('<span style="color: #08709d; font-weight: 700; font-size: 13.5px;">Select the staff member who will receive this Monthly Salary Slip.</span>')
        }),
        ('📝 2. Description / Note', {
            'fields': ('description',),
            'description': 'Enter description, period notes, or remarks for this salary slip.'
        }),
        ('📄 3. Upload Salary Slip Image / Document', {
            'fields': ('image',),
            'description': mark_safe('<span style="color: #059669; font-weight: 700; font-size: 13px;">Attach the monthly salary slip image or document for the staff.</span>')
        }),
    )

    def save_model(self, request, obj, form, change):
        if obj.staff:
            obj.staff_name = obj.staff.full_name
            obj.staff_dep = obj.staff.department or ''
            obj.staff_position = obj.staff.position or ''
        obj.status = 'Issued'
        super().save_model(request, obj, form, change)

    def staff_badge(self, obj):
        initials = "".join([w[0].upper() for w in obj.staff_name.split() if w])[:2] if obj.staff_name else "??"
        dept = f" • {obj.staff_dep}" if obj.staff_dep else ""
        return mark_safe(f"""
        <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 30px; height: 30px; border-radius: 6px; background: #05966920; color: #059669; font-weight: 800; font-size: 11px; display: flex; align-items: center; justify-content: center;">
                {initials}
            </div>
            <div>
                <div style="font-weight: 700; font-size: 13px; color: #0f172a;">{obj.staff_name}</div>
                <div style="font-size: 11px; color: #64748b;">{obj.staff_id}{dept}</div>
            </div>
        </div>
        """)
    staff_badge.short_description = "Staff Member"

    def description_summary(self, obj):
        desc = obj.description or "—"
        if len(desc) > 80:
            desc = desc[:77] + "..."
        return mark_safe(f"<span style='font-size: 12.5px; color: #334155;'>{desc}</span>")
    description_summary.short_description = "Description"

    def image_preview(self, obj):
        if obj.image:
            url = obj.image.url
            return mark_safe(f'<a href="{url}" target="_blank" style="display: inline-flex; align-items: center; gap: 5px; color: #08709d; font-weight: 700; font-size: 12px; text-decoration: none;"><img src="{url}" style="width: 32px; height: 32px; border-radius: 6px; object-fit: cover; border: 1px solid #cbd5e1;" /> <span>View Slip</span></a>')
        return mark_safe('<span style="color: #94a3b8; font-size: 11.5px;">No image</span>')
    image_preview.short_description = "Salary Slip"

    def status_badge(self, obj):
        return mark_safe('<span style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; text-transform: uppercase;">Issued</span>')
    status_badge.short_description = "Status"




class StaffRecipientPickerWidget(forms.CheckboxSelectMultiple):
    def render(self, name, value, attrs=None, renderer=None):
        if value is None:
            value = []
        elif not isinstance(value, (list, tuple)):
            value = [value]
        value = [str(v) for v in value]

        staff_list = StaffProfile.objects.all().order_by('full_name')
        
        output = ["""
        <div class="staff-picker-container" style="max-width: 750px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 14px; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1.5px solid #f1f5f9;">
                <label style="display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 13px; color: #08709d; cursor: pointer; user-select: none; margin: 0;">
                    <input type="checkbox" id="select-all-staff-toggle" style="width: 18px; height: 18px; cursor: pointer; accent-color: #08709d;" />
                    <span>📢 Select All Available Staff (Send to All)</span>
                </label>
                <span id="staff-selected-count" style="font-size: 12px; font-weight: 700; color: #64748b; background: #f8fafc; padding: 4px 10px; border-radius: 999px; border: 1px solid #e2e8f0;">
                    0 selected
                </span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 10px; max-height: 280px; overflow-y: auto; padding: 4px;">
        """]

        for s in staff_list:
            is_checked = str(s.id) in value or str(s.staff_id) in value
            checked_attr = 'checked' if is_checked else ''
            initials = "".join([w[0].upper() for w in s.full_name.split() if w])[:2] if s.full_name else "??"
            dept_str = f" • {s.department}" if s.department else ""
            
            photo_html = f'<img src="{s.photo.url}" style="width: 28px; height: 28px; border-radius: 6px; object-fit: cover;" />' if s.photo else f'<div style="width: 28px; height: 28px; border-radius: 6px; background: #08709d20; color: #08709d; font-weight: 800; font-size: 11px; display: flex; align-items: center; justify-content: center;">{initials}</div>'

            output.append(f"""
                <label class="staff-picker-item" style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; border: 1.5px solid {'#08709d' if is_checked else '#e2e8f0'}; background: {'#f0f9ff' if is_checked else '#ffffff'}; border-radius: 10px; cursor: pointer; transition: all 0.15s ease; user-select: none;">
                    <input type="checkbox" name="{name}" value="{s.id}" class="staff-checkbox" {checked_attr} style="width: 16px; height: 16px; accent-color: #08709d; cursor: pointer;" />
                    {photo_html}
                    <div style="flex: 1; min-width: 0;">
                        <div style="font-weight: 700; font-size: 12.5px; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{s.full_name}</div>
                        <div style="font-size: 11px; color: #64748b; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{s.staff_id}{dept_str}</div>
                    </div>
                </label>
            """)

        output.append("""
            </div>
            <script>
            (function() {
                function initPicker() {
                    const selectAll = document.getElementById('select-all-staff-toggle');
                    const checkboxes = document.querySelectorAll('.staff-checkbox');
                    const countSpan = document.getElementById('staff-selected-count');
                    if (!selectAll || !checkboxes.length) return;

                    function updateCount() {
                        const checked = document.querySelectorAll('.staff-checkbox:checked');
                        if (countSpan) countSpan.textContent = checked.length + ' of ' + checkboxes.length + ' selected';
                        selectAll.checked = (checked.length === checkboxes.length && checkboxes.length > 0);
                        selectAll.indeterminate = (checked.length > 0 && checked.length < checkboxes.length);

                        checkboxes.forEach(cb => {
                            const parent = cb.closest('.staff-picker-item');
                            if (parent) {
                                parent.style.borderColor = cb.checked ? '#08709d' : '#e2e8f0';
                                parent.style.background = cb.checked ? '#f0f9ff' : '#ffffff';
                            }
                        });
                    }

                    selectAll.addEventListener('change', function() {
                        checkboxes.forEach(cb => { cb.checked = selectAll.checked; });
                        updateCount();
                    });

                    checkboxes.forEach(cb => {
                        cb.addEventListener('change', updateCount);
                    });

                    updateCount();
                }
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', initPicker);
                } else {
                    setTimeout(initPicker, 100);
                }
            })();
            </script>
        </div>
        """)
        return mark_safe("".join(output))


class NoticeApplicationForm(forms.ModelForm):
    class Meta:
        model = NoticeApplication
        fields = ['title', 'content', 'selected_staff']
        widgets = {
            'title': forms.TextInput(attrs={
                'placeholder': 'Enter notice headline (e.g. Mandatory Clinical Meeting, Holiday Schedule)',
                'style': 'font-weight: 700; font-size: 14px;'
            }),
            'content': forms.Textarea(attrs={
                'placeholder': 'Type full notice announcement details here...',
                'rows': 5,
                'style': 'font-size: 13.5px;'
            }),
            'selected_staff': StaffRecipientPickerWidget(),
        }


@admin.register(NoticeApplication)
class NoticeApplicationAdmin(admin.ModelAdmin):
    form = NoticeApplicationForm
    list_display = ('title', 'recipients_badge', 'submitted_at', 'actions_buttons')
    list_display_links = ('title',)
    list_filter = ('submitted_at',)
    search_fields = ('title', 'content')
    list_per_page = 20

    fieldsets = (
        ('📢 Notice Information', {
            'fields': (
                'title',
                'content',
            ),
            'description': 'Specify the notice title and write your announcement message.'
        }),
        ('👥 Select Recipients to Send Notice', {
            'fields': (
                'selected_staff',
            ),
            'description': mark_safe('<span style="color: #08709d; font-weight: 600;">Check "Select All" to broadcast to every staff member, or check specific staff members who should receive this notice.</span>')
        }),
    )

    def save_model(self, request, obj, form, change):
        if not obj.staff_name:
            obj.staff_name = "Administration / Management"
        super().save_model(request, obj, form, change)
        # Update target_audience based on selection
        total_staff_count = StaffProfile.objects.count()
        selected_count = form.cleaned_data.get('selected_staff', []).count()
        if selected_count == 0 or selected_count >= total_staff_count:
            obj.target_audience = 'all'
        else:
            obj.target_audience = 'specific_staff'
        obj.save()

    def recipients_badge(self, obj):
        total_staff = StaffProfile.objects.count()
        count = obj.selected_staff.count()
        if obj.target_audience == 'all' or count == 0 or count >= total_staff:
            return mark_safe('<span style="background: #dbeafe; color: #1e40af; border: 1px solid #bfdbfe; font-size: 11.5px; font-weight: 700; padding: 3px 10px; border-radius: 6px;">📢 All Staff Members</span>')
        names = ", ".join([s.full_name for s in obj.selected_staff.all()[:2]])
        extra = f" +{count - 2} more" if count > 2 else ""
        return mark_safe(f'<span style="background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe; font-size: 11.5px; font-weight: 700; padding: 3px 10px; border-radius: 6px;">👤 {names}{extra}</span>')
    recipients_badge.short_description = "Recipients"

    def actions_buttons(self, obj):
        edit_url = f"/admin/api/noticeapplication/{obj.id}/change/"
        delete_url = f"/admin/api/noticeapplication/{obj.id}/delete/"
        return mark_safe(f"""
            <div style="display: flex; gap: 8px; align-items: center;">
                <a href="{edit_url}" style="background: #08709d; color: #ffffff; padding: 5px 12px; border-radius: 6px; font-weight: 700; font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 2px 6px rgba(8, 112, 157, 0.2);">
                    <i class="fas fa-edit"></i> Edit
                </a>
                <a href="{delete_url}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 5px 12px; border-radius: 6px; font-weight: 700; font-size: 11.5px; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
                    <i class="fas fa-trash-alt"></i> Delete
                </a>
            </div>
        """)
    actions_buttons.short_description = "Actions"


@admin.register(DutyApplication)
class DutyApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'duty_date', 'shift_timing', 'shift_type', 'duty_replacement', 'status', 'submitted_at')
    list_filter = ('status', 'shift_timing', 'shift_type', 'duty_date')
    search_fields = ('staff_name', 'staff__staff_id', 'duty_replacement', 'duty_reason')
    ordering = ('-submitted_at',)
    fieldsets = (
        ('Applicant Details', {
            'fields': (('staff', 'staff_name'),)
        }),
        ('Duty & Shift Information', {
            'fields': (
                ('duty_date', 'shift_timing', 'shift_type'),
                'duty_replacement',
            )
        }),
        ('Reason / Handover Notes & Status', {
            'fields': (
                'duty_reason',
                'status',
            )
        }),
    )


class DriverScheduleForm(forms.ModelForm):
    class Meta:
        model = DriverSchedule
        fields = '__all__'
        widgets = {
            'driver_phone': forms.TextInput(attrs={
                'placeholder': 'e.g. +971 50 123 4567',
            }),
            'vehicle_info': forms.TextInput(attrs={
                'placeholder': 'e.g. Toyota HiAce - DXB 45921',
            }),
        }


class StaffDropdownMultiSelectWidget(forms.CheckboxSelectMultiple):
    def __init__(self, placeholder="Select staff...", attrs=None):
        super().__init__(attrs)
        self.placeholder = placeholder

    def render(self, name, value, attrs=None, renderer=None):
        if value is None:
            value = []
        elif isinstance(value, (str, int)):
            value = [str(value)]
        else:
            value = [str(v.id if hasattr(v, 'id') else (v.pk if hasattr(v, 'pk') else v)) for v in value]

        staff_list = StaffProfile.objects.all().order_by('full_name')

        output = [f"""
        <div class="staff-multiselect-dropdown" data-field-name="{name}" data-placeholder="{conditional_escape(self.placeholder)}">
            <div class="staff-dropdown-trigger" tabindex="0">
                <div class="staff-dropdown-tags-wrapper">
                    <span class="staff-dropdown-placeholder">{conditional_escape(self.placeholder)}</span>
                </div>
                <div class="staff-dropdown-actions">
                    <span class="staff-dropdown-count-badge" style="display: none;">0</span>
                    <i class="fas fa-chevron-down staff-dropdown-chevron"></i>
                </div>
            </div>

            <div class="staff-dropdown-panel" style="display: none;">
                <div class="staff-dropdown-search-header">
                    <div style="position: relative; flex: 1;">
                        <input type="text" class="staff-dropdown-search-input" placeholder="🔍 Search staff by name or department..." autocomplete="off" />
                    </div>
                </div>

                <div class="staff-dropdown-options-list">
        """]

        for s in staff_list:
            is_checked = str(s.id) in value or str(s.staff_id) in value
            checked_attr = 'checked' if is_checked else ''
            initials = "".join([w[0].upper() for w in s.full_name.split() if w])[:2] if s.full_name else "??"
            dept_str = f" • {s.department}" if s.department else ""

            photo_html = f'<img src="{s.photo.url}" style="width: 26px; height: 26px; border-radius: 6px; object-fit: cover;" />' if s.photo else f'<div style="width: 26px; height: 26px; border-radius: 6px; background: #0284c720; color: #0284c7; font-weight: 800; font-size: 11px; display: flex; align-items: center; justify-content: center;">{initials}</div>'

            output.append(f"""
                <label class="staff-dropdown-option-item {'selected' if is_checked else ''}" data-staff-id="{s.id}" data-staff-name="{s.full_name}" data-search-text="{s.full_name.lower()} {s.staff_id.lower()} {(s.department or '').lower()}">
                    <input type="checkbox" name="{name}" value="{s.id}" class="staff-dropdown-checkbox" {checked_attr} />
                    {photo_html}
                    <div class="staff-option-text">
                        <div class="staff-option-name">{s.full_name}</div>
                        <div class="staff-option-sub">{s.staff_id}{dept_str}</div>
                    </div>
                    <span class="staff-option-checkmark"><i class="fas fa-check"></i></span>
                </label>
            """)

        output.append("""
                </div>
            </div>
        </div>
        """)
        return mark_safe("".join(output))


class DriverRouteStopForm(forms.ModelForm):
    class Meta:
        model = DriverRouteStop
        fields = '__all__'
        widgets = {
            'stop_order': forms.NumberInput(attrs={
                'min': '1',
                'placeholder': '1',
            }),
            'staff_passengers': StaffDropdownMultiSelectWidget(placeholder="Select staff to pick up..."),
            'staff_dropoffs': StaffDropdownMultiSelectWidget(placeholder="Select staff to drop off..."),
            'source_location': forms.TextInput(attrs={
                'placeholder': 'e.g. Dubai Marina / Clinic Headquarters',
            }),
            'source_time': forms.TextInput(attrs={
                'type': 'time',
            }),
            'destination_location': forms.TextInput(attrs={
                'placeholder': 'e.g. Kings College Hospital / Patient Home',
            }),
            'destination_time': forms.TextInput(attrs={
                'type': 'time',
            }),
        }


class DriverRouteStopInline(admin.StackedInline):
    model = DriverRouteStop
    form = DriverRouteStopForm
    extra = 1
    verbose_name = "Route Leg / Stop"
    verbose_name_plural = "📍 Multi-Stop Trip Schedule & Routes"
    fieldsets = (
        (None, {
            'fields': (
                ('stop_order', 'status'),
                ('source_location', 'source_time'),
                'staff_passengers',
                ('destination_location', 'destination_time'),
                'staff_dropoffs',
            )
        }),
    )

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        formfield = super().formfield_for_foreignkey(db_field, request, **kwargs)
        if formfield and hasattr(formfield, 'widget'):
            formfield.widget.can_add_related = False
            formfield.widget.can_change_related = False
            formfield.widget.can_delete_related = False
            formfield.widget.can_view_related = False
        return formfield

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        formfield = super().formfield_for_manytomany(db_field, request, **kwargs)
        if formfield and hasattr(formfield, 'widget'):
            formfield.widget.can_add_related = False
            formfield.widget.can_change_related = False
            formfield.widget.can_delete_related = False
            formfield.widget.can_view_related = False
        return formfield


@admin.register(DriverSchedule)
class DriverScheduleAdmin(admin.ModelAdmin):
    form = DriverScheduleForm
    inlines = [DriverRouteStopInline]
    change_form_template = "admin/api/driverschedule/change_form.html"
    list_display = (
        'get_driver_display',
        'driver_phone',
        'vehicle_info',
        'schedule_date',
        'get_route_summary',
        'status'
    )
    list_filter = ('status', 'schedule_date')
    search_fields = (
        'driver_name',
        'driver__full_name',
        'driver__staff_id',
        'driver_phone',
        'vehicle_info',
        'route_stops__source_location',
        'route_stops__destination_location',
        'route_stops__staff_passenger_name'
    )
    ordering = ('-schedule_date', '-created_at')
    fieldsets = (
        ('Driver & Vehicle Details', {
            'fields': (
                ('driver', 'driver_phone', 'vehicle_info'),
            )
        }),
        ('Schedule Date & Status', {
            'fields': (
                ('schedule_date', 'status'),
            )
        }),
    )

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        formfield = super().formfield_for_foreignkey(db_field, request, **kwargs)
        if formfield and hasattr(formfield, 'widget'):
            formfield.widget.can_add_related = False
            formfield.widget.can_change_related = False
            formfield.widget.can_delete_related = False
            formfield.widget.can_view_related = False
        return formfield

    def get_driver_display(self, obj):
        if obj.driver:
            return f"{obj.driver.full_name} ({obj.driver.staff_id})"
        return obj.driver_name or "Unassigned"
    get_driver_display.short_description = "Assigned Driver"

    def get_route_summary(self, obj):
        stops = obj.route_stops.all().order_by('stop_order', 'id')
        if stops.exists():
            html_parts = []
            for s in stops:
                s_t = f" <small style='color: #64748b;'>({s.source_time})</small>" if s.source_time else ""
                d_t = f" <small style='color: #64748b;'>({s.destination_time})</small>" if s.destination_time else ""
                st_badge = ""
                if s.status == 'Completed':
                    st_badge = " <span style='background:#dcfce7;color:#15803d;padding:1px 6px;border-radius:6px;font-size:10px;'>✓ Done</span>"
                elif s.status == 'In Progress':
                    st_badge = " <span style='background:#fef3c7;color:#b45309;padding:1px 6px;border-radius:6px;font-size:10px;'>⚡ Active</span>"
                
                pass_names = s.get_passengers_display()
                pass_label = f" <span style='background:#e0f2fe;color:#0369a1;padding:2px 8px;border-radius:6px;font-size:11px;font-weight:600;'>👥 {pass_names}</span>" if pass_names else ""

                html_parts.append(f"<div style='margin-bottom: 4px;'><strong>Leg #{s.stop_order}:</strong> {s.source_location}{s_t} ➔ {s.destination_location}{d_t}{pass_label}{st_badge}</div>")
            return mark_safe("".join(html_parts))
        return mark_safe("<span style='color: #94a3b8; font-style: italic;'>No routes defined</span>")
    get_route_summary.short_description = "Trip Routes & Stops"









from django.shortcuts import redirect
from django.contrib.sites.models import Site
from .models import RobotsTxt, SitemapXml

# Completely remove Site / Add site from Django Admin
try:
    admin.site.unregister(Site)
except Exception:
    pass

@admin.register(RobotsTxt)
class RobotsTxtAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'updated_at')
    fields = ('content',)

    def has_add_permission(self, request):
        return not RobotsTxt.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj, _ = RobotsTxt.objects.get_or_create(id=1)
        return redirect(f'/admin/api/robotstxt/{obj.id}/change/')

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, request, **kwargs)
        if db_field.name == 'content':
            formfield.widget.attrs.update({
                'rows': 18,
                'style': 'font-family: Consolas, monospace; font-size: 14px; line-height: 1.6; background: #0b1329; color: #38bdf8; border: 1.5px solid #1e293b; padding: 14px; border-radius: 10px; width: 100%; max-width: 950px;'
            })
        return formfield


@admin.register(SitemapXml)
class SitemapXmlAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'updated_at')
    fields = ('content',)

    def has_add_permission(self, request):
        return not SitemapXml.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj, _ = SitemapXml.objects.get_or_create(id=1)
        return redirect(f'/admin/api/sitemapxml/{obj.id}/change/')

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        formfield = super().formfield_for_dbfield(db_field, request, **kwargs)
        if db_field.name == 'content':
            formfield.widget.attrs.update({
                'rows': 24,
                'style': 'font-family: Consolas, monospace; font-size: 13.5px; line-height: 1.5; background: #0b1329; color: #34d399; border: 1.5px solid #1e293b; padding: 14px; border-radius: 10px; width: 100%; max-width: 950px;'
            })
        return formfield


# ----------------------------------------------------------------------
# Monkeypatch admin.site.index to provide custom dashboard metrics context
# ----------------------------------------------------------------------
original_index = admin.site.index

def custom_admin_index(request, extra_context=None):
    if extra_context is None:
        extra_context = {}
    
    try:
        extra_context['staff_count'] = StaffProfile.objects.count()
        extra_context['pending_leaves'] = LeaveApplication.objects.filter(status='Pending').count()
        extra_context['active_tasks'] = Task.objects.filter(status='In Progress').count()
        extra_context['service_count'] = Service.objects.count()
        extra_context['blog_count'] = BlogPost.objects.count()
        extra_context['team_count'] = TeamMember.objects.count()
        
        # Recent data for tables
        extra_context['recent_tasks'] = Task.objects.order_by('-created_at')[:5]
        extra_context['recent_leaves'] = LeaveApplication.objects.order_by('-submitted_at')[:5]
    except Exception:
        pass
        
    return original_index(request, extra_context=extra_context)

admin.site.index = custom_admin_index


# ----------------------------------------------------------------------
# Monkeypatch jazzmin.utils.make_menu to support custom children dropdown links
# ----------------------------------------------------------------------
import jazzmin.utils

original_make_menu = jazzmin.utils.make_menu

def custom_make_menu(user, links, options, allow_appmenus=True, admin_site="admin"):
    if not user:
        return []
        
    menu = []
    
    for link in links:
        if "permissions" in link and link["permissions"]:
            perm_matches = [user.has_perm(perm) for perm in link["permissions"]]
            if not all(perm_matches):
                continue
            
        if "children" in link and isinstance(link["children"], list):
            children_menu = []
            for child in link["children"]:
                if "permissions" in child and child["permissions"]:
                    child_perms = [user.has_perm(p) for p in child["permissions"]]
                    if not all(child_perms):
                        continue
                
                children_menu.append({
                    "name": child.get("name", "unspecified"),
                    "url": jazzmin.utils.get_custom_url(child["url"], admin_site=admin_site),
                    "children": None,
                    "new_window": child.get("new_window", False),
                    "icon": child.get("icon", options.get("default_icon_children", "fas fa-file")),
                })
            
            if children_menu:
                menu.append({
                    "name": link.get("name", "unspecified"),
                    "url": "#",
                    "children": children_menu,
                    "icon": link.get("icon", options.get("default_icon_children", "fas fa-file")),
                    "new_window": False,
                })
        else:
            menu.extend(original_make_menu(user, [link], options, allow_appmenus, admin_site))
            
    return menu

jazzmin.utils.make_menu = custom_make_menu






