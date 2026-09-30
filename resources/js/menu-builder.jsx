import React from 'react';
import { createRoot } from 'react-dom/client';
import MenuBuilderApp from './Components/MenuBuilder/MenuBuilderApp';
import MenuPreview from './Components/MenuBuilder/MenuPreview';

// Main builder (standalone page)
const builderEl = document.getElementById('menu-builder-root');
if (builderEl) {
    const menuId = builderEl.dataset.menuId;
    const menuName = builderEl.dataset.menuName || 'Menu';
    const apiUrl = builderEl.dataset.apiUrl || `/api/admin/menus/${menuId}/builder`;
    const csrfToken = builderEl.dataset.csrf || document.querySelector('meta[name="csrf-token"]')?.content;

    const root = createRoot(builderEl);
    root.render(<MenuBuilderApp menuId={menuId} menuName={menuName} apiUrl={apiUrl} csrfToken={csrfToken} />);
}

// Preview (if mounted separately)
const previewEl = document.getElementById('menu-preview-root');
if (previewEl) {
    const menuId = previewEl.dataset.menuId;
    const root = createRoot(previewEl);
    root.render(<MenuPreview menuId={menuId} />);
}
