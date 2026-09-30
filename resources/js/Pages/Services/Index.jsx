import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import PageHero from '@/Components/PageHero';
import ProductCard from '@/Components/ProductCard';

export default function Index({ services, categories, filters = {} }) {
    const { domainConfig } = usePage().props;

    const [search, setSearch] = useState(filters.search || '');

    const handleCategoryChange = (slug) => {
        router.get(route('services.index'), { ...filters, category: slug || undefined }, { preserveState: true, preserveScroll: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('services.index'), { ...filters, search: search || undefined }, { preserveState: true, preserveScroll: true });
    };

    const clearSearch = () => {
        setSearch('');
        router.get(route('services.index'), { ...filters, search: undefined }, { preserveState: true, preserveScroll: true });
    };

    const activeCategory = filters.category || '';
    const total = services?.data?.length ?? services?.length ?? 0;

    return (
        <AppLayout>
            <SeoHead
                title="Products — Essar Techins"
                description="Browse our full range of industrial machinery: Copra Dryers, Oil Expellers, Filter Presses, Industrial Boilers and more. Trusted manufacturer since 2000."
            />

            {/* Page Hero */}
            <PageHero
                title="Our Products"
                accentTitle="Catalogue"
                subtitle="Precision-engineered industrial machinery for coconut and oil processing industries. Built to last, delivered across India."
                badge="Product Range"
                breadcrumbs={[{ label: 'Products' }]}
                align="left"
            />

            {/* Filter + Search Bar */}
            <div className="bg-white border-b border-slate-200 shadow-sm sticky top-[72px] z-30">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="relative flex-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-[13.5px] focus:outline-none focus:border-[#0D2245] focus:ring-2 focus:ring-[#0D2245]/10"
                            />
                        </div>
                        <button type="submit"
                            className="shrink-0 bg-[#0D2245] hover:bg-[#0a1c3d] text-white text-[13px] font-bold px-4 py-2.5 rounded-xl transition-all">
                            Search
                        </button>
                        {filters.search && (
                            <button type="button" onClick={clearSearch}
                                className="shrink-0 text-slate-500 hover:text-red-500 text-[13px] font-semibold px-2 py-2.5 transition-colors">
                                Clear
                            </button>
                        )}
                    </form>

                    {/* Result Count */}
                    <p className="text-[12px] text-slate-400 font-semibold whitespace-nowrap shrink-0">
                        {total} product{total !== 1 ? 's' : ''} found
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col lg:flex-row gap-10">

                {/* Sidebar: Category Filters */}
                <aside className="lg:w-56 xl:w-64 shrink-0">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm sticky top-[130px]">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Filter by Category</h3>
                        <ul className="space-y-1">
                            <li>
                                <button
                                    onClick={() => handleCategoryChange('')}
                                    className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${!activeCategory ? 'bg-[#0D2245] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-[#0D2245]'}`}
                                >
                                    All Products
                                </button>
                            </li>
                            {categories.map(cat => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => handleCategoryChange(cat.slug)}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-between gap-2 ${activeCategory === cat.slug ? 'bg-[#0D2245] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-[#0D2245]'}`}
                                    >
                                        <span className="flex items-center gap-2 truncate">
                                            {cat.icon && <span className="text-base">{cat.icon}</span>}
                                            <span className="truncate">{cat.name}</span>
                                        </span>
                                        {cat.services_count > 0 && (
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${activeCategory === cat.slug ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                                                {cat.services_count}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Quick CTA */}
                        <div className="mt-6 pt-5 border-t border-slate-100">
                            <p className="text-[12px] text-slate-500 mb-3 leading-relaxed">Need help choosing the right machinery?</p>
                            <Link href={route('contact')}
                                className="block text-center bg-amber-500 hover:bg-amber-400 text-white font-bold text-[12.5px] py-2.5 rounded-xl transition-all">
                                Get Expert Advice
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <div className="flex-1 min-w-0">
                    {/* Active filters pills */}
                    {(activeCategory || filters.search) && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {activeCategory && (
                                <span className="inline-flex items-center gap-1.5 bg-[#0D2245]/10 text-[#0D2245] text-[12px] font-bold px-3 py-1.5 rounded-full">
                                    {categories.find(c => c.slug === activeCategory)?.name}
                                    <button onClick={() => handleCategoryChange('')} className="hover:text-red-500 transition-colors">×</button>
                                </span>
                            )}
                            {filters.search && (
                                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-[12px] font-bold px-3 py-1.5 rounded-full">
                                    "{filters.search}"
                                    <button onClick={clearSearch} className="hover:text-red-500 transition-colors">×</button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Grid */}
                    {(services?.data ?? services)?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {(services?.data ?? services).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
                            <p className="text-slate-400 text-sm mb-6">Try adjusting your search or filter criteria.</p>
                            <button onClick={() => { setSearch(''); handleCategoryChange(''); }}
                                className="inline-flex items-center gap-2 bg-[#0D2245] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:bg-[#0a1c3d]">
                                Clear All Filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {services?.links && services.links.length > 3 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-12">
                            {services.links.map((link, i) => (
                                link.url ? (
                                    <Link key={i} href={link.url} preserveScroll
                                        className={`px-4 py-2 rounded-xl text-[13px] font-semibold transition-all ${link.active ? 'bg-[#0D2245] text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0D2245] hover:text-[#0D2245]'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span key={i} className="px-4 py-2 rounded-xl text-[13px] font-semibold text-slate-300 bg-white border border-slate-100 cursor-default"
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
