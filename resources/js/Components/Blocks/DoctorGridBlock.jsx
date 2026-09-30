import React from 'react';
import { Link } from '@inertiajs/react';
import { storageUrl } from '@/Utils/asset';

export default function DoctorGridBlock({ data, bgStyle }) {
    const doctors = data?.hydrated_doctors || [];
    if (!doctors || doctors.length === 0) return null;
    
    return (
        <section className={`py-10 sm:py-16 ${!bgStyle ? 'bg-white' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition duration-300">
                            <div className="aspect-[4/4] bg-slate-100 overflow-hidden relative">
                                <img 
                                    src={doc.image_url && !doc.image_url.includes('default') ? storageUrl(doc.image_url) : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400'} 
                                    alt={doc.name} 
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <div className="p-5 bg-white flex flex-col flex-grow justify-between min-h-[150px]">
                                <div>
                                    <h3 className="text-base font-bold text-slate-900 uppercase mb-1">{doc.name.startsWith('Dr.') ? doc.name : `Dr. ${doc.name}`}</h3>
                                    <p className="text-xs text-slate-500 font-medium mb-4">{doc.specialization || doc.designation}</p>
                                </div>
                                <Link href={route('doctors.show', doc.slug)} className="text-xs font-bold text-[#1B3A6B] hover:text-[#00897B] inline-flex items-center gap-1 self-start border-b border-[#1B3A6B] pb-0.5">Know More &rarr;</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
