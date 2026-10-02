import { Link, usePage } from '@inertiajs/react';
import AnnouncementPopup from '@/Components/AnnouncementPopup';
import { useState, useEffect } from 'react';
import { storageUrl } from '@/Utils/asset';

export default function AppLayout({ children }) {
    const { businessProfile, domainConfig, announcement, mainMenu = [], footerMenu = [], footerServicesMenu = [], headerButtons = {} } = usePage().props;
    const profile = businessProfile;

    const defaultNavItems = [
        { label: 'Home',       href: route('home') },
        { label: 'Products',   href: route('services.index') },
        { label: 'Categories', href: route('categories.index') },
        { label: 'About',      href: route('about') },
        { label: 'Blog',       href: route('blog.index') },
        { label: 'Contact',    href: route('contact') },
    ];

    const defaultFooterNavItems = [
        { label: 'Home',            href: route('home') },
        { label: 'Products',        href: route('services.index') },
        { label: 'Product Categories', href: route('categories.index') },
        { label: 'About Us',        href: route('about') },
        { label: 'Gallery',         href: route('gallery.index') },
        { label: 'Contact Us',      href: route('contact') },
    ];

    const navItems         = mainMenu?.length > 0 ? mainMenu : defaultNavItems;
    const footerNavItems   = footerMenu?.length > 0 ? footerMenu : defaultFooterNavItems;
    const footerServicesItems = footerServicesMenu || [];
    const hasFooterServices   = footerServicesItems.length > 0;

    const [mobileOpen, setMobileOpen]       = useState(false);
    const [scrolled, setScrolled]           = useState(false);
    const [logoError, setLogoError]         = useState(false);
    const [footerLogoError, setFooterLogoError] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const phone = profile?.phone_numbers?.[0]?.number || '+91 98470 00000';
    const email = profile?.email ?? 'info@essartechins.co.in';
    const name  = profile?.name || 'Essar Techins';
    const addr  = profile?.address ?? 'Muvattupuzha, Kerala, India';

    return (
        <div className="flex min-h-screen flex-col bg-white text-slate-800 font-sans antialiased overflow-x-hidden">

            {/* ═══ TOP INFO BAR ═══════════════════════════════════════════ */}
            <div className="hidden lg:block bg-[#0D2245] text-white text-[12px]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 h-9 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-5 text-white/80">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" />
                            </svg>
                            Muvattupuzha, Kerala, India — 686661
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {email}
                        </span>
                    </div>
                    <div className="flex items-center gap-5 text-white/80">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {phone}
                        </span>
                        <span className="text-amber-400 font-semibold">GST Verified · Est. 2000</span>
                    </div>
                </div>
            </div>

            {/* ═══ NAVBAR ═════════════════════════════════════════════════ */}
            <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/98 backdrop-blur-lg shadow-md border-b border-slate-100' : 'bg-white border-b border-slate-100 shadow-sm'}`}>
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 h-[64px] sm:h-[72px]">

                    {/* Logo */}
                    <Link href={route('home')} className="flex items-center gap-3 shrink-0 group">
                        {profile?.logo && !logoError ? (
                            <div className="flex items-center gap-3">
                                <img src={storageUrl(profile.logo)} alt={name}
                                    className="h-10 sm:h-11 w-auto object-contain max-w-[180px]"
                                    onError={() => setLogoError(true)} />
                                <div className="leading-tight">
                                    <span className="block text-[16px] sm:text-[17.5px] font-black text-[#0D2245] uppercase tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                                        Essar <span className="text-amber-500">Techins</span>
                                    </span>
                                    <span className="block text-[8.5px] sm:text-[9.5px] text-slate-500 font-bold mt-1 tracking-wider uppercase">
                                        OIL MILL MACHINERIES AND SPARES
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2.5">
                                {/* Gear + ET monogram icon */}
                                <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 relative group-hover:rotate-12 transition-transform duration-300">
                                    <svg viewBox="0 0 44 44" fill="none" className="w-full h-full drop-shadow-sm">
                                        <rect width="44" height="44" rx="10" fill="#0D2245" />
                                        <path d="M22 10a2 2 0 100 4 2 2 0 000-4zm0 20a2 2 0 100 4 2 2 0 000-4zm12-10a2 2 0 100 4 2 2 0 000-4zm-24 0a2 2 0 100 4 2 2 0 000-4z" fill="#F59E0B" opacity="0.8"/>
                                        <circle cx="22" cy="22" r="7" stroke="#F59E0B" strokeWidth="2.5" fill="none"/>
                                        <circle cx="22" cy="22" r="3" fill="#F59E0B"/>
                                        <text x="22" y="26" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif" opacity="0" />
                                    </svg>
                                </div>
                                <div className="leading-tight">
                                    <span className="block text-[15px] sm:text-[16px] font-black text-[#0D2245] uppercase tracking-tight leading-none">
                                        Essar <span className="text-amber-500">Techins</span>
                                    </span>
                                    <span className="block text-[8.5px] sm:text-[9.5px] text-slate-500 font-medium mt-0.5 tracking-wide uppercase">
                                        OIL MILL MACHINERIES AND SPARES
                                    </span>
                                </div>
                            </div>
                        )}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navItems.map(({ label, href, target }) =>
                            target === '_blank' ? (
                                <a key={label} href={href || '#'} target="_blank" rel="noopener noreferrer"
                                    className="px-4 py-2 text-[13.5px] font-semibold text-slate-600 hover:text-[#0D2245] hover:bg-slate-50 rounded-lg transition-all duration-150 whitespace-nowrap">
                                    {label}
                                </a>
                            ) : (
                                <Link key={label} href={href || '#'}
                                    className="px-4 py-2 text-[13.5px] font-semibold text-slate-600 hover:text-[#0D2245] hover:bg-slate-50 rounded-lg transition-all duration-150 whitespace-nowrap">
                                    {label}
                                </Link>
                            )
                        )}
                    </nav>

                    {/* Right CTA */}
                    <div className="hidden lg:flex items-center gap-2.5 shrink-0">
                        <Link href={route('contact')}
                            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/25 transition-all duration-200 hover:scale-[1.03] whitespace-nowrap">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Get a Quote
                        </Link>
                        <a href={`tel:${phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 border-2 border-[#0D2245] text-[#0D2245] text-[13px] font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:bg-[#0D2245] hover:text-white whitespace-nowrap">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Now
                        </a>
                    </div>

                    {/* Mobile Hamburger */}
                    <button className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition focus:outline-none"
                        onClick={() => setMobileOpen(p => !p)} aria-label="Toggle navigation">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            {mobileOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>

                {/* Mobile Drawer */}
                {mobileOpen && (
                    <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 shadow-xl">
                        <ul className="space-y-1 mb-4">
                            {navItems.map(({ label, href, target }) => (
                                <li key={label}>
                                    {target === '_blank' ? (
                                        <a href={href || '#'} target="_blank" rel="noopener noreferrer"
                                            className="block px-4 py-3 text-sm font-semibold text-slate-700 rounded-xl hover:bg-slate-50 hover:text-[#0D2245] transition">
                                            {label}
                                        </a>
                                    ) : (
                                        <Link href={href || '#'} onClick={() => setMobileOpen(false)}
                                            className="block px-4 py-3 text-sm font-semibold text-slate-700 rounded-xl hover:bg-slate-50 hover:text-[#0D2245] transition">
                                            {label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
                            <Link href={route('contact')} onClick={() => setMobileOpen(false)}
                                className="block w-full text-center bg-amber-500 hover:bg-amber-400 text-white py-3 rounded-xl text-sm font-bold shadow transition">
                                Get a Free Quote
                            </Link>
                            <a href={`tel:${phone.replace(/\s/g, '')}`}
                                className="block w-full text-center border-2 border-[#0D2245] text-[#0D2245] py-2.5 rounded-xl text-sm font-bold transition">
                                📞 {phone}
                            </a>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            <AnnouncementPopup announcement={announcement} />

            {/* ═══ FOOTER ═════════════════════════════════════════════════ */}
            <footer className="bg-[#091831] text-white">

                {/* Upper Footer Grid */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <span className="block text-[16px] font-black uppercase tracking-tight text-white">
                                    Essar <span className="text-amber-400">Techins</span>
                                </span>
                                <span className="block text-[9.5px] text-white/50 tracking-widest uppercase font-medium">OIL MILL MACHINERIES AND SPARES</span>
                            </div>
                        </div>
                        <p className="text-[13.5px] text-white/60 leading-relaxed">
                            Trusted manufacturer of Copra Dryers, Oil Processing Plants, Filter Presses, and Industrial Boilers. Based in Muvattupuzha, Kerala — serving India since 2000.
                        </p>
                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            {['GST Verified', 'Est. 2000', 'Made in India'].map(b => (
                                <span key={b} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30 text-amber-400/80 bg-amber-500/10">
                                    {b}
                                </span>
                            ))}
                        </div>
                        {/* Socials */}
                        <div className="flex gap-2.5 pt-1">
                            {profile?.social_links?.facebook && (
                                <a href={profile.social_links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-500 text-white flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.641c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" /></svg>
                                </a>
                            )}
                            {profile?.social_links?.linkedin && (
                                <a href={profile.social_links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-500 text-white flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                            )}
                            {profile?.social_links?.youtube && (
                                <a href={profile.social_links.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-amber-500 text-white flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 lg:pt-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {footerNavItems.map((item, idx) => (
                                <li key={idx}>
                                    <a href={item.href || '#'} target={item.target || '_self'}
                                        className="text-[13px] text-white/60 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors shrink-0" />
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="lg:col-span-3 lg:pt-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-5">Our Products</h4>
                        <ul className="space-y-3">
                            {[
                                ['Copra Dryers',         'copra-dryers'],
                                ['Oil Processing Plants','oil-processing-plants'],
                                ['Oil Expellers',        'oil-expellers'],
                                ['Filter Presses',       'filter-presses'],
                                ['Industrial Boilers',   'industrial-boilers'],
                                ['Copra Cutters',        'copra-cutters'],
                                ['Oil Mill Spare Parts', 'oil-mill-spare-parts'],
                            ].map(([label, slug]) => (
                                <li key={slug}>
                                    <Link href={`/categories/${slug}`}
                                        className="text-[13px] text-white/60 hover:text-amber-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors shrink-0" />
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="lg:col-span-3 lg:pt-1">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-5">Contact Us</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Phone</p>
                                        <p className="text-[13.5px] text-white/80 group-hover:text-amber-400 font-semibold transition-colors">{phone}</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${email}`} className="flex items-start gap-3 group">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Email</p>
                                        <p className="text-[13px] text-white/80 group-hover:text-amber-400 font-semibold transition-colors break-all">{email}</p>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Address</p>
                                    <p className="text-[13px] text-white/70 leading-snug">{addr}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/40">
                        <p>© {new Date().getFullYear()} <span className="text-white/60 font-semibold">{name}</span>. All rights reserved.</p>
                        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-semibold">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                            Back to top
                        </button>
                    </div>
                </div>
            </footer>

        </div>
    );
}
