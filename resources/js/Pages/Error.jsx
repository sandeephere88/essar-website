import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Error({ status }) {
    const messages = {
        503: { title: 'Service Unavailable', description: "Sorry, we're doing some maintenance. Please check back soon." },
        500: { title: 'Server Error', description: 'Whoops, something went wrong on our servers.' },
        404: { title: 'Page Not Found', description: "Sorry, the page you are looking for couldn't be found." },
        403: { title: 'Forbidden', description: 'Sorry, you are not allowed to access this page.' },
    };

    const { title, description } = messages[status] ?? {
        title: 'An Error Occurred',
        description: 'Something went wrong. Please try again.',
    };

    return (
        <AppLayout>
            <section className="min-h-[60vh] flex items-center justify-center py-20 px-4 bg-[#F4F6F9]">
                <div className="text-center max-w-lg mx-auto space-y-6">
                    {/* Error Code */}
                    <div className="text-[96px] font-extrabold text-[#1B3A6B]/10 leading-none select-none">
                        {status}
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center -mt-8">
                        <div className="w-16 h-16 rounded-full bg-[#1B3A6B]/10 flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#1B3A6B]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d={status === 404
                                        ? "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    }
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B3A6B]">{title}</h1>
                        <p className="text-slate-500 text-[15px] leading-relaxed">{description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-[#1B3A6B] hover:bg-[#142d54] text-white font-bold px-6 py-3 rounded-xl shadow text-sm transition-all hover:scale-[1.02]"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Back to Home
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 hover:border-[#1B3A6B] hover:text-[#1B3A6B] font-semibold px-6 py-3 rounded-xl text-sm transition-all"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
