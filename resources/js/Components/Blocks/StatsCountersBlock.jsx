import React from 'react';

export default function StatsCountersBlock({ data, bgStyle }) {
    const stats = data.stats || [];
    const headingBefore = data?.heading_before || data?.heading || "";
    const headingAccent = data?.heading_accent || "";
    const description = data?.description;

    return (
        <section className={`py-12 sm:py-16 border-y border-brand-secondary/30 ${!bgStyle ? 'bg-white' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {(headingBefore || headingAccent || description) && (
                    <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                        {(headingBefore || headingAccent) && (
                            <h2 className="text-xl sm:text-3xl font-sans font-bold text-[#052b4d] tracking-tight">
                                {headingBefore}{headingAccent ? <> <span className="text-[#00897b] italic font-serif">{headingAccent}</span></> : ''}
                            </h2>
                        )}
                        {description && (
                            <p className="text-xs sm:text-sm text-slate-600 font-medium whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-brand-secondary/40">
                    {stats.map((s, i) => (
                        <div key={i} className="text-center px-4">
                            <div className="text-4xl font-serif font-black text-brand-accent mb-2">{s.number}</div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-accent/70">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
