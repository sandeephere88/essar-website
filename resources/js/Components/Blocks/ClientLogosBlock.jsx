import React from 'react';
import { storageUrl } from '@/Utils/asset';

export default function ClientLogosBlock({ data, bgStyle }) {
    const clients = data?.hydrated_clients || [];
    
    // Fallback if data comes directly from custom inline items without hydration
    const clientList = clients.length > 0 
        ? clients 
        : (data?.custom_clients || []).map(c => ({
            name: c.name,
            logo_url: c.logo ? storageUrl(c.logo) : null,
            website: c.website,
        }));

    if (!clientList || clientList.length === 0) return null;

    const headingBefore = data?.heading_before || "Our Valued";
    const headingAccent = data?.heading_accent || "Clients";
    const description = data?.description || "Trusted by leading agricultural and industrial processing organizations.";

    return (
        <section className={`py-12 sm:py-16 border-y border-slate-100 ${!bgStyle ? 'bg-slate-50/70' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                {(headingBefore || headingAccent || description) && (
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                        {(headingBefore || headingAccent) && (
                            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#052b4d] tracking-tight">
                                {headingBefore}{headingAccent ? <> <span className="text-[#00897b] italic font-serif">{headingAccent}</span></> : ''}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Clients Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 sm:gap-6 items-stretch justify-center">
                    {clientList.map((client, idx) => {
                        const logoSrc = client.logo_url ? client.logo_url : (client.logo ? storageUrl(client.logo) : null);
                        const CardContent = (
                            <div className="h-full bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs hover:shadow-md hover:border-[#00897b]/40 transition-all duration-300 group">
                                {logoSrc ? (
                                    <img 
                                        src={logoSrc} 
                                        alt={client.name || 'Client Logo'} 
                                        className="h-12 sm:h-16 w-auto max-w-[130px] object-contain mb-3 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500 transition-colors mb-3">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0l-3 3m3-3l3 3" />
                                        </svg>
                                    </div>
                                )}
                                {client.name && (
                                    <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#052b4d] transition-colors line-clamp-1">
                                        {client.name}
                                    </span>
                                )}
                            </div>
                        );

                        if (client.website) {
                            return (
                                <a 
                                    key={idx} 
                                    href={client.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="block h-full"
                                    title={`Visit ${client.name}`}
                                >
                                    {CardContent}
                                </a>
                            );
                        }

                        return (
                            <div key={idx} className="h-full">
                                {CardContent}
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
