import React from 'react';

export default function RichTextBlock({ data, bgStyle }) {
    return (
        <section className={bgStyle ? 'bg-transparent' : ''} style={bgStyle}>
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
            <article className="prose prose-stone max-w-none prose-headings:font-serif prose-headings:text-brand-accent prose-p:text-brand-accent/80 prose-p:leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </article>
        </div>
        </section>
    );
}
