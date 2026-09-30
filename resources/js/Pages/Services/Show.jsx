import { Link, Head, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import BlockRenderer from '@/Components/Blocks/BlockRenderer';
import ProductCard from '@/Components/ProductCard';
import { storageUrl } from '@/Utils/asset';

export default function Show({ service, relatedServices = [], seoMeta }) {
    const hasBlocks = service.blocks && Array.isArray(service.blocks) && service.blocks.length > 0;

    const imgSrc = service.image
        ? (service.image.startsWith('http') ? service.image : storageUrl(service.image))
        : null;

    const gallery = Array.isArray(service.gallery) ? service.gallery : [];
    const specs    = Array.isArray(service.specifications) ? service.specifications : [];
    const features = Array.isArray(service.features) ? service.features : [];
    const pricing  = Array.isArray(service.pricing) ? service.pricing : [];

    const productSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        'name': service.title,
        'image': imgSrc ? [imgSrc] : [],
        'description': service.short_description || service.title,
        'brand': {
            '@type': 'Brand',
            'name': 'Essar Techins'
        },
        'offers': {
            '@type': 'Offer',
            'priceCurrency': 'INR',
            'price': service.price ? service.price.replace(/[^0-9]/g, '') : '0',
            'availability': 'https://schema.org/InStock',
            'seller': {
                '@type': 'Organization',
                'name': 'Essar Techins'
            }
        }
    };

    return (
        <AppLayout>
            <Head>
                <script type="application/ld+json">
                    {JSON.stringify(productSchema)}
                </script>
            </Head>

            <SeoHead
                seoMeta={seoMeta}
                title={`${service.title} — Essar Techins`}
                description={service.short_description || service.title}
            />

            {/* ── PRODUCT HERO ─────────────────────────────────────────── */}
            <div className="bg-[#0D2245] text-white">
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-1.5 text-[12px] text-white/50 mb-6 flex-wrap">
                        <Link href={route('home')} className="hover:text-amber-400 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href={route('services.index')} className="hover:text-amber-400 transition-colors">Products</Link>
                        {service.category && (
                            <>
                                <span>/</span>
                                <Link href={route('categories.show', service.category.slug)} className="hover:text-amber-400 transition-colors">
                                    {service.category.name}
                                </Link>
                            </>
                        )}
                        <span>/</span>
                        <span className="text-amber-400 font-semibold truncate max-w-[200px]">{service.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                        {/* Left: Product Image */}
                        <div className="relative">
                            <div className="rounded-2xl overflow-hidden bg-[#091831] border border-white/10 aspect-[4/3]">
                                {imgSrc ? (
                                    <img src={imgSrc} alt={service.title}
                                        className="w-full h-full object-contain p-4" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-24 h-24 text-white/10" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            {service.is_featured && (
                                <span className="absolute top-4 left-4 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-lg">
                                    ★ Featured
                                </span>
                            )}

                            {/* Gallery thumbnails */}
                            {gallery.length > 0 && (
                                <div className="mt-3 grid grid-cols-5 gap-2">
                                    {gallery.slice(0, 5).map((img, i) => (
                                        <div key={i} className="rounded-xl overflow-hidden aspect-square bg-[#091831] border border-white/10">
                                            <img src={storageUrl(img)} alt={`${service.title} ${i + 2}`}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right: Product Details */}
                        <div className="flex flex-col gap-5">
                            {service.category && (
                                <Link href={route('categories.show', service.category.slug)}
                                    className="inline-flex items-center gap-1.5 self-start bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full hover:bg-amber-500/30 transition-colors">
                                    {service.category.name}
                                </Link>
                            )}

                            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-white leading-tight">
                                {service.title}
                            </h1>

                            {service.short_description && (
                                <p className="text-[15px] text-white/70 leading-relaxed">
                                    {service.short_description}
                                </p>
                            )}

                            {/* Pricing */}
                            {(service.price || service.price_unit || service.min_order_qty) && (
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-wrap gap-6">
                                    {service.price && (
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Price</p>
                                            <p className="text-2xl font-black text-amber-400">{service.price}</p>
                                            {service.price_unit && <p className="text-[12px] text-white/50">per {service.price_unit}</p>}
                                        </div>
                                    )}
                                    {service.min_order_qty && (
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Min. Order</p>
                                            <p className="text-xl font-black text-white">{service.min_order_qty}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Key Features pills */}
                            {features.length > 0 && (
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-3">Key Features</p>
                                    <div className="flex flex-wrap gap-2">
                                        {features.map((f, i) => (
                                            <span key={i} className="inline-flex items-center gap-1.5 bg-white/8 border border-white/10 text-white/80 text-[12.5px] font-semibold px-3 py-1.5 rounded-full">
                                                {f.icon && <span>{f.icon}</span>}
                                                {f.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <Link href={route('contact')}
                                    className="flex-1 text-center bg-amber-500 hover:bg-amber-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] text-[14px]">
                                    📩 Get a Quote
                                </Link>
                                <a href={`tel:${''}`}
                                    className="flex-1 text-center border-2 border-white/20 hover:border-white/40 text-white font-bold py-4 rounded-xl transition-all text-[14px] hover:bg-white/5">
                                    📞 Call Us Now
                                </a>
                            </div>

                            {/* Trust signals */}
                            <div className="flex flex-wrap gap-3 pt-1">
                                {['GST Verified', 'Made in India', 'Warranty Included', 'Free Installation Guidance'].map(t => (
                                    <span key={t} className="text-[10.5px] font-bold text-white/50 flex items-center gap-1">
                                        <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SPECS + DESCRIPTION ───────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Description blocks */}
                        {hasBlocks && (
                            <div className="prose prose-slate max-w-none">
                                <BlockRenderer blocks={service.blocks} />
                            </div>
                        )}

                        {/* Feature Details */}
                        {features.length > 0 && (
                            <div>
                                <h2 className="text-xl font-black text-[#0D2245] mb-5 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-amber-500 rounded-full inline-block" />
                                    Product Features
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {features.map((f, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-[#F8FAFC] rounded-xl border border-slate-200 p-4">
                                            <div className="w-9 h-9 rounded-xl bg-[#0D2245]/8 border border-[#0D2245]/10 flex items-center justify-center text-xl shrink-0">
                                                {f.icon || '✅'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[13.5px] text-slate-900">{f.title}</p>
                                                {f.description && <p className="text-[12px] text-slate-500 mt-0.5 leading-relaxed">{f.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Package Pricing */}
                        {pricing.length > 0 && (
                            <div>
                                <h2 className="text-xl font-black text-[#0D2245] mb-5 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-amber-500 rounded-full inline-block" />
                                    Package Pricing
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {pricing.map((p, i) => (
                                        <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
                                            <p className="font-black text-[#0D2245] text-[15px] mb-1">{p.package_name}</p>
                                            <p className="text-2xl font-black text-amber-500 my-2">{p.price}</p>
                                            {p.period && <p className="text-[12px] text-slate-400 font-medium">{p.period}</p>}
                                            {p.features_list && (
                                                <ul className="mt-3 text-left space-y-1.5">
                                                    {p.features_list.split('\n').filter(Boolean).map((line, j) => (
                                                        <li key={j} className="text-[12px] text-slate-600 flex items-start gap-1.5">
                                                            <svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                            {line}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Specs + CTA */}
                    <div className="space-y-6">

                        {/* Technical Specifications */}
                        {specs.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="bg-[#0D2245] px-5 py-4">
                                    <h3 className="font-bold text-white text-[14px] flex items-center gap-2">
                                        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                        Technical Specifications
                                    </h3>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {specs.map((spec, i) => (
                                        <div key={i} className="flex items-center px-5 py-3 gap-3">
                                            <span className="text-[12px] font-semibold text-slate-500 w-[45%] shrink-0">{spec.label}</span>
                                            <span className="text-[13px] font-bold text-slate-900 flex-1">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Get a Quote CTA */}
                        <div className="bg-gradient-to-br from-[#0D2245] to-[#1a3a6c] rounded-2xl p-6 text-white text-center">
                            <div className="text-3xl mb-3">📩</div>
                            <h3 className="font-black text-[15px] mb-2">Request a Quote</h3>
                            <p className="text-[12.5px] text-white/65 mb-5 leading-relaxed">
                                Get a detailed quotation for <strong className="text-white">{service.title}</strong> with delivery and installation terms.
                            </p>
                            <Link href={`${route('contact')}?product=${encodeURIComponent(service.title)}`}
                                className="block w-full bg-amber-500 hover:bg-amber-400 text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] text-[13.5px]">
                                Get a Free Quote
                            </Link>
                            <Link href={route('services.index')}
                                className="block mt-2 w-full text-center text-[12px] text-white/50 hover:text-white transition-colors py-1.5">
                                ← Back to All Products
                            </Link>
                        </div>

                        {/* Category Link */}
                        {service.category && (
                            <Link href={route('categories.show', service.category.slug)}
                                className="flex items-center gap-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 hover:border-[#0D2245] hover:shadow-md transition-all group">
                                <span className="text-2xl">{service.category.icon || '⚙️'}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">Browse Category</p>
                                    <p className="text-[13.5px] font-bold text-[#0D2245] group-hover:text-amber-600 transition-colors truncate">{service.category.name}</p>
                                </div>
                                <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* ── RELATED PRODUCTS ─────────────────────────────────────── */}
            {relatedServices.length > 0 && (
                <section className="py-14 sm:py-20 bg-[#F8FAFC] border-t border-slate-200">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-[#0D2245]">
                                Related <span className="text-amber-500">Products</span>
                            </h2>
                            <Link href={route('services.index')}
                                className="text-[13px] font-bold text-[#0D2245] hover:text-amber-600 transition-colors flex items-center gap-1">
                                View All Products
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {relatedServices.slice(0, 4).map(p => (
                                <ProductCard key={p.id} product={p} compact />
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </AppLayout>
    );
}
