import React from 'react';
import { storageUrl } from '@/Utils/asset';

export default function AccreditationStripBlock({ data, bgStyle }) {
    const accreditations = data?.hydrated_accreditations || [];
    if (!accreditations || accreditations.length === 0) return null;

    const headingBefore = data?.heading_before || data?.heading || "";
    const headingAccent = data?.heading_accent || "";
    const description = data?.description;

    return (
        <section className={`py-10 sm:py-14 border-y border-slate-200/60 ${!bgStyle ? 'bg-slate-50' : 'bg-transparent'}`} style={bgStyle}>
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
                    {accreditations.map(a => (
                        <div key={a.id} className="text-center p-2">
                            {a.logo ? (
                                <img src={storageUrl(a.logo)} alt={a.title || 'Accreditation'} className="h-12 sm:h-16 mx-auto mb-2 object-contain max-w-[140px]" />
                            ) : (
                                <span className="text-3xl mb-2 block">🌟</span>
                            )}
                            <h4 className="font-bold text-slate-800 text-xs">{a.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
