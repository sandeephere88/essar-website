import React, { useState } from 'react';
import { storageUrl } from '@/Utils/asset';

export default function TabsContentBlock({ data, bgStyle }) {
    const { title, description, tabs } = data || {};
    const [activeTab, setActiveTab] = useState(0);

    if (!tabs || !Array.isArray(tabs) || tabs.length === 0) {
        return null;
    }

    return (
        <section className="py-10 sm:py-16 lg:py-20" style={bgStyle}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {(title || description) && (
                    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                        {title && (
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-3">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Tab Navigation — horizontal scrollable on mobile */}
                <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar justify-start sm:justify-center">
                    {tabs.map((tab, idx) => {
                        const isActive = idx === activeTab;
                        return (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-200 shrink-0 ${
                                    isActive
                                        ? 'bg-[#1B3A6B] text-white shadow-md'
                                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                }`}
                            >
                                {tab.title}
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content Panel */}
                {tabs[activeTab] && (
                    <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 border border-slate-100">
                        <div className={`grid grid-cols-1 ${tabs[activeTab].image ? 'lg:grid-cols-2' : ''} gap-6 sm:gap-8 items-center`}>
                            {tabs[activeTab].image && (
                                <div className="rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={storageUrl(tabs[activeTab].image)}
                                        alt={tabs[activeTab].title}
                                        className="w-full h-48 sm:h-72 lg:h-80 object-cover"
                                    />
                                </div>
                            )}
                            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed font-sans"
                                 dangerouslySetInnerHTML={{ __html: tabs[activeTab].content }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
