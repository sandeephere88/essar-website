import React, { useState, useEffect, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { PlusCircle, Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

// CSRF is injected via props from the blade page

// Normalize id to always be a string for dnd-kit consistency
const toStringId = (id) => String(id);

function MenuBuilderApp({ menuId, menuName, apiUrl, csrfToken }) {
    const API = apiUrl || `/api/admin/menus/${menuId}/builder`;
    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken || document.querySelector('meta[name="csrf-token"]')?.content || '',
        'Content-Type': 'application/json',
    };

    const [items, setItems] = useState([]);
    const [deletedIds, setDeletedIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null); // { type: 'success'|'error', message }
    const [error, setError] = useState(null);

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    // Flatten nested tree from API into a flat list for the builder
    const flattenTree = useCallback((nodes, parentId = null) => {
        let result = [];
        (nodes || []).forEach(node => {
            const { children, ...rest } = node;
            const flat = { ...rest, parent_id: parentId };
            // Ensure id is always a string
            flat.id = toStringId(flat.id);
            flat.parent_id = parentId ? toStringId(parentId) : null;
            result.push(flat);
            if (children && children.length > 0) {
                result = result.concat(flattenTree(children, flat.id));
            }
        });
        return result;
    }, []);

    useEffect(() => {
        if (!menuId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        axios.get(API, { headers })
            .then(res => {
                const flatItems = flattenTree(res.data.items || []);
                setItems(flatItems);
            })
            .catch(err => {
                console.error('Builder load error:', err);
                setError('Failed to load menu items. ' + (err.response?.data?.message || err.message));
            })
            .finally(() => setLoading(false));
    }, [menuId, API, flattenTree]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }, // prevent accidental drags on clicks
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        // Guard: over can be null when dropped outside
        if (!over || active.id === over.id) return;

        setItems(prev => {
            const oldIndex = prev.findIndex(i => toStringId(i.id) === toStringId(active.id));
            const newIndex = prev.findIndex(i => toStringId(i.id) === toStringId(over.id));
            if (oldIndex === -1 || newIndex === -1) return prev;
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    const addItem = () => {
        const newId = 'temp_' + Date.now();
        const newItem = {
            id: newId,
            title: 'New Menu Item',
            navigation_label: '',
            url: '/',
            item_type: 'custom_url',
            target: '_self',
            icon: '',
            css_classes: '',
            visibility: 'everyone',
            status: true,
            mega_menu_enabled: false,
            parent_id: null,
            isNew: true,
        };
        setItems(prev => [...prev, newItem]);
    };

    const updateItem = useCallback((id, field, value) => {
        setItems(prev =>
            prev.map(item => toStringId(item.id) === toStringId(id) ? { ...item, [field]: value } : item)
        );
    }, []);

    const deleteItem = useCallback((id) => {
        const strId = toStringId(id);
        if (!strId.startsWith('temp_')) {
            setDeletedIds(prev => [...prev, id]);
        }
        // Also remove all children of the deleted item
        setItems(prev => prev.filter(item =>
            toStringId(item.id) !== strId && toStringId(item.parent_id) !== strId
        ));
    }, []);

    const duplicateItem = useCallback((id) => {
        const strId = toStringId(id);
        const source = items.find(i => toStringId(i.id) === strId);
        if (!source) return;
        const newId = 'temp_' + Date.now();
        setItems(prev => {
            const idx = prev.findIndex(i => toStringId(i.id) === strId);
            const copy = { ...source, id: newId, title: source.title + ' (Copy)', isNew: true };
            const next = [...prev];
            next.splice(idx + 1, 0, copy);
            return next;
        });
    }, [items]);

    const saveMenu = () => {
        setSaving(true);

        const payload = items.map((item, index) => ({ ...item, sort_order: index }));

        axios.post(API, { items: payload, deleted_ids: deletedIds }, { headers })
            .then(() => {
                showToast('success', 'Menu saved successfully!');
                setDeletedIds([]);
                return axios.get(API, { headers });
            })
            .then(res => {
                if (res?.data?.items) setItems(flattenTree(res.data.items));
            })
            .catch(err => {
                console.error('Save error:', err);
                showToast('error', 'Failed to save. ' + (err.response?.data?.message || err.message));
            })
            .finally(() => setSaving(false));
    };

    // ── Render ────────────────────────────────────────────────────────────────

    if (!menuId) {
        return (
            <div className="p-6 text-center text-gray-500">
                No menu ID found. Please save the menu record first.
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center gap-3 text-gray-500">
                <Loader2 className="animate-spin" size={20} />
                Loading menu items...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <strong>Error:</strong> {error}
            </div>
        );
    }

    const sortableIds = items.map(i => toStringId(i.id));

    return (
        <div className="relative">
            {/* Toast notification */}
            {toast && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white transition-all ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                    {toast.message}
                </div>
            )}

            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Menu Builder</h2>
                        <p className="text-sm text-gray-500 mt-1">Drag rows to reorder. Click ▸ to expand and edit each item.</p>
                    </div>
                    <div className="flex items-center gap-3" style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={addItem}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: '8px', fontSize: '14px', fontWeight: 500 }}
                        >
                            <PlusCircle size={16} />
                            Add Item
                        </button>
                        <button
                            onClick={saveMenu}
                            disabled={saving}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#0d7a8a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
                        >
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {saving ? 'Saving…' : 'Save Menu'}
                        </button>
                    </div>
                </div>

                {/* Builder list */}
                <div className="max-w-3xl">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={sortableIds}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-2">
                                {items.map(item => (
                                    <SortableItem
                                        key={toStringId(item.id)}
                                        item={{ ...item, id: toStringId(item.id) }}
                                        allItems={items.map(i => ({ ...i, id: toStringId(i.id) }))}
                                        updateItem={updateItem}
                                        deleteItem={deleteItem}
                                        duplicateItem={duplicateItem}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>

                    {items.length === 0 && (
                        <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                            <PlusCircle size={36} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500 font-medium">No items yet</p>
                            <p className="text-gray-400 text-sm mt-1">Click <strong>Add Item</strong> to start building your menu.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Error boundary to catch unexpected React crashes
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <strong>Builder Error:</strong> {this.state.error?.message || 'Unknown error'}
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="ml-4 underline text-sm"
                    >
                        Retry
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function MenuBuilderWithBoundary(props) {
    return (
        <ErrorBoundary>
            <MenuBuilderApp {...props} />
        </ErrorBoundary>
    );
}
