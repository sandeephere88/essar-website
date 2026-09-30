import React from 'react';
import { createRoot } from 'react-dom/client';
import ColorPicker from 'react-gcolor-picker';

window.mountGradientPicker = (elementId, initialValue, onChange) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    
    if (!el._reactRoot) {
        el._reactRoot = createRoot(el);
    }
    
    el._reactRoot.render(
        <ColorPicker 
            value={initialValue || 'linear-gradient(90deg, #2A7B9B 0%, #57C785 50%, #EDDD53 100%)'} 
            gradient={true}
            solid={false}
            defaultActiveTab="gradient"
            onChange={(color) => {
                if (el.dataset.currentValue !== color) {
                    el.dataset.currentValue = color;
                    onChange(color);
                }
            }} 
        />
    );
};
