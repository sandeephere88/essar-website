import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';

const categoryColors = {
    Legal:      { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' },
    Compliance: { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
    HR:         { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
    Governance: { bg: '#DBEAFE', text: '#1E40AF', border: '#BFDBFE' },
    Other:      { bg: '#F3F4F6', text: '#374151', border: '#E5E7EB' },
};

function CategoryBadge({ category }) {
    if (!category) return null;
    const colors = categoryColors[category] || categoryColors.Other;
    return (
        <span
            style={{
                backgroundColor: colors.bg,
                color:           colors.text,
                border:          `1px solid ${colors.border}`,
            }}
            className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full tracking-wide"
        >
            {category}
        </span>
    );
}

function PdfIcon() {
    return (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
            <rect x="6" y="2" width="28" height="36" rx="3" fill="#E53E3E" opacity="0.12" />
            <rect x="6" y="2" width="28" height="36" rx="3" stroke="#E53E3E" strokeWidth="1.5" />
            <path d="M28 2v8a2 2 0 002 2h8" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M28 2l8 8" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="2" y="26" width="28" height="16" rx="3" fill="#E53E3E" />
            <text x="16" y="38" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PDF</text>
        </svg>
    );
}

export default function PoliciesIndex({ policies }) {
    return (
        <AppLayout>
            <SeoHead
                title="Policies & Documents"
                description="Access our official policy documents including GDPR, Modern Slavery, and other compliance documents."
            />

            {/* Hero Banner */}
            <section className="bg-brand-background pt-32 pb-16 relative overflow-hidden">
                {/* Subtle decorative blobs */}
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 -left-24 w-72 h-72 rounded-full bg-brand-secondary/10 blur-3xl pointer-events-none" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-brand-primary font-bold tracking-wider uppercase text-xs block mb-2 font-sans">
                        Transparency &amp; Compliance
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-accent mb-6">
                        Policies &amp; Documents
                    </h1>
                    <p className="text-brand-accent/70 max-w-2xl mx-auto leading-relaxed">
                        Download or view our official policy documents. We are committed to transparency,
                        data protection, and ethical business practices.
                    </p>
                </div>
            </section>

            {/* Policy Cards */}
            <section className="py-16 bg-white border-t border-brand-secondary/20 min-h-[500px]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {policies.length === 0 ? (
                        <div className="text-center py-24 bg-[#FAF6EE] rounded-[2rem] border border-brand-secondary/35">
                            <div className="flex justify-center mb-4 opacity-40">
                                <PdfIcon />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-brand-accent mb-2">
                                No policy documents available yet
                            </h3>
                            <p className="text-sm text-brand-accent/60">
                                Check back later for our policy documents.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {policies.map((policy) => (
                                <PolicyCard key={policy.id} policy={policy} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}

function PolicyCard({ policy }) {
    const viewUrl     = `/policies/${policy.id}/view`;
    const downloadUrl = `/policies/${policy.id}/download`;

    return (
        <div className="group flex flex-col bg-white rounded-2xl border border-brand-secondary/25 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Card top accent strip */}
            <div className="h-1 w-full bg-gradient-to-r from-brand-primary to-brand-secondary" />

            <div className="flex flex-col flex-1 p-6 gap-4">
                {/* Icon + category row */}
                <div className="flex items-start justify-between gap-3">
                    <div className="shrink-0 p-3 rounded-xl bg-red-50 border border-red-100 group-hover:scale-105 transition-transform duration-300">
                        <PdfIcon />
                    </div>
                    {policy.category && (
                        <CategoryBadge category={policy.category} />
                    )}
                </div>

                {/* Title */}
                <div className="flex-1">
                    <h2 className="text-lg font-serif font-bold text-brand-accent leading-snug mb-2">
                        {policy.title}
                    </h2>
                    {policy.description && (
                        <p className="text-sm text-brand-accent/65 leading-relaxed line-clamp-3">
                            {policy.description}
                        </p>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-2 border-t border-brand-secondary/15">
                    <a
                        href={viewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`view-policy-${policy.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary text-white text-sm font-semibold hover:bg-brand-primary/90 active:scale-95 transition-all duration-200 shadow-sm"
                    >
                        {/* Eye icon */}
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View PDF
                    </a>

                    <a
                        href={downloadUrl}
                        id={`download-policy-${policy.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-accent text-sm font-semibold border border-brand-secondary/30 hover:bg-brand-background hover:border-brand-primary/30 active:scale-95 transition-all duration-200"
                    >
                        {/* Download icon */}
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                    </a>
                </div>
            </div>
        </div>
    );
}
