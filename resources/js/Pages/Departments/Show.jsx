import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import { Link } from '@inertiajs/react';

export default function DepartmentShow({ department, doctors }) {
    
    const getDoctorImage = (doc) => {
        if (doc.image_url) {
            return doc.image_url.startsWith('http') || doc.image_url.startsWith('/') 
                ? doc.image_url 
                : `/storage/${doc.image_url}`;
        }
        return '/storage/images/default-doctor.svg';
    };

    return (
        <AppLayout>
            <SeoHead seoMeta={department.seo_meta} title={`${department.name} — Department`} />

            {/* ── Hero ──────────────────────────────────────────────── */}
            <section className="bg-brand-accent py-16 text-white relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="hex-pattern" width="60" height="103.923" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                                <path d="M30 0l25.981 15v30L30 60 4.019 45V15z" fill="none" stroke="currentColor" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hex-pattern)" />
                    </svg>
                </div>
                
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                        {department.icon && (
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                {typeof department.icon === 'string' && department.icon.startsWith('<svg') ? (
                                    <div dangerouslySetInnerHTML={{ __html: department.icon }} className="w-10 h-10 text-white" />
                                ) : (
                                    <span className="text-4xl text-white">{department.icon}</span>
                                )}
                            </div>
                        )}
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-serif font-bold italic mb-4">{department.name}</h1>
                            {department.short_desc && (
                                <p className="text-white/80 max-w-2xl text-sm leading-relaxed mb-6">
                                    {department.short_desc}
                                </p>
                            )}
                            
                            {/* Breadcrumb */}
                            <nav className="flex flex-wrap items-center gap-2 text-xs text-white/60 font-sans tracking-wide">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>&gt;</span>
                                <Link href="/departments" className="hover:text-white transition-colors">Our Specialities</Link>
                                <span>&gt;</span>
                                <span className="text-white font-medium">{department.name}</span>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Content ───────────────────────────────────────────── */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 mb-16">
                    
                    {/* Main Description */}
                    <div className="flex-1 max-w-3xl">
                        {department.description ? (
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-brand-accent mb-6 border-b border-brand-secondary/40 pb-2">
                                    About {department.name}
                                </h2>
                                <div
                                    className="prose prose-sm prose-p:text-brand-accent/70 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-brand-accent max-w-none font-sans"
                                    dangerouslySetInnerHTML={{ __html: department.description }}
                                />
                            </div>
                        ) : (
                            <p className="text-brand-accent/70">
                                Detailed information about the {department.name} department will be updated soon.
                            </p>
                        )}
                    </div>

                    {/* Quick Info Sidebar */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="bg-[#FAF6EE] p-8 relative overflow-hidden">
                            {/* Stethoscope Icon overlay */}
                            <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
                                <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9v3c0 3.87 3.13 7 7 7h1c2.76 0 5-2.24 5-5s-2.24-5-5-5h-1c-.55 0-1-.45-1-1V9c0-2.76 2.24-5 5-5h.5" />
                                    <circle cx="17.5" cy="4" r="2" />
                                    <circle cx="12" cy="19" r="2.5" />
                                </svg>
                            </div>
                            
                            <div className="relative z-10">
                                <h3 className="text-xl font-serif font-bold text-brand-accent mb-4">Quick Info</h3>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex gap-3 text-sm text-brand-accent/70 font-sans">
                                        <span className="text-brand-primary font-bold">&gt;</span>
                                        {doctors.length} Active Specialist{doctors.length !== 1 ? 's' : ''}
                                    </li>
                                    <li className="flex gap-3 text-sm text-brand-accent/70 font-sans">
                                        <span className="text-brand-primary font-bold">&gt;</span>
                                        State-of-the-art facilities
                                    </li>
                                    <li className="flex gap-3 text-sm text-brand-accent/70 font-sans">
                                        <span className="text-brand-primary font-bold">&gt;</span>
                                        Mon–Sat: 8 AM – 8 PM
                                    </li>
                                </ul>

                                <Link
                                    href="/contact"
                                    className="inline-block w-full text-center bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-bold px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all font-sans uppercase tracking-wider"
                                >
                                    Book an Appointment
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* ── Doctors Grid ───────────────────────────────────────── */}
                {doctors.length > 0 && (
                    <section className="pt-10 border-t border-brand-secondary/40">
                        <div className="mb-10">
                            <h2 className="text-3xl font-serif font-bold text-brand-accent italic mb-2">Our Specialists</h2>
                            <p className="text-sm text-brand-accent/70 font-sans">Meet the experienced doctors in the {department.name} department.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {doctors.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="bg-white rounded-2xl border border-brand-secondary/40 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300"
                                >
                                    <div className="aspect-[4/4] bg-[#E8E6E0] overflow-hidden relative">
                                        <img
                                            src={getDoctorImage(doc)}
                                            alt={doc.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 bg-white flex flex-col flex-grow justify-between min-h-[170px]">
                                        <div>
                                            <h3 className="text-lg font-serif font-bold text-brand-accent uppercase tracking-wide mb-1 leading-snug">
                                                {doc.name.startsWith('Dr.') ? doc.name : `Dr. ${doc.name}`}
                                            </h3>
                                            <p className="text-sm text-brand-accent/65 font-sans mb-1">
                                                {doc.specialization || doc.designation}
                                            </p>
                                        </div>
                                        <div className="mt-6">
                                            <Link
                                                href={`/doctors/${doc.slug}`}
                                                className="text-xs font-bold text-brand-accent hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 self-start border-b border-brand-accent/20 pb-0.5"
                                            >
                                                Know More <span className="text-[14px]">&rarr;</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
