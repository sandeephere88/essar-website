import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function SearchIndex({ query, results }) {
    const hasResults = results.doctors.length > 0 || results.departments.length > 0 || results.pages.length > 0;

    return (
        <AppLayout>
            <Head title={query ? `Search: ${query}` : 'Search'} />
            
            <div className="bg-brand-secondary/20 pt-40 pb-20 border-b border-brand-secondary/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-accent mb-4">
                        Search Results
                    </h1>
                    <p className="text-lg text-brand-accent/70">
                        {query ? `Showing results for "${query}"` : 'Please enter a search term'}
                    </p>
                </div>
            </div>

            <div className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!query ? (
                        <div className="text-center py-12 text-brand-accent/50 text-xl">
                            Enter a search query to find information.
                        </div>
                    ) : !hasResults ? (
                        <div className="text-center py-12 text-brand-accent/50 text-xl">
                            No results found for "{query}". Try a different keyword.
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {results.doctors.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-brand-accent mb-6 border-b border-brand-secondary/40 pb-4">Doctors</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {results.doctors.map(doc => (
                                            <Link key={doc.id} href={`/doctors/${doc.slug}`} className="flex items-center gap-4 p-4 rounded-2xl border border-brand-secondary/30 hover:shadow-md transition bg-white group">
                                                {doc.image_url ? (
                                                    <img src={doc.image_url} alt={doc.name} className="w-16 h-16 rounded-full object-cover" />
                                                ) : (
                                                    <div className="w-16 h-16 rounded-full bg-brand-secondary/50 flex items-center justify-center text-brand-accent">
                                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-bold text-lg group-hover:text-brand-primary transition">{doc.name}</h3>
                                                    <p className="text-sm text-brand-accent/70">{doc.specialization} • {doc.department_name}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {results.departments.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-brand-accent mb-6 border-b border-brand-secondary/40 pb-4">Departments & Services</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {results.departments.map(dept => (
                                            <Link key={dept.id} href={`/departments/${dept.slug}`} className="block p-6 rounded-2xl border border-brand-secondary/30 hover:shadow-md transition bg-white group">
                                                <h3 className="font-bold text-xl mb-2 group-hover:text-brand-primary transition">{dept.name}</h3>
                                                {dept.short_desc && <p className="text-brand-accent/70 text-sm line-clamp-2">{dept.short_desc}</p>}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {results.pages.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-brand-accent mb-6 border-b border-brand-secondary/40 pb-4">General Information</h2>
                                    <div className="space-y-4">
                                        {results.pages.map(page => (
                                            <Link key={page.id} href={`/${page.slug}`} className="block p-4 rounded-xl border border-brand-secondary/20 hover:bg-brand-secondary/10 transition group">
                                                <h3 className="font-bold text-lg group-hover:text-brand-primary transition">{page.title}</h3>
                                                <p className="text-sm text-brand-accent/50 mt-1">/{page.slug}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
