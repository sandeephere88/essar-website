import React from 'react';
import { storageUrl } from '@/Utils/asset';

export default function ImageTextBlock({ data, bgStyle }) {
    if (!data) return null;
    const isRight = data.image_position === 'right';
    return (
        <section className={`py-10 sm:py-16 lg:py-20 ${!bgStyle ? 'bg-white' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${isRight ? 'lg:flex-row-reverse' : ''}`}>
                    <div className="lg:w-1/2 w-full">
                        {data.image && (
                            <img src={storageUrl(data.image)} alt={data.heading || 'Image'} className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-xl object-cover" />
                        )}
                    </div>
                    <div className="lg:w-1/2 w-full space-y-4">
                        {data.heading && (
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900">{data.heading}</h2>
                        )}
                        {data.text && (
                            <article className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-600">
                                <div dangerouslySetInnerHTML={{ __html: data.text }} />
                            </article>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
