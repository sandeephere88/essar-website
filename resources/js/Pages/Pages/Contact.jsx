import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import PageHero from '@/Components/PageHero';
import ContactForm from '@/Components/ContactForm';
import BlockRenderer from '@/Components/Blocks/BlockRenderer';
import OfficeLocationsBlock from '@/Components/Blocks/OfficeLocationsBlock';
import GoogleMapBlock from '@/Components/Blocks/GoogleMapBlock';

export default function Contact({ page }) {
    const hasBlocks = page?.blocks && Array.isArray(page.blocks) && page.blocks.length > 0;
    const hasContactFormBlock = hasBlocks && page.blocks.some(b => b.type === 'contact_form');

    return (
        <AppLayout>
            <SeoHead seoMeta={page?.seo_meta} title={page?.title || 'Contact Us'} />

            <PageHero
                title={page?.title || 'Contact Us'}
                subtitle="Get in touch with our sales & engineering team for quotes, product specifications, or technical support."
                image={page?.hero_image || null}
                breadcrumbs={[{ label: page?.title || 'Contact Us' }]}
            />

            {/* Show hardcoded ContactForm only if no contact_form block is in page blocks */}
            {!hasContactFormBlock && <ContactForm />}

            {/* Render blocks configured in CMS Page */}
            {hasBlocks && <BlockRenderer blocks={page.blocks} />}
        </AppLayout>
    );
}
