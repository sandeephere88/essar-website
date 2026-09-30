import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import { storageUrl } from '@/Utils/asset';

export default function Show({ blog, relatedBlogs = [], previousBlog = null, nextBlog = null, readingTime = 3 }) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopyLink = () => {
        if (navigator.clipboard && shareUrl) {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getImageSrc = (blogItem) => {
        if (!blogItem) return null;
        if (blogItem.image_url) return blogItem.image_url;
        if (!blogItem.image) return null;
        return storageUrl(blogItem.image);
    };

    const currentBlogImage = getImageSrc(blog);

    // Get gallery image URLs
    const galleryImages = blog.gallery_urls && blog.gallery_urls.length > 0
        ? blog.gallery_urls
        : (Array.isArray(blog.gallery) ? blog.gallery.map(img => storageUrl(img)) : []);

    // Strip HTML tags for excerpts
    const getExcerpt = (htmlContent, length = 120) => {
        if (!htmlContent) return '';
        const plainText = htmlContent.replace(/<[^>]*>?/gm, '').trim();
        return plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
    };

    const formattedDate = blog.published_at
        ? new Date(blog.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : 'Draft';

    return (
        <AppLayout>
            <SeoHead seoMeta={blog.seo_meta} title={blog.title} />

            {/* Reading Scroll Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-brand-secondary/30 z-50">
                <div
                    className="h-full bg-brand-primary transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Header / Hero Section */}
            <div className="bg-gradient-to-b from-brand-secondary/25 via-brand-background to-brand-background pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-brand-secondary/30">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center text-xs text-brand-accent/60 mb-6 space-x-2">
                        <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-brand-primary transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-brand-accent/90 font-medium truncate max-w-[200px] sm:max-w-xs">{blog.title}</span>
                    </nav>

                    {/* Category / Topic Badge */}
                    <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary tracking-wide uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                            Article
                        </span>
                    </div>

                    {/* Article Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-brand-accent tracking-tight leading-[1.18] mb-6">
                        {blog.title}
                    </h1>

                    {/* Metadata Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-brand-secondary/40 text-xs text-brand-accent/70">
                        {/* Date & Reading time */}
                        <div className="flex items-center space-x-3 text-xs text-brand-accent/80 font-medium">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formattedDate}
                            </span>
                            <span>&bull;</span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {readingTime} min read
                            </span>
                        </div>

                        {/* Social Share Buttons */}
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-brand-accent/60 mr-1 hidden sm:inline">Share:</span>
                            <button
                                onClick={handleCopyLink}
                                className="p-2 rounded-full bg-white border border-brand-secondary/50 hover:border-brand-primary hover:text-brand-primary transition text-brand-accent/80 shadow-sm relative group"
                                title="Copy Article Link"
                            >
                                {copied ? (
                                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                )}
                                {copied && (
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-accent text-white text-[10px] px-2 py-0.5 rounded shadow">
                                        Copied!
                                    </span>
                                )}
                            </button>

                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white border border-brand-secondary/50 hover:border-brand-primary hover:text-brand-primary transition text-brand-accent/80 shadow-sm"
                                title="Share on X (Twitter)"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>

                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white border border-brand-secondary/50 hover:border-brand-primary hover:text-brand-primary transition text-brand-accent/80 shadow-sm"
                                title="Share on Facebook"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>

                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-white border border-brand-secondary/50 hover:border-brand-primary hover:text-brand-primary transition text-brand-accent/80 shadow-sm"
                                title="Share on LinkedIn"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.62-2.07 1.72-2.07 1.1 0 1.55.8 1.55 2.07v4.93h2.78M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                {/* Featured Cover Image */}
                {currentBlogImage && (
                    <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-brand-secondary/30 bg-brand-secondary/10">
                        <img
                            src={currentBlogImage}
                            alt={blog.title}
                            className="w-full max-h-[520px] object-cover"
                        />
                    </div>
                )}

                {/* Article Rich Content (WordPress Gutenberg Style) */}
                <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-accent prose-headings:font-bold prose-p:text-brand-accent/85 prose-p:leading-relaxed prose-li:text-brand-accent/80 prose-a:text-brand-primary prose-a:font-semibold hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md prose-blockquote:border-l-4 prose-blockquote:border-brand-primary prose-blockquote:bg-brand-secondary/20 prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-brand-accent">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>

                {/* Multi-Image Blog Gallery Block */}
                {galleryImages.length > 0 && (
                    <div className="mt-14 pt-10 border-t border-brand-secondary/40">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-serif font-bold text-brand-accent flex items-center gap-2">
                                <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Article Photo Gallery
                            </h3>
                            <span className="text-xs font-semibold text-brand-accent/50">
                                {galleryImages.length} {galleryImages.length === 1 ? 'Photo' : 'Photos'}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {galleryImages.map((imgUrl, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveLightboxIndex(index)}
                                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-brand-secondary/40 cursor-pointer bg-brand-secondary/10"
                                >
                                    <img
                                        src={imgUrl}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-brand-accent/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                        <svg className="w-8 h-8 drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Post Navigation: Previous & Next Articles */}
                {(previousBlog || nextBlog) && (
                    <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-brand-secondary/40">
                        {previousBlog ? (
                            <Link
                                href={`/blog/${previousBlog.slug}`}
                                className="group p-5 rounded-2xl border border-brand-secondary/40 bg-white hover:border-brand-primary hover:shadow-md transition flex flex-col justify-between"
                            >
                                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent/50 group-hover:text-brand-primary transition-colors mb-2 block">
                                    &larr; Previous Article
                                </span>
                                <span className="text-sm font-serif font-bold text-brand-accent group-hover:text-brand-primary transition-colors line-clamp-2">
                                    {previousBlog.title}
                                </span>
                            </Link>
                        ) : <div />}

                        {nextBlog && (
                            <Link
                                href={`/blog/${nextBlog.slug}`}
                                className="group p-5 rounded-2xl border border-brand-secondary/40 bg-white hover:border-brand-primary hover:shadow-md transition flex flex-col justify-between text-right"
                            >
                                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-accent/50 group-hover:text-brand-primary transition-colors mb-2 block">
                                    Next Article &rarr;
                                </span>
                                <span className="text-sm font-serif font-bold text-brand-accent group-hover:text-brand-primary transition-colors line-clamp-2">
                                    {nextBlog.title}
                                </span>
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Lightbox Modal for Gallery Images */}
            {activeLightboxIndex !== null && galleryImages[activeLightboxIndex] && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    onClick={() => setActiveLightboxIndex(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={galleryImages[activeLightboxIndex]}
                            alt="Full resolution gallery photo"
                            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                        />
                        {/* Close button */}
                        <button
                            onClick={() => setActiveLightboxIndex(null)}
                            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 p-2.5 rounded-full transition"
                            title="Close preview"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Prev & Next Navigation */}
                        {galleryImages.length > 1 && (
                            <>
                                <button
                                    onClick={() => setActiveLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
                                    className="absolute left-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
                                    title="Previous image"
                                >
                                    &larr;
                                </button>
                                <button
                                    onClick={() => setActiveLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
                                    className="absolute right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition"
                                    title="Next image"
                                >
                                    &rarr;
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* YOU MAY ALSO LIKE Block (WordPress Related Posts) */}
            {relatedBlogs.length > 0 && (
                <section className="bg-gradient-to-b from-brand-secondary/10 to-brand-secondary/30 py-16 sm:py-20 border-t border-brand-secondary/40">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary block mb-2">
                                    Recommended Reading
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-brand-accent tracking-tight">
                                    You May Also Like
                                </h2>
                            </div>
                            <Link
                                href="/blog"
                                className="mt-4 sm:mt-0 text-xs font-bold text-brand-primary hover:text-brand-accent transition flex items-center gap-1"
                            >
                                View All Articles &rarr;
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {relatedBlogs.map((item) => {
                                const itemImg = getImageSrc(item) || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600";
                                const itemDate = item.published_at
                                    ? new Date(item.published_at).toLocaleDateString('en-US', {
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric',
                                      })
                                    : 'Draft';

                                return (
                                    <article
                                        key={item.id}
                                        className="bg-white rounded-3xl overflow-hidden border border-brand-secondary/40 shadow-sm flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition duration-300 group"
                                    >
                                        <div className="aspect-[16/10] bg-brand-secondary/10 overflow-hidden relative">
                                            <img
                                                src={itemImg}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-brand-accent text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                                                {itemDate}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-base font-serif font-bold text-brand-accent mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors">
                                                <Link href={`/blog/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </h3>
                                            <p className="text-xs text-brand-accent/65 leading-relaxed mb-6 line-clamp-3">
                                                {getExcerpt(item.content)}
                                            </p>
                                            <div className="mt-auto pt-4 border-t border-brand-secondary/30 flex items-center justify-between">
                                                <span className="text-[11px] font-bold text-brand-accent/50">
                                                    Article
                                                </span>
                                                <Link
                                                    href={`/blog/${item.slug}`}
                                                    className="text-xs font-bold text-brand-primary group-hover:text-brand-accent transition-colors flex items-center gap-1"
                                                >
                                                    Read Article
                                                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </AppLayout>
    );
}
