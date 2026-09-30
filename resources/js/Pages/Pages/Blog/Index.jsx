import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import SeoHead from '@/Components/SeoHead';
import { storageUrl } from '@/Utils/asset';

export default function Index({ blogs = [] }) {
    return (
        <AppLayout>
            <SeoHead title="News & Events" description="Stay updated with latest clinical accomplishments and health tips." />

            <div className="relative bg-[#1B3A6B] text-white py-12 sm:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-15">
                    <div className="absolute inset-0 bg-[radial-gradient(#00897B_1px,transparent_1px)] [background-size:16px_16px]" />
                </div>
                <div className="mx-auto max-w-5xl px-4 text-center relative z-10">
                    <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight mb-3">
                        News & Events
                    </h1>
                    <div className="h-1 w-12 bg-[#00897B] mx-auto rounded-full" />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 bg-slate-50">
                {blogs.length === 0 ? (
                    <div className="text-center text-slate-400 py-12 text-sm sm:text-base">
                        No articles published yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {blogs.map((blog) => (
                            <article key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col h-full hover:shadow-md transition">
                                <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                                    <img
                                        src={blog.image_url || (blog.image ? storageUrl(blog.image) : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600")}
                                        alt={blog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <span className="text-[10px] font-bold text-slate-400 block mb-2">
                                        {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}
                                    </span>
                                    <h3 className="text-base font-serif font-bold text-slate-900 mb-2 line-clamp-2 hover:text-[#1B3A6B] transition-colors">
                                        <Link href={route('blog.show', blog.slug)}>{blog.title}</Link>
                                    </h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                                        {blog.content ? blog.content.replace(/<[^>]*>?/gm, '') : ''}
                                    </p>
                                    <div className="mt-auto pt-2">
                                        <Link href={route('blog.show', blog.slug)} className="text-xs font-bold text-[#1B3A6B] hover:text-[#00897B] transition-colors">
                                            Read More &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
