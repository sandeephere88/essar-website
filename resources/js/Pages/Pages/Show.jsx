import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import PageHero from '@/Components/PageHero';
import BlockRenderer from '@/Components/Blocks/BlockRenderer';

export default function Show({ page }) {
    // Check if the page builder explicitly has a hero_banner as its first block to avoid double-heroing
    const hasHeroBlock = page.blocks && page.blocks.length > 0 && page.blocks[0].type === 'hero_banner';

    return (
        <AppLayout>
            <SeoHead seoMeta={page.seo_meta} title={page.title} />

            {/* Default Page Header / Hero (Only show if not overridden by a hero block) */}
            {!hasHeroBlock && (
                <PageHero
                    title={page.title}
                    subtitle={page.subtitle || null}
                    image={page.hero_image || null}
                    breadcrumbs={[{ label: page.title }]}
                />
            )}

            <BlockRenderer blocks={page.blocks} />
        </AppLayout>
    );
}
