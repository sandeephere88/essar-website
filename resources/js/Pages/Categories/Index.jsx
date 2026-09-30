import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import PageHero from '@/Components/PageHero';
import { storageUrl } from '@/Utils/asset';

export default function Index({ categories = [], domainTerms = {} }) {
    const { domainConfig } = usePage().props;
    const terms = domainTerms?.categoryPlural ? domainTerms : (domainConfig || {});

    const categoryPlural = terms.categoryPlural || 'Product Categories';
    const servicePlural = terms.servicePlural || 'Products';

    const [searchQuery, setSearchQuery] = useState('');

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <AppLayout>
            <SeoHead
                title={categoryPlural}
                description="Explore our range of industrial machinery categories, including Copra Dryers, Oil Processing Plants, Expellers, Filter Presses, and Industrial Boilers."
            />

            {/* Page Hero Header */}
            <PageHero
                badge="Product Portfolio"
                title={categoryPlural}
                subtitle="Explore our comprehensive range of heavy-duty industrial machinery, processing plants, and custom equipment tailored for agricultural and industrial production."
                breadcrumbs={[{ label: 'Home', href: '/' }, { label: categoryPlural }]}
            />

            <section className="py-12 sm:py-16 bg-slate-50 min-h-[60vh]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Search & Counter Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                        <div className="text-sm font-semibold text-slate-700">
                            Showing <span className="font-bold text-[#0D2245]">{filteredCategories.length}</span> of {categories.length} {categoryPlural}
                        </div>

                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search category name or description..."
                                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-[#0D2245] focus:ring-1 focus:ring-[#0D2245] outline-none transition-all"
                            />
                            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Grid */}
                    {filteredCategories.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
                            <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3 text-amber-500">
                                🔍
                            </div>
                            <h3 className="text-base font-bold text-slate-800 mb-1">No Categories Found</h3>
                            <p className="text-xs text-slate-500 mb-4">No product category matches your search "{searchQuery}".</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-xs font-bold text-white bg-[#0D2245] px-4 py-2 rounded-xl"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCategories.map((cat) => {
                                const catImage = cat.image_url
                                    ? (cat.image_url.startsWith('http') ? cat.image_url : storageUrl(cat.image_url))
                                    : null;

                                return (
                                    <Link
                                        key={cat.id}
                                        href={route('categories.show', cat.slug)}
                                        className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                                    >
                                        {/* Card Top: Image / Banner */}
                                        <div className="relative h-44 bg-slate-100 overflow-hidden">
                                            {catImage ? (
                                                <img
                                                    src={catImage}
                                                    alt={cat.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#0D2245] via-[#163366] to-[#0A192F] flex items-center justify-center p-6 text-center">
                                                    <div>
                                                        <span className="text-4xl block mb-1 opacity-90">{cat.icon || '🏭'}</span>
                                                        <span className="text-xs font-bold tracking-widest text-amber-400/80 uppercase">
                                                            Industrial Category
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Products Badge */}
                                            <span className="absolute top-3 right-3 bg-[#0D2245]/90 text-amber-400 border border-amber-400/30 text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
                                                {cat.services_count || 0} {servicePlural}
                                            </span>
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {cat.icon && (
                                                        <span className="text-xl leading-none">{cat.icon}</span>
                                                    )}
                                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0D2245] transition-colors leading-snug">
                                                        {cat.name}
                                                    </h3>
                                                </div>

                                                {cat.description && (
                                                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 leading-relaxed mb-4">
                                                        {cat.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Footer Link */}
                                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                                                <span className="text-xs font-bold text-[#0D2245] group-hover:text-amber-600 transition-colors">
                                                    View All Products
                                                </span>
                                                <span className="w-8 h-8 rounded-full bg-slate-100 text-[#0D2245] group-hover:bg-[#0D2245] group-hover:text-amber-400 transition-all flex items-center justify-center text-xs font-bold">
                                                    →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
