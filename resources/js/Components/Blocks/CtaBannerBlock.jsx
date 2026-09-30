import React from 'react';
import { Link } from '@inertiajs/react';
import { storageUrl } from '@/Utils/asset';

export default function CtaBannerBlock({ data }) {
    if (!data) return null;
    const bgStyle = data.use_background_color 
        ? { backgroundColor: data.background_color || '#1B3A6B' } 
        : { backgroundImage: `url(${storageUrl(data.background_image)})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    
    const desc = data.subheading || data.description;

    return (
        <section className="py-12 sm:py-20 text-center relative overflow-hidden bg-[#1B3A6B]" style={bgStyle}>
            {!data.use_background_color && data.background_image && <div className="absolute inset-0 bg-slate-900/70" />}
            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
                {data.heading && <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-4 leading-tight">{data.heading}</h2>}
                {desc && (
                    <p className="text-sm sm:text-base text-white/80 mb-6 font-medium leading-relaxed whitespace-pre-line max-w-2xl mx-auto">
                        {desc}
                    </p>
                )}
                {data.button_text && (
                    <Link href={data.button_link || '#'} className="inline-block bg-white text-[#1B3A6B] hover:bg-slate-100 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition shadow-lg text-xs sm:text-sm">
                        {data.button_text}
                    </Link>
                )}
            </div>
        </section>
    );
}
