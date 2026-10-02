import React, { useState } from 'react';

export default function GalleryBlockComponent({ data, bgStyle }) {
    const gallery = data?.hydrated_gallery;
    const [selectedImage, setSelectedImage] = useState(null);

    if (!gallery || !gallery.images || gallery.images.length === 0) {
        return null;
    }

    const heading = data?.heading || gallery.title;
    const description = data?.description || gallery.description;

    return (
        <section className={`py-14 sm:py-20 ${!bgStyle ? 'bg-[#F8FAFC]' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {(heading || description) && (
                    <div className="text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
                        {heading && (
                            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2245] leading-tight mb-3">
                                {heading}
                            </h2>
                        )}
                        {description && (
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {gallery.images.map((img, idx) => (
                        <div
                            key={img.id || idx}
                            onClick={() => setSelectedImage(img)}
                            className="group relative bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-square cursor-pointer border border-slate-200/80"
                        >
                            <img
                                src={img.thumb || img.url}
                                alt={img.name || 'Gallery Image'}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-xs font-semibold text-white truncate">
                                    {img.name || 'View Image'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage.url || selectedImage.thumb}
                            alt={selectedImage.name || 'Enlarged Image'}
                            className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
                        />
                        {selectedImage.name && (
                            <p className="mt-4 text-center text-white/90 text-sm font-medium">
                                {selectedImage.name}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
