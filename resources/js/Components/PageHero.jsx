import React from 'react';
import { Link } from '@inertiajs/react';
import { storageUrl } from '@/Utils/asset';

export default function PageHero({
    title = '',
    accentTitle = '',
    subtitle = '',
    breadcrumbs = [],
    image = null,
    ctaText = null,
    ctaLink = '#',
    align = 'left',
    badge = null
}) {
    const isCenter = align === 'center';

    return (
        <section className="relative w-full bg-[#0A1630] text-white overflow-hidden py-10 sm:py-16 lg:py-20">
            {/* Background Image / Overlay */}
            {image ? (
                <div className="absolute inset-0 z-0">
                    <img
                        src={storageUrl(image)}
                        alt={title}
                        className="w-full h-full object-cover object-center opacity-60"
                    />
                    {/* Gradients */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to top, rgba(10,22,48,0.95) 0%, rgba(10,22,48,0.65) 50%, rgba(10,22,48,0.3) 100%)' }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to right, rgba(10,22,48,0.7) 0%, rgba(10,22,48,0.3) 50%, transparent 100%)' }}
                    />
                </div>
            ) : (
                /* Ambient Glow Mesh Fallback when no background image */
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00897B]/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#00897B]/15 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(#00897B_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav className={`flex items-center text-xs sm:text-sm text-white/70 mb-4 sm:mb-6 space-x-2 flex-wrap ${isCenter ? 'justify-center' : ''}`}>
                        <Link href={route('home')} className="hover:text-white transition-colors">
                            Home
                        </Link>
                        {breadcrumbs.map((crumb, idx) => (
                            <React.Fragment key={idx}>
                                <span>/</span>
                                {crumb.link ? (
                                    <Link href={crumb.link} className="hover:text-white transition-colors">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-[#00897B] font-medium">{crumb.label}</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>
                )}

                <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : ''}`}>
                    {/* Badge */}
                    {badge && (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00897B]/20 border border-[#00897B]/40 text-[#00897B] text-xs font-semibold uppercase tracking-wider mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#00897B] animate-pulse" />
                            {badge}
                        </div>
                    )}

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-tight mb-4">
                        {title}
                        {accentTitle && (
                            <span className="text-[#00897B] italic font-normal ml-2 sm:ml-3">
                                {accentTitle}
                            </span>
                        )}
                    </h1>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mb-8 font-sans">
                            {subtitle}
                        </p>
                    )}

                    {/* CTA Button */}
                    {ctaText && (
                        <div>
                            <Link
                                href={ctaLink || '#'}
                                className="inline-flex items-center justify-center bg-[#00897B] hover:bg-[#00796B] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#00897B]/25 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
                            >
                                {ctaText}
                                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Subtle Gradient Bar */}
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#00897B] to-transparent opacity-40" />
        </section>
    );
}
