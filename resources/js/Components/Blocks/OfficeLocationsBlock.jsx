import React from 'react';

export default function OfficeLocationsBlock({ data }) {
    const hasHeading = data?.heading_before !== undefined || data?.heading_accent !== undefined;
    const headingBefore = hasHeading ? (data?.heading_before || "") : "Our Global";
    const headingAccent = hasHeading ? (data?.heading_accent || "") : "Locations";
    const description = data?.description !== undefined ? data?.description : "Find us or get in touch with our office locations across the globe.";
    const locations = data?.locations || [];

    if (!locations || locations.length === 0) return null;

    return (
        <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                {(headingBefore || headingAccent || description) && (
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                        {(headingBefore || headingAccent) && (
                            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#052b4d] tracking-tight">
                                {headingBefore}{headingAccent ? <> <span className="text-[#00897b] italic font-serif">{headingAccent}</span></> : ''}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                    {locations.map((loc, idx) => {
                        return (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-[#00897b]/40 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Title */}
                                    <div className="mb-3 pb-3 border-b border-slate-100">
                                        <h3 className="text-sm sm:text-base font-bold text-[#052b4d] group-hover:text-[#00897b] transition-colors">
                                            {loc.title}
                                        </h3>
                                    </div>

                                    {/* Details List */}
                                    <div className="space-y-2.5 text-xs text-slate-600">
                                        {/* Address */}
                                        {loc.address && (
                                            <div className="flex items-start gap-2.5">
                                                <svg className="w-4 h-4 text-[#00897b] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="leading-relaxed font-medium">{loc.address}</span>
                                            </div>
                                        )}

                                        {/* Phone */}
                                        {loc.phone && (
                                            <div className="flex items-center gap-2.5">
                                                <svg className="w-4 h-4 text-[#00897b] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <a
                                                    href={`tel:${loc.phone.replace(/[^0-9+]/g, '')}`}
                                                    className="font-semibold text-slate-800 hover:text-[#00897b] transition-colors"
                                                >
                                                    {loc.phone}
                                                </a>
                                            </div>
                                        )}

                                        {/* Email */}
                                        {loc.email && (
                                            <div className="flex items-center gap-2.5">
                                                <svg className="w-4 h-4 text-[#00897b] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <a
                                                    href={`mailto:${loc.email}`}
                                                    className="font-semibold text-slate-800 hover:text-[#00897b] transition-colors truncate"
                                                >
                                                    {loc.email}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
