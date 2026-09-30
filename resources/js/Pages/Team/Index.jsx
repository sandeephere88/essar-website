import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import PageHero from '@/Components/PageHero';

export default function Index({ teamMembers, categories, filters = {}, domainTerms = {} }) {
    const { domainConfig } = usePage().props;
    const terms = domainTerms?.teamPlural ? domainTerms : (domainConfig || {});

    const teamPlural = terms.teamPlural || 'Our Team';
    const teamLabel = terms.teamLabel || 'Team Member';
    const categoryPlural = terms.categoryPlural || 'Categories';

    const handleCategoryChange = (e) => {
        const val = e.target.value;
        router.get('/team', { ...filters, category: val || undefined }, { preserveState: true });
    };

    const handleSearchChange = (e) => {
        const val = e.target.value;
        router.get('/team', { ...filters, search: val || undefined }, { preserveState: true });
    };

    return (
        <AppLayout>
            <SeoHead title={teamPlural} description={`Meet our experienced ${teamPlural.toLowerCase()}.`} />

            {/* Banner Header */}
            <PageHero
                title={teamPlural}
                subtitle="Meet our dedicated healthcare professionals and caregivers committed to delivering excellence."
                badge="Expert Professionals"
                breadcrumbs={[{ label: teamPlural }]}
                align="center"
            />

            {/* Filter Bar */}
            <div className="bg-white border-b border-gray-200 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder={`Search by name or role...`}
                            defaultValue={filters.search || ''}
                            onChange={handleSearchChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary"
                        />
                    </div>

                    <div className="w-full md:w-1/3 flex items-center gap-3">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by {categoryPlural}:</label>
                        <select
                            value={filters.category || ''}
                            onChange={handleCategoryChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-brand-primary focus:ring-brand-primary"
                        >
                            <option value="">All {categoryPlural}</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Team Grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                {teamMembers.data.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <h3 className="text-lg font-bold text-gray-800">No {teamPlural.toLowerCase()} found</h3>
                        <p className="text-sm mt-1">Try adjusting your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.data.map((member) => (
                            <Link
                                key={member.id}
                                href={`/team/${member.slug}`}
                                className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-between"
                            >
                                <div className="w-full flex flex-col items-center">
                                    {member.image ? (
                                        <img
                                            src={`/storage/${member.image}`}
                                            alt={member.name}
                                            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-brand-primary/10 group-hover:border-brand-primary transition-colors"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-brand-primary/10 text-brand-primary font-bold font-serif text-4xl flex items-center justify-center mb-4">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}

                                    <h3 className="text-xl font-bold font-serif text-brand-accent group-hover:text-brand-primary transition-colors">
                                        {member.name}
                                    </h3>
                                    {member.designation && (
                                        <p className="text-xs font-semibold text-brand-primary uppercase tracking-wider mt-1">
                                            {member.designation}
                                        </p>
                                    )}
                                    {member.category && (
                                        <span className="mt-3 text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                            {member.category.name}
                                        </span>
                                    )}
                                </div>

                                <span className="mt-6 text-sm font-bold text-brand-accent group-hover:text-brand-primary transition-colors inline-flex items-center gap-1">
                                    View Profile →
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
