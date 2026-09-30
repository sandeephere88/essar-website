import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';

export default function Gallery({ galleries }) {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <AppLayout>
            <SeoHead title="Gallery - Our Occasions & Events" />

            <section className="bg-brand-background pt-32 pb-16 relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-brand-primary font-bold tracking-wider uppercase text-xs block mb-2 font-sans">Our Moments</span>
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-accent mb-6">Gallery</h1>
                    <p className="text-brand-accent/70 max-w-2xl mx-auto">
                        Explore moments from our various events, medical camps, and milestones.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-white border-t border-brand-secondary/20 min-h-[500px]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {galleries.length === 0 ? (
                        <div className="text-center py-24 bg-[#FAF6EE] rounded-[2rem] border border-brand-secondary/35">
                            <h3 className="text-xl font-serif font-bold text-brand-accent mb-2">No galleries available yet</h3>
                            <p className="text-sm text-brand-accent/60">Check back later for new photos and events.</p>
                        </div>
                    ) : (
                        <div className="space-y-24">
                            {galleries.map((gallery) => (
                                <div key={gallery.id} className="space-y-8">
                                    <div className="border-b border-brand-secondary/30 pb-4">
                                        <h2 className="text-3xl font-serif font-bold text-brand-accent">{gallery.title}</h2>
                                        <div className="flex items-center gap-4 mt-2">
                                            {gallery.date && (
                                                <span className="text-sm font-bold text-brand-accent/50">{gallery.date}</span>
                                            )}
                                        </div>
                                        {gallery.description && (
                                            <p className="text-brand-accent/70 mt-4 max-w-3xl font-sans text-sm leading-relaxed">
                                                {gallery.description}
                                            </p>
                                        )}
                                    </div>

                                    {gallery.images && gallery.images.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {gallery.images.map((image) => (
                                                <div 
                                                    key={image.id} 
                                                    className="aspect-[4/3] rounded-xl overflow-hidden bg-brand-secondary/10 cursor-pointer group relative shadow-sm border border-brand-secondary/20"
                                                    onClick={() => setSelectedImage(image)}
                                                >
                                                    <img 
                                                        src={image.thumb || image.url} 
                                                        alt={image.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/20 transition duration-300 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition duration-300 transform scale-50 group-hover:scale-100" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-brand-accent/50 italic">No images in this gallery.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img 
                        src={selectedImage.url} 
                        alt={selectedImage.name}
                        className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </AppLayout>
    );
}
