import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    GripVertical,
    ChevronDown,
    ChevronRight,
    Trash2,
    Copy,
    ExternalLink,
    Link,
} from 'lucide-react';

const ITEM_TYPES = [
    { value: 'custom_url', label: 'Custom URL' },
    { value: 'cms_page', label: 'CMS Page' },
    { value: 'route', label: 'Internal Route' },
    { value: 'anchor', label: 'Anchor Link' },
    { value: 'email', label: 'Email' },
    { value: 'telephone', label: 'Telephone' },
    { value: 'policy_pdf', label: 'Policy / PDF Document' },
];

const VISIBILITY_OPTIONS = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'guests', label: 'Guests only' },
    { value: 'logged_in', label: 'Logged in users' },
];

function Field({ label, children }) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                {label}
            </label>
            {children}
        </div>
    );
}

const inputCls = "w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition";

export function SortableItem({ item, updateItem, deleteItem, duplicateItem, allItems }) {
    const [expanded, setExpanded] = useState(false);
    const [policies, setPolicies] = useState([]);
    const [policiesLoading, setPoliciesLoading] = useState(false);

    // Fetch policies when item type is policy_pdf and panel is expanded
    useEffect(() => {
        if (item.item_type === 'policy_pdf' && expanded && policies.length === 0) {
            setPoliciesLoading(true);
            fetch('/api/admin/policies', {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
                },
            })
                .then(r => r.json())
                .then(data => setPolicies(Array.isArray(data) ? data : []))
                .catch(() => setPolicies([]))
                .finally(() => setPoliciesLoading(false));
        }
    }, [item.item_type, expanded]);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: String(item.id) });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 'auto',
    };

    // Exclude self and own descendants from parent options
    const parentOptions = allItems.filter(i => String(i.id) !== String(item.id));

    const nestDepth = (() => {
        let depth = 0;
        let currentParentId = item.parent_id;
        while (currentParentId) {
            depth++;
            const parent = allItems.find(i => String(i.id) === String(currentParentId));
            currentParentId = parent?.parent_id ?? null;
            if (depth > 10) break; // safety
        }
        return depth;
    })();

    const depthColors = ['', 'border-l-4 border-l-blue-400', 'border-l-4 border-l-purple-400', 'border-l-4 border-l-pink-400'];
    const depthClass = depthColors[Math.min(nestDepth, 3)] || 'border-l-4 border-l-gray-400';

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${nestDepth > 0 ? depthClass : ''} ${isDragging ? 'ring-2 ring-indigo-400 shadow-lg' : ''}`}
        >
            {/* Row header */}
            <div className="flex items-center gap-2 px-3 py-2.5">
                {/* Drag handle */}
                <button
                    {...attributes}
                    {...listeners}
                    className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing touch-none flex-shrink-0"
                    title="Drag to reorder"
                    tabIndex={-1}
                    type="button"
                >
                    <GripVertical size={18} />
                </button>

                {/* Type icon */}
                <span className="text-gray-400 flex-shrink-0">
                    {item.target === '_blank' ? <ExternalLink size={14} /> : <Link size={14} />}
                </span>

                {/* Title */}
                <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm text-gray-800 dark:text-gray-200 truncate block">
                        {item.title || <em className="text-gray-400">Untitled</em>}
                    </span>
                    <span className="text-xs text-gray-400 truncate block">
                        {item.url || item.route || item.item_type}
                        {nestDepth > 0 && (
                            <span className="ml-2 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded px-1.5 py-0.5 text-[10px]">
                                Level {nestDepth}
                            </span>
                        )}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                        onClick={() => duplicateItem(item.id)}
                        className="text-gray-400 hover:text-blue-600 p-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                        title="Duplicate"
                        type="button"
                    >
                        <Copy size={15} />
                    </button>
                    <button
                        onClick={() => deleteItem(item.id)}
                        className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                        title="Delete"
                        type="button"
                    >
                        <Trash2 size={15} />
                    </button>
                    <button
                        onClick={() => setExpanded(e => !e)}
                        className="text-gray-400 hover:text-gray-700 p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        title={expanded ? 'Collapse' : 'Expand'}
                        type="button"
                    >
                        {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </button>
                </div>
            </div>

            {/* Expanded editor */}
            {expanded && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 rounded-b-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Title">
                            <input
                                type="text"
                                value={item.title || ''}
                                onChange={e => updateItem(item.id, 'title', e.target.value)}
                                placeholder="Menu label shown in nav"
                                className={inputCls}
                            />
                        </Field>

                        <Field label="Navigation Label (override)">
                            <input
                                type="text"
                                value={item.navigation_label || ''}
                                onChange={e => updateItem(item.id, 'navigation_label', e.target.value)}
                                placeholder="Optional override"
                                className={inputCls}
                            />
                        </Field>

                        <Field label="Item Type">
                            <select
                                value={item.item_type || 'custom_url'}
                                onChange={e => updateItem(item.id, 'item_type', e.target.value)}
                                className={inputCls}
                            >
                                {ITEM_TYPES.map(t => (
                                    <option key={t.value} value={t.value}>{t.label}</option>
                                ))}
                            </select>
                        </Field>

                        {item.item_type === 'policy_pdf' ? (
                            <Field label="Select Policy / PDF">
                                {policiesLoading ? (
                                    <div className={`${inputCls} text-gray-400 italic`}>Loading policies…</div>
                                ) : (
                                    <select
                                        value={item.url || ''}
                                        onChange={e => {
                                            updateItem(item.id, 'url', e.target.value);
                                            // Auto set target to _blank for PDFs
                                            if (e.target.value) {
                                                updateItem(item.id, 'target', '_blank');
                                            }
                                        }}
                                        className={inputCls}
                                    >
                                        <option value="">— Select a policy document —</option>
                                        {policies.map(p => (
                                            <option
                                                key={p.id}
                                                value={p.view_url}
                                            >
                                                {p.title}{p.category ? ` (${p.category})` : ''}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                {item.url && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        URL: <span className="font-mono">{item.url}</span>
                                        {' · '}
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-indigo-500 underline">Preview ↗</a>
                                    </p>
                                )}
                            </Field>
                        ) : (
                            <Field label="URL / Link">
                                <input
                                    type="text"
                                    value={item.url || ''}
                                    onChange={e => updateItem(item.id, 'url', e.target.value)}
                                    placeholder="https://... or /page"
                                    className={inputCls}
                                />
                            </Field>
                        )}

                        <Field label="Parent Item (Nesting)">
                            <select
                                value={item.parent_id || ''}
                                onChange={e => updateItem(item.id, 'parent_id', e.target.value || null)}
                                className={inputCls}
                            >
                                <option value="">— None (top level) —</option>
                                {parentOptions.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.title || 'Untitled'}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Open In">
                            <select
                                value={item.target || '_self'}
                                onChange={e => updateItem(item.id, 'target', e.target.value)}
                                className={inputCls}
                            >
                                <option value="_self">Same window</option>
                                <option value="_blank">New tab</option>
                            </select>
                        </Field>

                        <Field label="Icon (Heroicon name)">
                            <input
                                type="text"
                                value={item.icon || ''}
                                onChange={e => updateItem(item.id, 'icon', e.target.value)}
                                placeholder="e.g. home, user, cog"
                                className={inputCls}
                            />
                        </Field>

                        <Field label="CSS Classes">
                            <input
                                type="text"
                                value={item.css_classes || ''}
                                onChange={e => updateItem(item.id, 'css_classes', e.target.value)}
                                placeholder="extra-class another-class"
                                className={inputCls}
                            />
                        </Field>

                        <Field label="Visibility">
                            <select
                                value={item.visibility || 'everyone'}
                                onChange={e => updateItem(item.id, 'visibility', e.target.value)}
                                className={inputCls}
                            >
                                {VISIBILITY_OPTIONS.map(v => (
                                    <option key={v.value} value={v.value}>{v.label}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Rel Attribute">
                            <input
                                type="text"
                                value={item.rel || ''}
                                onChange={e => updateItem(item.id, 'rel', e.target.value)}
                                placeholder="noopener noreferrer"
                                className={inputCls}
                            />
                        </Field>
                    </div>

                    <div className="flex gap-4 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={!!item.status}
                                onChange={e => updateItem(item.id, 'status', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            Active
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={!!item.mega_menu_enabled}
                                onChange={e => updateItem(item.id, 'mega_menu_enabled', e.target.checked)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            Mega Menu
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
}
