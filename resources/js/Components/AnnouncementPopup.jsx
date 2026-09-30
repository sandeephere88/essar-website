import React, { useState, useEffect } from 'react';
import { storageUrl } from '@/Utils/asset';

export default function AnnouncementPopup({ announcement }) {
    const [isOpen, setIsOpen] = useState(false);

    // Validate that the announcement object contains actual displayable content
    const hasTitle = Boolean(announcement?.title && String(announcement.title).trim().length > 0);
    const hasContent = Boolean(announcement?.content && String(announcement.content).trim().length > 0);
    const hasImage = Boolean(announcement?.image);
    const isValidAnnouncement = Boolean(announcement && announcement.id && (hasTitle || hasContent || hasImage));

    useEffect(() => {
        if (!isValidAnnouncement) {
            setIsOpen(false);
            return;
        }

        const closedKey = `closed_announcement_${announcement.id}`;
        const hasClosed = sessionStorage.getItem(closedKey);

        if (!hasClosed) {
            const timer = setTimeout(() => setIsOpen(true), 1200);
            return () => clearTimeout(timer);
        } else {
            setIsOpen(false);
        }
    }, [announcement?.id, isValidAnnouncement]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closePopup();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, announcement?.id]);

    const closePopup = () => {
        setIsOpen(false);
        if (announcement?.id) {
            sessionStorage.setItem(`closed_announcement_${announcement.id}`, 'true');
        }
    };

    if (!isOpen || !isValidAnnouncement) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={closePopup}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full relative animate-in fade-in zoom-in duration-300 border border-slate-100"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={closePopup}
                    aria-label="Close announcement"
                    className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="flex flex-col md:flex-row">
                    {hasImage && (
                        <div className="md:w-2/5 h-52 md:h-auto shrink-0 relative bg-slate-100">
                            <img 
                                src={storageUrl(announcement.image)} 
                                alt={announcement.title || 'Announcement'} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    
                    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-[#008077]/10 text-[#008077] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                Announcement
                            </span>
                        </div>

                        {hasTitle && (
                            <h2 className="text-xl sm:text-2xl font-bold text-[#1B3A6B] mb-3 leading-snug">
                                {announcement.title}
                            </h2>
                        )}
                        
                        {hasContent && (
                            <div 
                                className="text-sm text-slate-600 leading-relaxed max-w-none prose prose-sm prose-p:my-1.5"
                                dangerouslySetInnerHTML={{ __html: announcement.content }}
                            />
                        )}
                        
                        <div className="mt-6 pt-2">
                            <button 
                                onClick={closePopup}
                                className="bg-[#1B3A6B] hover:bg-[#142d54] text-white font-bold py-2.5 px-7 rounded-xl transition-all text-sm shadow-md hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Continue to Site
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

