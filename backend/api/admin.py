import json
from django.contrib import admin
from django import forms
from django.utils.safestring import mark_safe
from .models import (
    StaffProfile, Task, LeaveApplication, OtApplication,
    SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service, TeamMember
)
from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe

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


@admin.register(StaffProfile)
class StaffProfileAdmin(admin.ModelAdmin):
    list_display = ('staff_id', 'full_name', 'position', 'department', 'role')
    search_fields = ('staff_id', 'full_name', 'department')
    list_filter = ('role', 'department')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'assigned_to_name', 'priority', 'status', 'due_date')
    list_filter = ('priority', 'status')
    search_fields = ('title', 'assigned_to_name')


@admin.register(LeaveApplication)
class LeaveApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'leave_type', 'leave_start', 'leave_end', 'status')
    list_filter = ('status', 'leave_type')
    search_fields = ('staff_name',)


@admin.register(OtApplication)
class OtApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'ot_type', 'ot_date', 'ot_hours', 'status')
    list_filter = ('status', 'ot_type')


@admin.register(SalaryApplication)
class SalaryApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'inc_type', 'status', 'submitted_at')
    list_filter = ('status',)


@admin.register(NoticeApplication)
class NoticeApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'notice_title', 'status', 'submitted_at')
    list_filter = ('status',)


@admin.register(DutyApplication)
class DutyApplicationAdmin(admin.ModelAdmin):
    list_display = ('staff_name', 'duty_date', 'duty_replacement', 'status')
    list_filter = ('status',)


