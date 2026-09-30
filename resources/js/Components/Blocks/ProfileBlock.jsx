import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { storageUrl } from '@/Utils/asset';

function SectionTitle({ before, accent }) {
    return (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight leading-tight text-center font-primary">
            {before && <>{before} </>}
            {accent && <span className="text-[#00897B] italic">{accent}</span>}
        </h2>
    );
}

export default function ProfileBlock({ data, bgStyle }) {
    if (!data) return null;

    const hasHeading = data.heading_before !== undefined || data.heading_accent !== undefined;
    const beforeText = hasHeading ? (data.heading_before || "") : "Meet Our";
    const accentText = hasHeading ? (data.heading_accent || "") : "Team";
    const descText   = data.heading_description || data.description_text || (typeof data.description === 'string' && (data.profiles || data.groupedProfiles) ? data.description : null);

    // Collect all profile items (from repeater array, grouped blocks, or legacy single fields)
    let items = [];
    if (data.profiles && Array.isArray(data.profiles) && data.profiles.length > 0) {
        items = data.profiles;
    } else if (data.groupedProfiles && Array.isArray(data.groupedProfiles) && data.groupedProfiles.length > 0) {
        items = data.groupedProfiles;
    } else if (data.name || data.image) {
        items = [{
            name: data.name,
            designation: data.designation,
            image: data.image,
            image_url: data.image_url,
            description: data.description,
            link_url: data.link_url,
            link_text: data.link_text,
        }];
    }

    if (items.length === 0) return null;

    const [profileIdx, setProfileIdx] = useState(0);

    const getImageSrc = (item) => {
        if (item.image_url) {
            return item.image_url.startsWith('http') ? item.image_url : storageUrl(item.image_url);
        }
        if (item.image) {
            return storageUrl(item.image);
        }
        return 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400&h=400';
    };

    const currentProfile = items[profileIdx % items.length];

    return (
        <section className={`py-12 sm:py-16 ${!bgStyle ? 'bg-[#F4F6F8]' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-[1439px] px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">

                {/* Section Heading */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <SectionTitle before={beforeText} accent={accentText} />
                    {descText && (
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal whitespace-pre-line">
                            {descText}
                        </p>
                    )}
                </div>

                {/* Mobile View (<md): 1 Card at a time with Simple Left/Right Arrows if multiple items */}
                {items.length > 1 ? (
                    <div className="block md:hidden max-w-xs sm:max-w-sm mx-auto relative">
                        {/* Left Arrow Button */}
                        <button
                            onClick={() => setProfileIdx(p => (p === 0 ? items.length - 1 : p - 1))}
                            aria-label="Previous team member"
                            className="absolute -left-3 top-[120px] -translate-y-1/2 z-20 text-[#00897B] hover:text-[#00695C] active:scale-95 p-1 transition cursor-pointer"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>

                        {/* Right Arrow Button */}
                        <button
                            onClick={() => setProfileIdx(p => (p + 1) % items.length)}
                            aria-label="Next team member"
                            className="absolute -right-3 top-[120px] -translate-y-1/2 z-20 text-[#00897B] hover:text-[#00695C] active:scale-95 p-1 transition cursor-pointer"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>

                        <div className="flex flex-col group cursor-default pb-4">
                            <div className="rounded-[24px] h-[250px] w-full flex justify-center items-center overflow-hidden relative shadow-sm bg-slate-100">
                                <img
                                    src={getImageSrc(currentProfile)}
                                    alt={currentProfile.name || 'Team Member'}
                                    className="w-full h-full object-cover object-top rounded-[24px]"
                                />
                            </div>

                            <div className="mx-3 -mt-8 relative z-10 bg-white rounded-xl border border-slate-200/90 shadow-md p-4 text-center space-y-1">
                                <h3 className="text-base font-bold text-[#1B3A6B] leading-snug font-primary">
                                    {currentProfile.name || 'Team Member'}
                                </h3>
                                {currentProfile.designation && (
                                    <p className="text-xs text-slate-500 font-medium">
                                        {currentProfile.designation}
                                    </p>
                                )}
                                <p className="text-[11px] font-semibold text-slate-400 pt-1">
                                    {(profileIdx % items.length) + 1} / {items.length}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Grid View (>=md or single item on mobile): Horizontal card layout matching reference screenshot */}
                <div className={`${items.length > 1 ? 'hidden md:grid' : 'grid'} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch w-full`}>
                    {items.map((item, idx) => (
                        <div key={idx} className="flex flex-col group cursor-default pb-2">
                            {/* Top Card Image */}
                            <div className="rounded-[24px] lg:rounded-[28px] h-[250px] sm:h-[270px] lg:h-[290px] w-full flex justify-center items-center overflow-hidden relative shadow-sm transition-transform duration-300 group-hover:-translate-y-1 bg-slate-100">
                                <img
                                    src={getImageSrc(item)}
                                    alt={item.name || 'Team Member'}
                                    className="w-full h-full object-cover object-top rounded-[24px] lg:rounded-[28px]"
                                />
                            </div>

                            {/* White Floating Bottom Card Badge */}
                            <div className="mx-3 sm:mx-4 -mt-8 relative z-10 bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-md hover:shadow-lg p-4 text-center space-y-1 transition-all min-h-[76px] flex flex-col justify-center">
                                <h3 className="text-base sm:text-lg font-bold text-[#1B3A6B] leading-snug font-primary">
                                    {item.name || 'Team Member'}
                                </h3>
                                {item.designation && (
                                    <p className="text-xs sm:text-[13px] text-slate-500 font-medium leading-normal">
                                        {item.designation}
                                    </p>
                                )}
                                {item.description && (
                                    <div 
                                        className="text-xs text-slate-500 line-clamp-2 pt-1 font-normal" 
                                        dangerouslySetInnerHTML={{ __html: item.description }} 
                                    />
                                )}
                                {item.link_url && (
                                    <div className="pt-1">
                                        <Link 
                                            href={item.link_url} 
                                            className="text-xs font-bold text-[#00897B] hover:underline inline-flex items-center gap-0.5"
                                        >
                                            {item.link_text || 'Read More →'}
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
