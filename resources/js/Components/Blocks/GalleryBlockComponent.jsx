import React from 'react';

export default function GalleryBlockComponent({ data, bgStyle }) {
    const gallery = data.hydrated_gallery;
    if (!gallery) return null;

    const heading = data?.heading || gallery.title;
    const description = data?.description || gallery.description;

    return (
        <section className={`py-12 sm:py-20 ${!bgStyle ? 'bg-white' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {(heading || description) && (
                    <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto space-y-3">
                        {heading && <h2 className="text-2xl sm:text-4xl font-serif font-bold text-brand-accent">{heading}</h2>}
                        {description && <p className="text-xs sm:text-sm text-slate-600 font-medium whitespace-pre-line">{description}</p>}
                    </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.images?.map(img => (
                        <img key={img.id} src={img.thumb || img.url} alt={img.name} className="w-full aspect-square object-cover rounded-xl shadow-sm hover:opacity-90 transition cursor-pointer" />
                    ))}
                </div>
            </div>
        </section>
    );
}
