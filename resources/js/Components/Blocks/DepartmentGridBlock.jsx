import React from 'react';
import { Link } from '@inertiajs/react';

export default function DepartmentGridBlock({ data, bgStyle }) {
    const departments = data.hydrated_departments || [];
    
    const headingBefore = data?.heading_before || data?.heading || "";
    const headingAccent = data?.heading_accent || "";
    const description = data?.description;

    const getDeptIcon = (name = '', slug = '') => {
        return (
            <svg className="w-12 h-12 text-current transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        );
    };

    return (
        <section className={`py-12 sm:py-20 ${!bgStyle ? 'bg-brand-background' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {(headingBefore || headingAccent || description) && (
                    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
                        {(headingBefore || headingAccent) && (
                            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#052b4d] tracking-tight">
                                {headingBefore}{headingAccent ? <> <span className="text-[#00897b] italic font-serif">{headingAccent}</span></> : ''}
                            </h2>
                        )}
                        {description && (
                            <p className="text-xs sm:text-sm text-slate-600 font-medium whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {departments.map(dept => (
                        <Link href={`/departments/${dept.slug}`} key={dept.id} className="bg-white rounded-[2rem] p-8 border border-brand-secondary/20 shadow-lg flex flex-col items-center text-center justify-between min-h-[350px] group relative hover:-translate-y-2 transition duration-300">
                            <div className="flex flex-col items-center w-full">
                                <div className="h-24 w-24 rounded-full bg-[#FAF6EE] text-brand-accent flex items-center justify-center mb-6 group-hover:bg-[#5D4E46] group-hover:text-white transition duration-300">
                                    {getDeptIcon(dept.name, dept.slug)}
                                </div>
                                <h3 className="text-xl font-serif font-bold text-brand-accent mb-3">{dept.name}</h3>
                                <p className="text-sm text-brand-accent/70 line-clamp-3 max-w-[240px]">{dept.short_desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
