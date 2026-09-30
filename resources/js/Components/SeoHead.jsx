import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export default function SeoHead({
    seoMeta = null,
    title = '',
    description = '',
    keywords = '',
    ogImage = '',
    canonicalUrl = ''
}) {
    const { businessProfile } = usePage().props;

    // Resolve details from either seoMeta object or direct props
    const resolvedTitle = seoMeta?.meta_title || title || businessProfile?.name || 'finecare247';
    const resolvedDescription = seoMeta?.meta_description || description || businessProfile?.tagline || 'Delivering exceptional services with quality, innovation, and expertise.';
    const resolvedKeywords = seoMeta?.meta_keywords || keywords || 'services, business, team, company';
    
    // Resolve Canonical URL (fallback to current window location)
    let resolvedCanonical = seoMeta?.canonical_url || canonicalUrl;
    if (!resolvedCanonical && typeof window !== 'undefined') {
        resolvedCanonical = window.location.href;
    }

    // Resolve OG Image URL
    let resolvedOg = seoMeta?.og_image || ogImage;
    if (resolvedOg && !resolvedOg.startsWith('http') && !resolvedOg.startsWith('/')) {
        resolvedOg = `/storage/${resolvedOg}`;
    }
    if (!resolvedOg && businessProfile?.logo) {
        resolvedOg = `/storage/${businessProfile.logo}`;
    }

    return (
        <Head>
            <title>{resolvedTitle}</title>
            <meta name="description" content={resolvedDescription} />
            <meta name="keywords" content={resolvedKeywords} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={resolvedTitle} />
            <meta property="og:description" content={resolvedDescription} />
            {resolvedOg && <meta property="og:image" content={resolvedOg} />}
            {resolvedCanonical && <meta property="og:url" content={resolvedCanonical} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={resolvedTitle} />
            <meta name="twitter:description" content={resolvedDescription} />
            {resolvedOg && <meta name="twitter:image" content={resolvedOg} />}

            {/* Canonical Link */}
            {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}
        </Head>
    );
}
