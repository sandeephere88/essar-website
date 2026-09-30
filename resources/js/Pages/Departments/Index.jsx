import React, { useState, useMemo } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function DepartmentsIndex({ departments }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);

    const alphabets = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    const filteredDepartments = useMemo(() => {
        return departments.filter(dept => {
            const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLetter = selectedLetter 
                ? dept.name.toUpperCase().startsWith(selectedLetter) 
                : true;
            return matchesSearch && matchesLetter;
        });
    }, [departments, searchQuery, selectedLetter]);

    const handleLetterClick = (letter) => {
        if (selectedLetter === letter) {
            setSelectedLetter(null); // Toggle off
        } else {
            setSelectedLetter(letter);
        }
        setVisibleCount(12); // Reset visible count on filter
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setVisibleCount(12);
    };

    const visibleDepartments = filteredDepartments.slice(0, visibleCount);
    const hasMore = visibleCount < filteredDepartments.length;

    return (
        <AppLayout>
            <Head title="Our Medical Departments">
                <meta name="description" content="Explore our specialist medical departments staffed by world-class physicians." />
            </Head>

            {/* ── Hero ──────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-brand-accent">
                {/* Background Pattern / Split layout */}
                <div className="absolute inset-0 z-0 flex">
                    <div className="w-full lg:w-1/2 bg-brand-accent"></div>
                    <div className="hidden lg:block w-1/2 bg-brand-background relative">
                        {/* Placeholder for the right side image as seen in the mockup */}
                        <img 
                            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                            alt="Doctors consulting" 
                            className="w-full h-full object-cover object-left opacity-90"
                        />
                        {/* Gradient overlay to blend left side */}
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-transparent w-32"></div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10 text-white">
                    <div className="max-w-xl">
                        <h1 className="text-4xl sm:text-5xl font-serif font-bold italic mb-4">
                            Caring Beyond Medicine
                        </h1>
                        <p className="text-white/80 text-sm leading-relaxed mb-8">
                            Delivering world-class healthcare with experienced specialists, modern technology, and patient-centered treatment.
                        </p>

                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 text-xs font-sans tracking-wide text-white/60">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>&gt;</span>
                            <span className="text-white font-medium">Our Specialities</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* ── Main Content ──────────────────────────────────────── */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Row: Title & Search */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <span className="text-brand-accent/70 font-sans text-sm block mb-1">Specialities</span>
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-accent">
                                Our Medical Department
                            </h2>
                        </div>
                        <div className="w-full md:w-72">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-accent/50">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input 
                                    type="text"
                                    placeholder="Search Speciality"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="w-full pl-10 pr-4 py-3 rounded-full border border-brand-secondary/40 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-accent placeholder-brand-accent/40"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Alphabet Filter */}
                    <div className="mb-12">
                        <p className="text-sm text-brand-accent/70 mb-4 font-sans">Search by clicking the first letter</p>
                        <div className="flex flex-wrap gap-2">
                            {alphabets.map(letter => (
                                <button
                                    key={letter}
                                    onClick={() => handleLetterClick(letter)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                                        selectedLetter === letter 
                                            ? 'bg-brand-accent text-white shadow-md' 
                                            : 'bg-[#F2F0ED] text-brand-accent/60 hover:bg-brand-secondary/50 hover:text-brand-accent'
                                    }`}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    {visibleDepartments.length === 0 ? (
                        <div className="text-center py-20 bg-[#FAF6EE] rounded-2xl">
                            <p className="text-brand-accent/70 font-medium">No departments found matching your criteria.</p>
                            {(searchQuery || selectedLetter) && (
                                <button 
                                    onClick={() => { setSearchQuery(''); setSelectedLetter(null); }}
                                    className="mt-4 text-xs font-bold text-brand-primary hover:underline"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
                            {visibleDepartments.map((dept) => (
                                <DepartmentCard key={dept.id} department={dept} />
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {hasMore && (
                        <div className="text-center mt-8">
                            <button
                                onClick={() => setVisibleCount(prev => prev + 12)}
                                className="bg-[#424B43] hover:bg-brand-accent text-white text-xs font-bold px-10 py-3.5 rounded-full shadow-md hover:shadow-lg transition duration-300 inline-block font-sans"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}

function DepartmentCard({ department }) {
    const { name, slug, icon, short_desc } = department;

    // We can use a default line-art icon if none is provided.
    // The mockup shows line-art icons for each department.
    const getIcon = () => {
        if (icon && (icon.startsWith('<svg') || icon.length > 2)) {
            // It could be an emoji or raw HTML SVG. We can just render it.
            // If it's a short text, it's an emoji.
            return icon;
        }
        // Default generic medical line-art icon
        return (
            <svg className="w-12 h-12 text-brand-accent/70" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        );
    };

    return (
        <Link
            href={`/departments/${slug}`}
            className="group flex flex-col bg-[#FAF8F5] p-8 rounded-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 min-h-[300px]"
        >
            <div className="mb-6 flex justify-start">
                {typeof getIcon() === 'string' && getIcon().startsWith('<svg') ? (
                    <div dangerouslySetInnerHTML={{ __html: getIcon() }} className="w-12 h-12 text-brand-accent/70" />
                ) : typeof getIcon() === 'string' ? (
                    <span className="text-4xl">{getIcon()}</span>
                ) : (
                    getIcon()
                )}
            </div>

            <div className="flex flex-col flex-1">
                <h3 className="text-lg font-serif font-bold text-brand-accent mb-3 group-hover:text-brand-primary transition-colors">
                    {name}
                </h3>
                <p className="text-xs leading-relaxed text-brand-accent/60 mb-6 font-sans line-clamp-4">
                    {short_desc || `The department of ${name} provides specialized services to all patients with utmost care and modern technology.`}
                </p>
                
                <span className="mt-auto text-xs font-bold text-brand-accent group-hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 border-b border-brand-accent/20 pb-0.5 self-start uppercase tracking-wider">
                    Know More <span className="text-sm font-normal">&rarr;</span>
                </span>
            </div>
        </Link>
    );
}
