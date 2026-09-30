import React from 'react';
import { usePage } from '@inertiajs/react';

export default function GoogleMapBlock({ data }) {
    const { businessProfile } = usePage().props;

    const heading = data?.heading || "Find Us On The Map";
    const description = data?.description;
    const rawMapUrl = data?.map_url || businessProfile?.map_embed_url;
    const defaultAddress = businessProfile?.address || "782 Chester Rd, Erdington, Birmingham B24 0ED, United Kingdom";

    let embedSrc = '';

    if (rawMapUrl) {
        if (rawMapUrl.includes('<iframe')) {
            const match = rawMapUrl.match(/src=["']([^"']+)["']/);
            if (match && match[1]) {
                embedSrc = match[1];
            }
        } else if (rawMapUrl.includes('google.com/maps/embed')) {
            embedSrc = rawMapUrl;
        } else if (rawMapUrl.startsWith('http')) {
            // Converts shortlinks or maps links to query embed
            embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(defaultAddress)}&output=embed`;
        }
    }

    if (!embedSrc) {
        embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(defaultAddress)}&output=embed`;
    }

    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {(heading || description) && (
                    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
                        {heading && (
                            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-[#052b4d] tracking-tight">
                                {heading}
                            </h2>
                        )}
                        {description && (
                            <p className="text-xs sm:text-sm text-slate-600 font-medium whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                    <iframe
                        title="Google Map Location"
                        src={embedSrc}
                        className="w-full h-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

            </div>
        </section>
    );
}
