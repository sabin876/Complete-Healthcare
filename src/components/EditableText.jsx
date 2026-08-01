import React, { useState, useEffect } from 'react';

export default function EditableText({ 
  fieldKey, 
  slug = 'default', 
  defaultText = '', 
  isEditMode = false, 
  className = '', 
  tagName = 'span',
  multiline = false
}) {
  const storageKey = `corx_editable_${slug}_${fieldKey}`;
  const [text, setText] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? saved : defaultText;
    } catch (e) {
      return defaultText;
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved !== null) {
        setText(saved);
      } else {
        setText(defaultText);
      }
    } catch (e) {
      setText(defaultText);
    }
  }, [defaultText, storageKey]);

  const handleBlur = (e) => {
    const updated = e.currentTarget.innerText || e.currentTarget.textContent || '';
    setText(updated);
    try {
      localStorage.setItem(storageKey, updated);
    } catch (err) {}
  };

  const Component = tagName;
  const currentVal = text !== null && text !== undefined ? text : defaultText;

  if (!isEditMode) {
    if (multiline && typeof currentVal === 'string' && currentVal.includes('\n')) {
      const paragraphs = currentVal.split(/\n\n+/).filter(Boolean);
      return (
        <div className={className}>
          {paragraphs.map((p, idx) => (
            <p key={idx} className="mb-4 last:mb-0 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      );
    }
    return <Component className={className}>{currentVal}</Component>;
  }

  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} outline-none focus:ring-2 focus:ring-[#08709d] focus:ring-offset-2 rounded px-2 py-0.5 transition-all cursor-text group border-2 border-dashed border-[#08709d]/60 hover:border-[#08709d] bg-[#08709d]/10 text-slate-900 inline-block`}
      title="✏️ Click to edit text live"
    >
      {currentVal}
    </Component>
  );
}
