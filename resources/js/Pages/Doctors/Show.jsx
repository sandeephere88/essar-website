import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import { Link } from '@inertiajs/react';

export default function DoctorShow({ doctor, other_doctors = [] }) {
    const {
        name, designation, specialization, experience_years,
        image_url, bio, educations = [],
        department_name, department_slug,
    } = doctor;

    // Slider State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextDoc = () => {
        if (other_doctors.length === 0) return;
        const visibleCount = isMobile ? 1 : isTablet ? 2 : 4;
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, other_doctors.length - visibleCount + 1));
    };

    const prevDoc = () => {
        if (other_doctors.length === 0) return;
        const visibleCount = isMobile ? 1 : isTablet ? 2 : 4;
        const maxIndex = Math.max(0, other_doctors.length - visibleCount);
        setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    };

    const getTranslateStyle = () => {
        if (isMobile) return `calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem)`;
        if (isTablet) return `calc(-${currentIndex * 50}% - ${currentIndex * 0.75}rem)`;
        return `calc(-${currentIndex * 25}% - ${currentIndex * 1.125}rem)`;
    };

    const formattedName = name.startsWith('Dr.') ? name : `Dr. ${name}`;
    const getDoctorImage = (url, dname) => {
        if (url) {
            return url.startsWith('http') || url.startsWith('/') 
                ? url 
                : `/storage/${url}`;
        }
        return '/storage/images/default-doctor.svg';
    };

    const docImage = getDoctorImage(image_url, name);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <AppLayout>
            <SeoHead seoMeta={doctor.seo_meta} title={`${formattedName} — Doctor Profile`} />

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
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold italic mb-4">{formattedName}</h1>
                    <p className="text-white/80 max-w-2xl text-sm leading-relaxed mb-8">
                        Delivering world-class healthcare with experienced specialists, modern technology, and patient-centered treatment.
                    </p>
                    
                    {/* Breadcrumb */}
                    <nav className="flex flex-wrap items-center gap-2 text-xs text-white/60 font-sans tracking-wide">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>&gt;</span>
                        <Link href="/doctors" className="hover:text-white transition-colors">Our Team</Link>
                        <span>&gt;</span>
                        <span className="text-white font-medium">Doctor Profile</span>
                    </nav>
                </div>
            </section>

            {/* ── Body ──────────────────────────────────────────────── */}
            <section className="py-16 bg-white relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12">
                        
                        {/* ── Left Sidebar ── */}
                        <aside className="w-full md:w-72 shrink-0 flex flex-col gap-8">
                            {/* Doctor Image */}
                            <div className="aspect-[4/5] w-full bg-[#E8E6E0] overflow-hidden relative shadow-md">
                                <img src={docImage} alt={formattedName} className="w-full h-full object-cover object-top" />
                            </div>

                            {/* Anchor Links */}
                            <nav className="flex flex-col text-sm font-bold text-brand-accent/70 font-sans">
                                {bio && (
                                    <button onClick={() => scrollToSection('overview')} className="text-left py-4 border-b border-brand-secondary/40 hover:text-brand-primary transition-colors">
                                        Overview
                                    </button>
                                )}
                                {specialization && (
                                    <button onClick={() => scrollToSection('specializations')} className="text-left py-4 border-b border-brand-secondary/40 hover:text-brand-primary transition-colors">
                                        Specializations
                                    </button>
                                )}
                                {educations.length > 0 && (
                                    <button onClick={() => scrollToSection('qualifications')} className="text-left py-4 border-b border-brand-secondary/40 hover:text-brand-primary transition-colors">
                                        Qualifications
                                    </button>
                                )}
                                {experience_years > 0 && (
                                    <button onClick={() => scrollToSection('experience')} className="text-left py-4 border-b border-brand-secondary/40 hover:text-brand-primary transition-colors">
                                        Experience
                                    </button>
                                )}
                            </nav>
                        </aside>

                        {/* ── Right Content ── */}
                        <div className="flex-1 max-w-3xl">
                            
                            {/* Header Box */}
                            <div className="bg-[#FAF6EE] p-8 md:p-10 mb-12 relative overflow-hidden flex flex-col items-start justify-center min-h-[220px]">
                                {/* Stethoscope Icon overlay */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none">
                                    <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9v3c0 3.87 3.13 7 7 7h1c2.76 0 5-2.24 5-5s-2.24-5-5-5h-1c-.55 0-1-.45-1-1V9c0-2.76 2.24-5 5-5h.5" />
                                        <circle cx="17.5" cy="4" r="2" />
                                        <circle cx="12" cy="19" r="2.5" />
                                    </svg>
                                </div>

                                <div className="relative z-10">
                                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-accent italic mb-2 uppercase">
                                        {formattedName}
                                    </h2>
                                    {department_name && (
                                        <p className="text-sm font-bold text-brand-accent/70 mb-1">{department_name}</p>
                                    )}
                                    {specialization && (
                                        <p className="text-sm font-bold text-brand-accent/50 mb-6">{specialization}</p>
                                    )}
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-white border border-brand-secondary/60 hover:bg-brand-secondary/20 text-brand-accent text-xs font-bold px-6 py-3 rounded-full shadow-sm transition-colors uppercase tracking-wider"
                                    >
                                        Book an Appointment
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-12">
                                {/* Overview */}
                                {bio && (
                                    <div id="overview" className="scroll-mt-32">
                                        <h3 className="text-lg font-serif font-bold text-brand-accent mb-4 border-b border-brand-secondary/40 pb-2">Overview</h3>
                                        <div 
                                            className="prose prose-sm prose-p:text-brand-accent/70 prose-p:leading-relaxed max-w-none font-sans"
                                            dangerouslySetInnerHTML={{ __html: bio }}
                                        />
                                    </div>
                                )}

                                {/* Specializations */}
                                {specialization && (
                                    <div id="specializations" className="scroll-mt-32">
                                        <h3 className="text-lg font-serif font-bold text-brand-accent mb-4 border-b border-brand-secondary/40 pb-2">Specialization</h3>
                                        <ul className="space-y-3">
                                            {specialization.split(',').map((spec, i) => (
                                                <li key={i} className="flex gap-3 text-sm text-brand-accent/70 font-sans">
                                                    <span className="text-brand-primary font-bold">&gt;</span>
                                                    {spec.trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Qualifications */}
                                {educations.length > 0 && (
                                    <div id="qualifications" className="scroll-mt-32">
                                        <h3 className="text-lg font-serif font-bold text-brand-accent mb-4 border-b border-brand-secondary/40 pb-2">Qualifications</h3>
                                        <ul className="space-y-4">
                                            {educations.map((edu, idx) => (
                                                <li key={idx} className="flex gap-3 text-sm text-brand-accent/70 font-sans">
                                                    <span className="text-brand-primary font-bold">&gt;</span>
                                                    <div>
                                                        <span className="font-bold text-brand-accent mr-1">{edu.degree}</span>
                                                        {edu.institution && <span>- {edu.institution}</span>}
                                                        {edu.year && <span className="ml-1">({edu.year})</span>}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Experience */}
                                {experience_years > 0 && (
                                    <div id="experience" className="scroll-mt-32">
                                        <h3 className="text-lg font-serif font-bold text-brand-accent mb-4 border-b border-brand-secondary/40 pb-2">Experience</h3>
                                        <ul className="space-y-3">
                                            <li className="flex gap-3 text-sm text-brand-accent/70 font-sans">
                                                <span className="text-brand-primary font-bold">&gt;</span>
                                                {experience_years} years of professional experience
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {/* Book Appointment Button */}
                                <div className="pt-8">
                                    <Link
                                        href="/contact"
                                        className="inline-block bg-brand-accent hover:bg-brand-accent/90 text-white text-xs font-bold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all font-sans uppercase tracking-wider"
                                    >
                                        Book an Appointment
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── Our Doctors Slider ────────────────────────────────── */}
            {other_doctors.length > 0 && (
                <section className="py-20 bg-[#F8F9FA]">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-12">
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-accent italic mb-2">Our Doctors</h2>
                        </div>

                        <div className="relative px-2">
                            {/* Left Arrow Button */}
                            <button
                                onClick={prevDoc}
                                className={`absolute -left-8 lg:-left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-brand-accent transition-all duration-300 ${other_doctors.length <= 4 && !isMobile && !isTablet ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FAF6EE]'}`}
                                disabled={other_doctors.length <= 4 && !isMobile && !isTablet}
                                aria-label="Previous slide"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Carousel Wrapper */}
                            <div className="overflow-hidden py-4">
                                <div
                                    className="flex gap-6 transition-transform duration-500 ease-in-out"
                                    style={{ transform: `translateX(${getTranslateStyle()})` }}
                                >
                                    {other_doctors.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="w-[85vw] sm:w-[340px] lg:w-[275px] shrink-0 bg-white rounded-2xl border border-brand-secondary/40 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300"
                                        >
                                            <div className="aspect-[4/4] bg-[#E8E6E0] overflow-hidden relative">
                                                <img
                                                    src={getDoctorImage(doc.image_url, doc.name)}
                                                    alt={doc.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-6 bg-white flex flex-col flex-grow justify-between min-h-[170px]">
                                                <div>
                                                    <h3 className="text-lg font-serif font-bold text-brand-accent uppercase tracking-wide mb-1 leading-snug">
                                                        {doc.name.startsWith('Dr.') ? doc.name : `Dr. ${doc.name}`}
                                                    </h3>
                                                    <p className="text-sm text-brand-accent/65 font-sans mb-6">
                                                        {doc.specialization || doc.designation}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/doctors/${doc.slug}`}
                                                    className="text-xs font-bold text-brand-accent hover:text-brand-primary transition-colors inline-flex items-center gap-1.5 self-start border-b border-brand-accent/20 pb-0.5"
                                                >
                                                    Know More <span className="text-[14px]">&rarr;</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Arrow Button */}
                            <button
                                onClick={nextDoc}
                                className={`absolute -right-8 lg:-right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-brand-accent transition-all duration-300 ${other_doctors.length <= 4 && !isMobile && !isTablet ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FAF6EE]'}`}
                                disabled={other_doctors.length <= 4 && !isMobile && !isTablet}
                                aria-label="Next slide"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
            )}
        </AppLayout>
    );
}
