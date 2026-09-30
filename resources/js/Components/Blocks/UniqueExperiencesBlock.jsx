import React from 'react';
import { storageUrl } from '@/Utils/asset';

const IMGS = {
    team: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1600&h=700',
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

export default function UniqueExperiencesBlock({ data, bgStyle }) {
    const block = data || {};
    const hasHeading = block.heading_before !== undefined || block.heading_accent !== undefined;
    const beforeText = hasHeading ? (block.heading_before || "") : "We Create";
    const accentText = hasHeading ? (block.heading_accent || "") : "Unique Experiences";
    const descText   = block.description !== undefined ? block.description : "We provide comprehensive home care services designed to fit your unique needs, ensuring safety, independence, and peace of mind for you and your loved ones.";
    
    let photoUrl = IMGS.team;
    if (block.image_url) {
        photoUrl = block.image_url;
    } else if (block.image) {
        photoUrl = storageUrl(block.image);
    }

    const cards = (block.stat_badges && block.stat_badges.length > 0) ? block.stat_badges : [
        { label: 'Our Vision', subtext: 'Our vision is to become THE platform for independent nurses and caregivers for booking shifts and finding people that need care.' },
        { label: 'Our Motto',  subtext: 'Our vision is to become THE platform for independent nurses and caregivers for booking shifts and finding people that need care.' },
        { label: 'Our Mission', subtext: 'Our mission is to stay true to the independent nurses and caregivers so that they always have a way to book shifts.' },
    ];

    const icons = [
        <svg key="1" className="w-6 h-6 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
        <svg key="2" className="w-6 h-6 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
        <svg key="3" className="w-6 h-6 text-[#00897B]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    ];

    return (
        <section className={`py-10 sm:py-16 relative overflow-hidden ${!bgStyle ? 'bg-white' : 'bg-transparent'}`} style={bgStyle}>
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#00897B]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -right-20 w-80 h-80 bg-[#00897B]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="mx-auto max-w-[1439px] px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10 relative z-10">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <SectionTitle before={beforeText} accent={accentText} />
                    {descText && (
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal whitespace-pre-line">
                            {descText}
                        </p>
                    )}
                </div>

                <div className="relative rounded-3xl lg:rounded-[50px] overflow-visible lg:pb-[140px]">
                    <div className="w-full h-[240px] sm:h-[380px] lg:h-[540px] rounded-3xl lg:rounded-[50px] overflow-hidden relative shadow-md">
                        <img
                            src={photoUrl}
                            alt="Our Care Team"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/20 rounded-3xl lg:rounded-[50px] pointer-events-none"/>
                    </div>

                    <div className="mt-6 lg:mt-0 lg:absolute lg:left-0 lg:right-0 lg:bottom-0 lg:z-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-[1240px] mx-auto">
                            {cards.map((c, idx) => (
                                <div
                                    key={c.label || idx}
                                    className="w-full min-h-[220px] sm:min-h-[260px] rounded-2xl lg:rounded-[20px] border border-slate-200/90 bg-white p-5 sm:p-7 flex flex-col justify-center items-center text-center shadow-md hover:shadow-xl transition-all space-y-3"
                                >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                                        {icons[idx % icons.length]}
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-primary">
                                        {c.label}
                                    </h3>
                                    {c.subtext && (
                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-[300px]">
                                            {c.subtext}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
