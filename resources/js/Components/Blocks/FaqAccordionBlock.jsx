import React, { useState } from 'react';

export default function FaqAccordionBlock({ data, bgStyle }) {
    const faqs = data.faqs || [];
    const [open, setOpen] = useState(null);

    const headingBefore = data?.heading_before || data?.title || data?.heading || "";
    const headingAccent = data?.heading_accent || "";
    const description = data?.description || data?.subtitle;

    return (
        <section className={`py-12 sm:py-16 ${!bgStyle ? 'bg-brand-background' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {(headingBefore || headingAccent || description) && (
                    <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
                        {(headingBefore || headingAccent) && (
                            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#052b4d] tracking-tight">
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
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div key={i} className="bg-white border border-brand-secondary/40 rounded-xl overflow-hidden shadow-sm">
                            <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-6 py-4 text-left font-bold text-brand-accent flex justify-between items-center focus:outline-none">
                                {f.question}
                                <span className="text-brand-accent/50">{open === i ? '−' : '+'}</span>
                            </button>
                            {open === i && (
                                <div className="px-6 pb-4 text-brand-accent/80 text-sm leading-relaxed whitespace-pre-wrap border-t border-brand-secondary/20 pt-4">
                                    {f.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
