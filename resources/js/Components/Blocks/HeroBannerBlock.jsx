import React from 'react';
import PageHero from '@/Components/PageHero';
import { storageUrl } from '@/Utils/asset';

export default function HeroBannerBlock({ data }) {
    if (!data) return null;

    return (
        <PageHero
            title={data.heading}
            subtitle={data.subheading}
            image={data.image ? storageUrl(data.image) : null}
            ctaText={data.cta_text}
            ctaLink={data.cta_link}
            align={data.alignment || 'left'}
        />
    );
}
