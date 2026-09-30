import React from 'react';

export default function TestimonialSliderBlock({ data, bgStyle }) {
    const testimonials = data.hydrated_testimonials || [];
    if (!testimonials.length) return null;

    const headingBefore = data?.heading_before || data?.heading || "";
    const headingAccent = data?.heading_accent || "";
    const description = data?.description;

    return (
        <section className={`py-16 sm:py-20 text-white relative ${!bgStyle ? 'bg-[#052b4d]' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                {(headingBefore || headingAccent || description) && (
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
                        {(headingBefore || headingAccent) && (
                            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-white tracking-tight">
                                {headingBefore}{headingAccent ? <> <span className="text-[#00897b] italic font-serif">{headingAccent}</span></> : ''}
                            </h2>
                        )}
                        {description && (
                            <p className="text-xs sm:text-sm text-slate-300 font-medium whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {testimonials.map(t => (
                        <div key={t.id} className="p-8 border border-white/20 rounded-2xl bg-white/5">
                            <p className="italic mb-6 text-lg leading-relaxed">"{t.content}"</p>
                            <div>
                                <p className="font-bold">{t.author}</p>
                                <p className="text-sm text-brand-secondary">{t.relation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
