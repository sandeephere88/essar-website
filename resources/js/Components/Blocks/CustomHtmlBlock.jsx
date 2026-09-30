import React from 'react';

export default function CustomHtmlBlock({ data, bgStyle }) {
    const { title, html_content } = data || {};

    if (!html_content) {
        return null;
    }

    return (
        <section className="py-12 md:py-16" style={bgStyle}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <h2 className="text-2xl md:text-3xl font-bold font-serif text-brand-dark mb-6">
                        {title}
                    </h2>
                )}
                <div
                    className="custom-html-container overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: html_content }}
                />
            </div>
        </section>
    );
}
