import React from 'react';

export default function VideoEmbedBlock({ data, bgStyle }) {
    let embedUrl = data.video_url;
    if (data.video_url?.includes('youtube.com') || data.video_url?.includes('youtu.be')) {
        const videoId = data.video_url.split('v=')[1]?.split('&')[0] || data.video_url.split('/').pop();
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (data.video_url?.includes('vimeo.com')) {
        const videoId = data.video_url.split('/').pop();
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }
    
    return (
        <section className={`py-16 ${!bgStyle ? 'bg-brand-background' : 'bg-transparent'}`} style={bgStyle}>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl">
                    <iframe src={embedUrl} allow="autoplay; fullscreen; picture-in-picture" className="w-full h-[300px] sm:h-[500px]" title="Video Embed"></iframe>
                </div>
            </div>
        </section>
    );
}
