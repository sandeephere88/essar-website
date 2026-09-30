import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import PageHero from '@/Components/PageHero';
import ProductCard from '@/Components/ProductCard';
import InquiryModal from '@/Components/InquiryModal';

export default function Show({ category, services = [], teamMembers = [], domainTerms = {} }) {
    const { domainConfig } = usePage().props;
    const terms = domainTerms?.categoryLabel ? domainTerms : (domainConfig || {});

    const categoryLabel = terms.categoryLabel || 'Category';
    const categoryPlural = terms.categoryPlural || 'Product Categories';
    const servicePlural = terms.servicePlural || 'Products';

    const [activeInquiryProduct, setActiveInquiryProduct] = useState(null);
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

    const rawFeatures = category.custom_attributes?.features || category.features;
    const features = (Array.isArray(rawFeatures) && rawFeatures.length > 0)
        ? rawFeatures.map(item => typeof item === 'string' ? item : item.feature)
        : [];

    const handleOpenInquiry = (product = null) => {
        setActiveInquiryProduct(product);
        setIsInquiryModalOpen(true);
    };

    return (
        <AppLayout>
            <SeoHead
                title={`${category.name} — ${servicePlural}`}
                description={category.description || `Browse high-performance ${category.name} machinery and industrial equipment from Essar Techins.`}
            />

            {/* Page Hero */}
            <PageHero
                badge={categoryLabel}
                title={category.name}
                subtitle={category.description || `Industrial heavy-duty ${category.name.toLowerCase()} manufactured for efficiency, durability, and commercial productivity.`}
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: categoryPlural, href: route('categories.index') },
                    { label: category.name }
                ]}
            />

            <section className="py-12 sm:py-16 bg-slate-50 min-h-[60vh]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
                    
                    {/* Category Highlights / Features */}
                    {features.length > 0 && (
                        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-lg">
                                    ★
                                </span>
                                <div>
                                    <h2 className="text-xl font-bold text-[#0D2245]">
                                        Category Key Highlights & Features
                                    </h2>
                                    <p className="text-xs text-slate-500">Core capabilities and technical standards across {category.name}</p>
                                </div>
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {features.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 text-slate-700 text-xs sm:text-sm font-medium">
                                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                            ✓
                                        </span>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Product Listing Section */}
                    <div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2245]">
                                    {servicePlural} under {category.name}
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    Showing {services.length} machinery items available in this category
                                </p>
                            </div>

                            <button
                                onClick={() => handleOpenInquiry({ title: `${category.name} (Category Quote)`, slug: category.slug })}
                                className="text-xs sm:text-sm font-bold text-white bg-[#0D2245] hover:bg-[#0a1c3d] px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
                            >
                                <span>Inquire Category Quote</span>
                                <span className="text-amber-400">→</span>
                            </button>
                        </div>

                        {services.length === 0 ? (
                            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                                    📦
                                </div>
                                <h3 className="text-base font-bold text-slate-800 mb-1">No Products Listed Yet</h3>
                                <p className="text-xs text-slate-500 mb-4">We are updating our product catalog for {category.name}. Contact our sales team directly for custom solutions.</p>
                                <Link
                                    href={route('contact')}
                                    className="text-xs font-bold text-white bg-[#0D2245] px-5 py-2.5 rounded-xl inline-block"
                                >
                                    Contact Sales Team
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {services.map((service) => (
                                    <ProductCard key={service.id} product={service} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Contact CTA Banner */}
                    <div className="bg-gradient-to-r from-[#0D2245] via-[#163366] to-[#0A192F] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
                        <div className="relative z-10 max-w-3xl">
                            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2 block">
                                Custom Machinery Engineering
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                                Need custom dimensions or tailored specifications for {category.name}?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                                Essar Techins manufactures machinery configured specifically to your factory dimensions, power constraints, and throughput requirements.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => handleOpenInquiry({ title: `${category.name} (Custom Quote)`, slug: category.slug })}
                                    className="text-xs sm:text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 px-6 py-3 rounded-xl shadow-lg transition-all"
                                >
                                    Request Custom Quote
                                </button>
                                <Link
                                    href={route('contact')}
                                    className="text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl transition-all"
                                >
                                    Talk to Sales Engineer
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Modal */}
            <InquiryModal
                isOpen={isInquiryModalOpen}
                onClose={() => setIsInquiryModalOpen(false)}
                product={activeInquiryProduct}
            />
        </AppLayout>
    );
}
