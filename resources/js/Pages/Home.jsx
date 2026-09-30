import { useState, useEffect, useRef } from 'react';
import { Link, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import ProductCard from '@/Components/ProductCard';
import { storageUrl } from '@/Utils/asset';

/* ── Tiny helpers ─────────────────────────────────────────────── */
function Badge({ children }) {
    return (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 text-[11px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            {children}
        </span>
    );
}

function SectionHeading({ badge, title, accent, subtitle, center = true }) {
    return (
        <div className={`mb-10 sm:mb-14 ${center ? 'text-center' : ''}`}>
            {badge && <div className={`mb-4 ${center ? 'flex justify-center' : ''}`}><Badge>{badge}</Badge></div>}
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2245] leading-tight">
                {title}{' '}
                {accent && <span className="text-amber-500">{accent}</span>}
            </h2>
            {subtitle && <p className="mt-3 text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed mx-auto">{subtitle}</p>}
        </div>
    );
}

/* ── Hero Slider ──────────────────────────────────────────────── */
function HeroSlider({ banners }) {
    const [active, setActive] = useState(0);
    const timerRef = useRef(null);

    const next = () => setActive(a => (a + 1) % banners.length);
    const prev = () => setActive(a => (a - 1 + banners.length) % banners.length);

    useEffect(() => {
        if (banners.length <= 1) return;
        timerRef.current = setInterval(next, 5500);
        return () => clearInterval(timerRef.current);
    }, [banners.length]);

    const restartTimer = (fn) => {
        clearInterval(timerRef.current);
        fn();
        timerRef.current = setInterval(next, 5500);
    };

    if (!banners?.length) return null;
    const b = banners[active];

    return (
        <section className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] overflow-hidden bg-[#091831]">
            {/* BG Image */}
            <div className="absolute inset-0 z-0 transition-opacity duration-700">
                {b.image_url && (
                    <img src={b.image_url} alt={b.title}
                        className="w-full h-full object-cover object-center"
                        loading="eager" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#091831]/95 via-[#091831]/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091831]/80 via-transparent to-transparent" />
            </div>

            {/* Animated dot grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
                    <div className="max-w-2xl">
                        {/* Pulse tag */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">Industrial Machinery · Aluva, Kerala</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                            {b.title && <span>{b.title} </span>}
                            {b.italic_title && <span className="text-amber-400 italic font-black">{b.italic_title}</span>}
                        </h1>

                        {b.subtitle && (
                            <p className="text-base sm:text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
                                {b.subtitle}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-3">
                            {b.button_one_text && (
                                <Link href={b.button_one_url || '/products'}
                                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.03] text-[14px]">
                                    {b.button_one_text}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Link>
                            )}
                            {b.button_two_text && (
                                <Link href={b.button_two_url || '/contact'}
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-7 py-3.5 rounded-xl backdrop-blur-sm transition-all text-[14px]">
                                    {b.button_two_text}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav Arrows */}
            {banners.length > 1 && (
                <>
                    <button onClick={() => restartTimer(prev)} aria-label="Previous"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button onClick={() => restartTimer(next)} aria-label="Next"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {banners.map((_, i) => (
                            <button key={i} onClick={() => restartTimer(() => setActive(i))} aria-label={`Slide ${i + 1}`}
                                className={`transition-all duration-300 rounded-full ${i === active ? 'w-8 h-2.5 bg-amber-400' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`} />
                        ))}
                    </div>
                </>
            )}

            {/* Stat strip */}
            <div className="absolute bottom-0 inset-x-0 z-10 hidden lg:block">
                <div className="mx-auto max-w-7xl px-8">
                    <div className="flex gap-0 bg-[#0D2245]/90 backdrop-blur-sm rounded-t-2xl border-t border-x border-white/10 overflow-hidden divide-x divide-white/10">
                        {[
                            { val: '24+', label: 'Years Experience' },
                            { val: '500+', label: 'Units Installed' },
                            { val: '7', label: 'Product Categories' },
                            { val: '100%', label: 'GST Verified' },
                        ].map(s => (
                            <div key={s.label} className="flex-1 text-center py-3.5">
                                <p className="text-xl font-black text-amber-400">{s.val}</p>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Main Component ───────────────────────────────────────────── */
export default function Home({ heroBanners = [], categories = [], featuredProducts = [], blogs = [], testimonials = [], accreditations = [] }) {
    const { businessProfile } = usePage().props;
    const profile = businessProfile;

    const orgSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'Essar Techins',
        'telephone': profile?.phone_numbers?.[0]?.number || '+91 98470 00000',
        'email': profile?.email || 'info@essartechins.co.in',
        'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Aluva',
            'addressLocality': 'Ernakulam',
            'addressRegion': 'Kerala',
            'postalCode': '683101',
            'addressCountry': 'IN'
        },
        'priceRange': '₹₹₹',
        'description': 'Leading manufacturer of Copra Dryers, Oil Processing Plants, Expellers, Filter Presses & Industrial Boilers in India.'
    };

    return (
        <AppLayout>
            <Head>
                <script type="application/ld+json">
                    {JSON.stringify(orgSchema)}
                </script>
            </Head>

            <SeoHead title="Essar Techins — Industrial Machinery Manufacturer"
                description="Leading manufacturer of Copra Dryers, Oil Processing Plants, Filter Presses & Industrial Boilers. Based in Aluva, Kerala, India. Est. 2000." />

            {/* ── HERO ─────────────────────────────────────────────── */}
            <HeroSlider banners={heroBanners} />

            {/* ── PRODUCT CATEGORIES ───────────────────────────────── */}
            <section className="py-16 sm:py-24 bg-[#F8FAFC]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        badge="What We Make"
                        title="Our Product"
                        accent="Categories"
                        subtitle="From Copra Dryers to complete Oil Processing Plants — browse our full range of industrial machinery categories."
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                        {categories.map((cat, i) => (
                            <Link key={cat.id} href={`/categories/${cat.slug}`}
                                className="group relative bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 overflow-hidden">
                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-3xl" />
                                <div className="w-12 h-12 rounded-xl bg-[#0D2245]/8 border border-[#0D2245]/10 flex items-center justify-center text-2xl shrink-0">
                                    {cat.icon || '⚙️'}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[14px] sm:text-[15px] text-slate-900 group-hover:text-[#0D2245] transition-colors leading-snug mb-1">
                                        {cat.name}
                                    </h3>
                                    {cat.description && (
                                        <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed">{cat.description}</p>
                                    )}
                                </div>
                                {cat.services_count > 0 && (
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                                        <span className="text-[11px] font-semibold text-slate-400">{cat.services_count} product{cat.services_count !== 1 ? 's' : ''}</span>
                                        <span className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors">
                                            <svg className="w-3 h-3 text-amber-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <Link href={route('categories.index')}
                            className="inline-flex items-center gap-2 border-2 border-[#0D2245] text-[#0D2245] hover:bg-[#0D2245] hover:text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-[14px]">
                            All Categories
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ─────────────────────────────────────── */}
            <section className="py-16 sm:py-20 bg-[#0D2245] text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Badge>Why Choose Us</Badge>
                        <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 leading-tight">
                            Built on <span className="text-amber-400">Trust & Quality</span>
                        </h2>
                        <p className="mt-3 text-white/60 max-w-xl mx-auto text-base">
                            Over two decades of delivering reliable industrial machinery to businesses across India.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                        {[
                            { icon: '🏆', title: 'Premium Quality', desc: 'Heavy-gauge steel construction engineered for 10+ years of service life.' },
                            { icon: '⚡', title: 'On-Time Delivery', desc: 'Committed to delivery timelines with real-time project tracking.' },
                            { icon: '🔧', title: 'Custom Manufacturing', desc: 'Bespoke machines designed to your exact capacity and site requirements.' },
                            { icon: '🛡️', title: 'After-Sales Support', desc: 'Dedicated service team, spare parts stock, and on-site maintenance.' },
                        ].map(item => (
                            <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 group">
                                <div className="text-3xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-white text-[15px] mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                                <p className="text-[13px] text-white/55 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
            {featuredProducts.length > 0 && (
                <section className="py-16 sm:py-24 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            badge="Top Sellers"
                            title="Featured"
                            accent="Products"
                            subtitle="Our most popular industrial machinery — trusted by coconut and oil processing units across India."
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                            {featuredProducts.slice(0, 8).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        <div className="text-center mt-12">
                            <Link href={route('services.index')}
                                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] text-[14px]">
                                View All Products
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── ABOUT STRIP ───────────────────────────────────────── */}
            <section className="py-16 sm:py-20 bg-[#F8FAFC] border-y border-slate-200/60">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left: About Text */}
                        <div>
                            <Badge>About Us</Badge>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2245] mt-4 leading-tight">
                                24+ Years of <span className="text-amber-500">Industrial Excellence</span>
                            </h2>
                            <p className="mt-4 text-slate-600 leading-relaxed text-[15px]">
                                {profile?.custom_attributes?.about_short ||
                                    'Essar Techins is a trusted manufacturer of Copra Dryers, Oil Processing Plants, Filter Presses, and Industrial Boilers based in Aluva, Kerala. With over 24 years of experience, we deliver quality industrial machinery across India.'}
                            </p>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {[
                                    { val: 'Est. 2000', label: 'Founded' },
                                    { val: 'Aluva, Kerala', label: 'Location' },
                                    { val: 'GST Verified', label: 'Certification' },
                                    { val: 'Pan India', label: 'Delivery' },
                                ].map(s => (
                                    <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                                        <p className="font-black text-[#0D2245] text-[15px]">{s.val}</p>
                                        <p className="text-[12px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex gap-3">
                                <Link href={route('about')}
                                    className="inline-flex items-center gap-2 bg-[#0D2245] hover:bg-[#0a1c3d] text-white font-bold px-6 py-3 rounded-xl transition-all text-[13.5px]">
                                    Learn More About Us
                                </Link>
                                <Link href={route('contact')}
                                    className="inline-flex items-center gap-2 border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-bold px-6 py-3 rounded-xl transition-all text-[13.5px]">
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        {/* Right: Stats visual */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { val: '500+', label: 'Machines Delivered', icon: '🏭', color: 'bg-[#0D2245]', text: 'text-white' },
                                { val: '24+', label: 'Years Experience', icon: '📅', color: 'bg-amber-50 border border-amber-200', text: 'text-[#0D2245]' },
                                { val: '100%', label: 'Customer Satisfaction', icon: '⭐', color: 'bg-amber-50 border border-amber-200', text: 'text-[#0D2245]' },
                                { val: 'Pan India', label: 'Delivery Reach', icon: '🚚', color: 'bg-[#0D2245]', text: 'text-white' },
                            ].map((s, i) => (
                                <div key={i} className={`rounded-2xl p-6 flex flex-col gap-2 ${s.color} ${i === 0 ? 'mt-6' : ''} ${i === 3 ? 'mb-6' : ''}`}>
                                    <span className="text-3xl">{s.icon}</span>
                                    <p className={`text-2xl font-black ${s.text.replace('text-white', 'text-amber-400').replace('text-[#0D2245]', 'text-[#0D2245]')} ${s.color.includes('0D2245') ? 'text-amber-400' : 'text-[#0D2245]'}`}>{s.val}</p>
                                    <p className={`text-[12px] font-semibold uppercase tracking-wider ${s.color.includes('0D2245') ? 'text-white/60' : 'text-slate-500'}`}>{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ──────────────────────────────────────── */}
            {testimonials.length > 0 && (
                <section id="testimonials" className="py-16 sm:py-24 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            badge="Customer Reviews"
                            title="What Our"
                            accent="Clients Say"
                            subtitle="Real reviews from businesses across Kerala and South India who rely on Essar Techins machinery every day."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                            {testimonials.slice(0, 6).map((t, i) => (
                                <div key={t.id || i} className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                                    {/* Stars */}
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, j) => (
                                            <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-[13.5px] text-slate-600 leading-relaxed flex-1 italic">"{t.content}"</p>
                                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                                        <div className="w-9 h-9 rounded-full bg-[#0D2245] flex items-center justify-center text-white font-bold text-[13px] shrink-0">
                                            {(t.author || 'A')[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[13px] text-slate-900">{t.author}</p>
                                            {t.relation && <p className="text-[11px] text-slate-500">{t.relation}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CERTIFICATIONS / ACCREDITATIONS ───────────────────── */}
            {accreditations.length > 0 && (
                <section className="py-12 bg-[#F8FAFC] border-y border-slate-200/60">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-8">Certifications & Accreditations</p>
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            {accreditations.map((ac, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-5 py-3 shadow-sm">
                                    {ac.logo && <img src={ac.logo} alt={ac.title} className="h-8 w-auto object-contain" />}
                                    <span className="font-bold text-[13px] text-slate-700">{ac.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── LATEST BLOGS ──────────────────────────────────────── */}
            {blogs?.length > 0 && (
                <section className="py-16 sm:py-24 bg-white">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <SectionHeading
                            badge="Knowledge Hub"
                            title="Latest"
                            accent="Articles"
                            subtitle="Industry insights, maintenance tips, and guides for oil processing and copra machinery."
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {blogs.map(blog => (
                                <Link key={blog.id} href={route('blog.show', blog.slug)}
                                    className="group bg-[#F8FAFC] rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    {blog.image_url && (
                                        <div className="h-44 overflow-hidden">
                                            <img src={blog.image_url} alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    )}
                                    <div className="p-4">
                                        <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider mb-2">{blog.published_at}</p>
                                        <h3 className="font-bold text-[13.5px] text-slate-900 group-hover:text-[#0D2245] transition-colors leading-snug line-clamp-2 mb-2">{blog.title}</h3>
                                        <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed">{blog.snippet}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href={route('blog.index')}
                                className="inline-flex items-center gap-2 border-2 border-[#0D2245] text-[#0D2245] hover:bg-[#0D2245] hover:text-white font-bold px-7 py-3.5 rounded-xl transition-all text-[13.5px]">
                                All Articles
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── CONTACT CTA BANNER ────────────────────────────────── */}
            <section className="relative py-16 sm:py-20 bg-[#0D2245] overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <Badge>Free Consultation</Badge>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-5 mb-4 leading-tight">
                        Ready to Upgrade Your <span className="text-amber-400">Oil Mill?</span>
                    </h2>
                    <p className="text-white/65 text-[15px] mb-8 max-w-xl mx-auto leading-relaxed">
                        Get a free quote and expert consultation from our engineering team. We'll help you find the right machinery for your production needs and budget.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('contact')}
                            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.03] text-[14px]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            Get a Free Quote
                        </Link>
                        <a href={`tel:${profile?.phone_numbers?.[0]?.number?.replace(/\s/g,'') || ''}`}
                            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl transition-all text-[14px]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            Call Us Now
                        </a>
                    </div>
                </div>
            </section>

        </AppLayout>
    );
}
