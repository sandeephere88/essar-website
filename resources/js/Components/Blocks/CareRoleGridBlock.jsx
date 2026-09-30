import React, { useState } from 'react';
import { storageUrl } from '@/Utils/asset';

const IMGS = {
    nurse: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400&h=400',
    mentalHealth: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400&h=400',
    hca: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400&h=400',
    supportWorker: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400',
    nurseryNurse: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400&h=400',
    domestic: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=400&h=400',
};

function SectionTitle({ before, accent, after = '' }) {
    return (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight leading-tight text-center font-primary">
            {before && <>{before} </>}
            <span className="text-[#00897B] italic">{accent}</span>
            {after && <> {after}</>}
        </h2>
    );
}

export default function CareRoleGridBlock({ data, bgStyle }) {
    const block = data || {};
    const hasHeading = block.heading_before !== undefined || block.heading_accent !== undefined;
    const beforeText = hasHeading ? (block.heading_before || "") : "Our Care";
    const accentText = hasHeading ? (block.heading_accent || "") : "Role";
    const descText   = block.description !== undefined ? block.description : "Explore our specialist healthcare and nursing roles designed for every care requirement.";
    
    const [roleIdx, setRoleIdx] = useState(0);

    const fallbackRoles = [
        { title: 'Registered Nurse',       subtitle: 'Qualified Registered Nurses, 24/7',                  image_url: IMGS.nurse },
        { title: 'Mental Health Nurses',   subtitle: 'Professional Care for Mental Wellbeing',            image_url: IMGS.mentalHealth },
        { title: 'Health Care Assistants', subtitle: 'Reliable Care, Delivered with Compassion',          image_url: IMGS.hca },
        { title: 'Support Workers',        subtitle: 'Empowering Independence Through Compassionate Support', image_url: IMGS.supportWorker },
        { title: 'Nursery Workers',        subtitle: 'Nurturing Young Minds with Care and Compassion',     image_url: IMGS.nurseryNurse },
        { title: 'Homecare Workers',       subtitle: 'Supporting Independent Living with Compassion',      image_url: IMGS.domestic },
    ];

    const roles = (block.roles && block.roles.length > 0) ? block.roles.map((r, idx) => {
        let img = fallbackRoles[idx % fallbackRoles.length].image_url;
        if (r.image_url) {
            img = r.image_url;
        } else if (r.image) {
            img = storageUrl(r.image);
        }
        return {
            title: r.title,
            subtitle: r.subtitle,
            image_url: img,
        };
    }) : fallbackRoles;

    const badgeText  = block.badge_text !== undefined ? block.badge_text : "ALL SPECIALITIES";

    return (
        <section className={`py-10 sm:py-16 ${!bgStyle ? 'bg-[#F4F6F8]' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-[1439px] px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    {badgeText && (
                        <div className="flex justify-center mb-1">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E1F3F1] border border-[#00897B]/20 text-[#00897B] text-[11px] sm:text-[12px] font-bold tracking-widest uppercase">
                                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/>
                                </svg>
                                <span>{badgeText}</span>
                            </div>
                        </div>
                    )}
                    <SectionTitle before={beforeText} accent={accentText} />
                    {descText && (
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal whitespace-pre-line">
                            {descText}
                        </p>
                    )}
                </div>

                {/* Mobile View (<md): 1 Card with Simple Overlay Left/Right Arrow Icons */}
                <div className="block md:hidden max-w-md mx-auto relative">
                    <button
                        onClick={() => setRoleIdx(p => (p === 0 ? roles.length - 1 : p - 1))}
                        aria-label="Previous care role"
                        className="absolute left-1 top-[110px] -translate-y-1/2 z-20 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:scale-110 active:scale-95 p-2 transition cursor-pointer"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <button
                        onClick={() => setRoleIdx(p => (p + 1) % roles.length)}
                        aria-label="Next care role"
                        className="absolute right-1 top-[110px] -translate-y-1/2 z-20 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:scale-110 active:scale-95 p-2 transition cursor-pointer"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>

                    <div className="flex flex-col group cursor-default">
                        <div className="rounded-2xl h-[220px] w-full flex justify-center items-center overflow-hidden relative shadow-sm">
                            <img
                                src={currentRole?.image_url}
                                alt={currentRole?.title}
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                        <div className="pt-3 px-1 text-center space-y-1">
                            <h3 className="text-lg font-bold text-slate-900 font-primary">
                                {currentRole?.title}
                            </h3>
                            <p className="text-xs text-slate-500 font-normal">
                                {currentRole?.subtitle}
                            </p>
                            <p className="text-xs font-semibold text-slate-400 pt-1">
                                {(roleIdx % roles.length) + 1} / {roles.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Desktop View (>=md): Full 3-Column Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full">
                    {roles.map((role, idx) => (
                        <div key={role.title || idx} className="flex flex-col group cursor-default">
                            <div className="rounded-2xl lg:rounded-[30px] h-[200px] sm:h-[240px] lg:h-[260px] w-full flex justify-center items-center overflow-hidden relative shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                                <img
                                    src={role.image_url}
                                    alt={role.title}
                                    className="w-full h-full object-cover rounded-2xl lg:rounded-[30px]"
                                />
                            </div>

                            <div className="pt-3 sm:pt-4 px-1 space-y-1">
                                <h3 className="text-base sm:text-lg lg:text-[20px] font-bold text-slate-900 leading-snug font-primary">
                                    {role.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-normal">
                                    {role.subtitle}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
