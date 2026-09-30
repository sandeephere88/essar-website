import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import PageHero from '@/Components/PageHero';
import BlockRenderer from '@/Components/Blocks/BlockRenderer';

export default function About({ page }) {
    const hasHeroBlock = page?.blocks && page.blocks.length > 0 && page.blocks[0].type === 'hero_banner';

    return (
        <AppLayout>
            <SeoHead seoMeta={page?.seo_meta} title={page?.title || 'About Us'} />

            {!hasHeroBlock && (
                <PageHero
                    title={page?.title || 'About Us'}
                    subtitle="Leading manufacturer of industrial oil processing plants, copra dryers, filter presses, and heavy machinery since 2000."
                    image={page?.hero_image || null}
                    breadcrumbs={[{ label: page?.title || 'About Us' }]}
                />
            )}

            {/* Rich Text Content if present */}
            {page?.content && (
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-slate-50">
                    <article className="prose prose-slate max-w-none text-xs sm:text-base leading-relaxed text-slate-700">
                        <div dangerouslySetInnerHTML={{ __html: page.content }} />
                    </article>
                </div>
            )}

            {/* Content Blocks from Admin Page Builder */}
            <BlockRenderer blocks={page?.blocks} />
        </AppLayout>
    );
}
