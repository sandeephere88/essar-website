import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index({ doctors = [] }) {
    const getDoctorImage = (doc) => {
        if (doc.image_url) {
            return doc.image_url.startsWith('http') || doc.image_url.startsWith('/') 
                ? doc.image_url 
                : `/storage/${doc.image_url}`;
        }
        return '/storage/images/default-doctor.svg';
    };

    // Optional filtering by department
    const [selectedDept, setSelectedDept] = useState('All');
    
    // Extract unique departments for the filter
    const departments = ['All', ...new Set(doctors.map(d => d.department_name).filter(Boolean))];
    
    const filteredDoctors = selectedDept === 'All' 
        ? doctors 
        : doctors.filter(d => d.department_name === selectedDept);

    return (
        <AppLayout>
            <Head title="Our Doctors" />

            {/* Hero Section */}
            <section className="bg-[#FAF6EE] pt-24 pb-16 relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="text-brand-primary font-bold tracking-wider uppercase text-xs block mb-2 font-sans">Our Team</span>
                    <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-accent mb-6">
                        Meet Our Expert Doctors
                    </h1>
                    <p className="text-brand-accent/70 max-w-2xl mx-auto leading-relaxed text-sm">
                        Our dedicated team of experienced medical professionals provides compassionate, 
                        patient-centered care across all major medical specialties.
                    </p>
                </div>
            </section>

            {/* Doctors Grid Section */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    
                    {/* Filters */}
                    {departments.length > 2 && (
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDept(dept)}
                                    className={`px-6 py-2 rounded-full text-xs font-bold tracking-wide transition-colors ${
                                        selectedDept === dept
                                            ? 'bg-brand-accent text-white'
                                            : 'bg-[#FAF6EE] text-brand-accent hover:bg-brand-secondary/40'
                                    }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Grid */}
                    {filteredDoctors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredDoctors.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="bg-white rounded-2xl border border-brand-secondary/40 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg transition duration-300"
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
                                            {doc.department_name && (
                                                <p className="text-xs text-brand-primary font-bold">
                                                    {doc.department_name}
                                                </p>
                                            )}
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
                    ) : (
                        <div className="text-center py-20 bg-[#FAF6EE] rounded-3xl">
                            <p className="text-brand-accent/70 font-medium">No doctors found for this department.</p>
                        </div>
                    )}

                </div>
            </section>
        </AppLayout>
    );
}
