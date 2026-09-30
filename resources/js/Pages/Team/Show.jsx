import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';

export default function Show({ member, seoMeta, domainTerms = {} }) {
    const { domainConfig } = usePage().props;
    const terms = domainTerms?.teamLabel ? domainTerms : (domainConfig || {});

    const teamLabel = terms.teamLabel || 'Team Member';
    const teamPlural = terms.teamPlural || 'Our Team';

    return (
        <AppLayout>
            <SeoHead seoMeta={seoMeta} title={member.name} description={member.bio || member.designation || member.name} />

            {/* Header Banner */}
            <div className="relative bg-brand-accent text-white py-16 sm:py-20 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <Link href="/team" className="text-xs font-bold text-white/80 hover:text-white uppercase tracking-widest inline-flex items-center gap-1 mb-4">
                        ← Back to {teamPlural}
                    </Link>
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-white">
                        {member.name}
                    </h1>
                    {member.designation && (
                        <p className="text-lg text-brand-primary font-semibold mt-2">
                            {member.designation}
                        </p>
                    )}
                </div>
            </div>

            {/* Profile Content */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column - Card & Image */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-fit text-center">
                        {member.image ? (
                            <img src={`/storage/${member.image}`} alt={member.name} className="w-48 h-48 rounded-full object-cover mx-auto mb-6 shadow-md border-4 border-brand-primary/20" />
                        ) : (
                            <div className="w-48 h-48 rounded-full bg-brand-primary/10 text-brand-primary font-bold font-serif text-6xl flex items-center justify-center mx-auto mb-6">
                                {member.name.charAt(0)}
                            </div>
                        )}
                        <h2 className="text-2xl font-bold font-serif text-brand-accent">{member.name}</h2>
                        {member.designation && <p className="text-sm font-bold text-brand-primary mt-1">{member.designation}</p>}
                        {member.qualification && <p className="text-xs text-gray-500 mt-1">{member.qualification}</p>}

                        {member.experience_years > 0 && (
                            <div className="mt-6 bg-brand-primary/10 rounded-xl p-4 text-center">
                                <span className="block text-2xl font-extrabold text-brand-accent">{member.experience_years}+</span>
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Years Experience</span>
                            </div>
                        )}

                        <Link href="/contact" className="mt-6 block w-full bg-brand-primary text-white font-bold text-sm py-3 rounded-xl hover:bg-brand-accent transition-colors">
                            Book / Contact
                        </Link>
                    </div>

                    {/* Right Column - Bio & Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {member.bio && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-2xl font-bold font-serif text-brand-accent mb-4">About {member.name}</h3>
                                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                                    {member.bio}
                                </div>
                            </div>
                        )}

                        {member.category && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold font-serif text-brand-accent mb-2">Category / Department</h3>
                                <Link href={`/categories/${member.category.slug}`} className="inline-block bg-brand-primary/10 text-brand-accent font-bold px-4 py-2 rounded-lg hover:bg-brand-primary hover:text-white transition-colors">
                                    {member.category.name}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
