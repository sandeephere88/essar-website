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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 items-stretch justify-center">
                    {accreditations.map(a => (
                        <div key={a.id} className="h-full bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:border-amber-500/40 hover:-translate-y-0.5 transition-all duration-300 group">
                            {a.logo ? (
                                <div className="h-16 sm:h-20 w-full flex items-center justify-center mb-3">
                                    <img
                                        src={storageUrl(a.logo)}
                                        alt={a.title || 'Accreditation'}
                                        className="max-h-16 sm:max-h-20 w-auto max-w-[140px] sm:max-w-[160px] object-contain group-hover:scale-105 transition-all duration-300"
                                    />
                                </div>
                            ) : (
                                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500 transition-colors mb-3">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            )}
                            <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0D2245] transition-colors line-clamp-1">
                                {a.title}
                            </span>
                            {a.description && (
                                <span className="text-[11px] text-slate-500 mt-1 line-clamp-2 font-medium leading-tight">
                                    {a.description}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
