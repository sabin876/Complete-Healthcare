import json
from django.contrib import admin
from django import forms
from django.utils.safestring import mark_safe
from .models import (
    StaffProfile, Task, LeaveApplication, OtApplication,
    SalaryApplication, NoticeApplication, DutyApplication,
    BlogPost, Service, TeamMember
)

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
                            <span style="font-weight: 800; font-size: 14px; color: #08709d;">Category Column #${{colIdx + 1}}</span>
                            <button type="button" class="del-col-btn" data-col="${{colIdx}}" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">🗑️ Remove Category</button>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                            <div>
                                <label style="display: block; font-weight: 700; font-size: 12px; color: #334155; margin-bottom: 4px;">Category Title:</label>
                                <input type="text" class="col-title-input" data-col="${{colIdx}}" value="${{(col.title || '').replace(/"/g, '&quot;')}}" placeholder="e.g. Core Screenings" style="width: 100%; box-sizing: border-box; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px;" />
                            </div>
                            <div>
                                <label style="display: block; font-weight: 700; font-size: 12px; color: #334155; margin-bottom: 4px;">Tagline / Subtitle:</label>
                                <input type="text" class="col-tagline-input" data-col="${{colIdx}}" value="${{(col.tagline || '').replace(/"/g, '&quot;')}}" placeholder="e.g. Routine blood & vitals" style="width: 100%; box-sizing: border-box; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px;" />
                            </div>
                        </div>
                        
                        <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0;">
                            <label style="display: block; font-weight: 700; font-size: 12px; color: #334155; margin-bottom: 8px;">Tests Included in this Category:</label>
                            <div class="tests-container-${{colIdx}}">${{testsHtml}}</div>
                            <button type="button" class="add-test-btn" data-col="${{colIdx}}" style="margin-top: 6px; background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">+ Add Test to Category</button>
                        </div>
                    `;
                    columnsContainer.appendChild(card);
                }});

                // Attach Listeners
                columnsContainer.querySelectorAll('.col-title-input').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const colIdx = parseInt(e.target.getAttribute('data-col'));
                        colsData[colIdx].title = e.target.value;
                        sync();
                    }});
                }});

                columnsContainer.querySelectorAll('.col-tagline-input').forEach(inp => {{
                    inp.addEventListener('input', (e) => {{
                        const colIdx = parseInt(e.target.getAttribute('data-col'));
                        colsData[colIdx].tagline = e.target.value;
                        sync();
                    }});
                }});

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
                    title: '',
                    tagline: '',
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
                listData.push({{ title: '', desc: '' }});
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
        if value is None:
            value = {}
        if isinstance(value, str):
            try:
                value = json.loads(value)
            except Exception:
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
# Admin Forms & Classes
# ----------------------------------------------------------------------
class ServiceAdminForm(forms.ModelForm):
    title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 16px; font-weight: 600; padding: 10px 14px; border-radius: 6px;'}),
        help_text="Name of the service (e.g. Lab Services | Blood Test at Home)"
    )
    slug = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 450px; font-size: 14px; padding: 8px 12px; border-radius: 6px;'}),
        help_text="URL Identifier slug (e.g. lab-services, physiotherapy, iv-therapy)"
    )
    eyebrow = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
        required=False,
        help_text="Top badge text e.g. DHA-Licensed Home Sample Collection Across Dubai"
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

    class Meta:
        model = Service
        fields = '__all__'


class BlogPostAdminForm(forms.ModelForm):
    title = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 950px; font-size: 16px; font-weight: 600; padding: 10px 14px; border-radius: 6px;'}),
    )
    category = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 700px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
    )
    date = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 400px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
    )
    author = forms.CharField(
        widget=forms.TextInput(attrs={'style': 'width: 100%; max-width: 700px; font-size: 15px; padding: 9px 12px; border-radius: 6px;'}),
    )

    class Meta:
        model = BlogPost
        fields = '__all__'


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    form = ServiceAdminForm
    list_display = ('title', 'slug', 'eyebrow', 'theme_color')
    search_fields = ('title', 'slug', 'tagline', 'description')
    
    fieldsets = (
        ('📌 General Information', {
            'fields': ('title', 'slug', 'theme_color', 'icon', 'image_file')
        }),
        ('✨ Hero Section Content', {
            'fields': ('eyebrow', 'tagline', 'description', 'floating_badge', 'features')
        }),
        ('📋 Diagnostic Test Suites & Indications', {
            'fields': ('indications', 'lab_columns')
        }),
        ('⭐ Process & Why Choose Us', {
            'fields': ('steps', 'reasons', 'benefits')
        }),
        ('❓ FAQs', {
            'fields': ('faqs',)
        }),
    )


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ('title', 'category', 'date', 'author')
    list_filter = ('category', 'author')
    search_fields = ('title', 'content')


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


