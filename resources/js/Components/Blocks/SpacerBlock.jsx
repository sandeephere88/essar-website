import React from 'react';

export default function SpacerBlock({ data }) {
    const sizes = { sm: 'h-8', md: 'h-16', lg: 'h-32' };
    return <div className={`w-full ${sizes[data.height] || 'h-16'}`} />;
}
