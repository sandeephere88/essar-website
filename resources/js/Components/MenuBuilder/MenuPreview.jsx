import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MenuPreview({ menuId }) {
    const [tree, setTree] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (menuId) {
            axios.get(`/api/admin/menus/${menuId}/builder`)
                .then(res => {
                    // Tree data needs to be built from flat list for preview, or API can return tree.
                    // The API currently returns a flat list (actually the API was updated to return tree? No, buildFlatTree returns a nested tree because of recursive call, but it's called 'flatTree' in API which is confusing.)
                    // Let's assume it returns a nested tree.
                    setTree(res.data.items);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [menuId]);

    const renderTree = (nodes) => {
        if (!nodes || nodes.length === 0) return null;
        return (
            <ul className="pl-4 space-y-2 mt-2">
                {nodes.map(node => (
                    <li key={node.id}>
                        <a href={node.url} target={node.target} className="text-primary-600 hover:underline">
                            {node.title}
                        </a>
                        {node.children && renderTree(node.children)}
                    </li>
                ))}
            </ul>
        );
    };

    if (loading) return <div>Loading preview...</div>;

    return (
        <div className="bg-white dark:bg-gray-900 p-4 rounded border">
            {tree.length > 0 ? renderTree(tree) : <p className="text-gray-500">Menu is empty.</p>}
        </div>
    );
}
