import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

/**
 * InquiryModal component for instant "Get Quote" requests.
 * Props:
 *   isOpen: boolean
 *   onClose: () => void
 *   product: { title: string, slug: string } | null
 */
export default function InquiryModal({ isOpen, onClose, product = null }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        phone: '',
        quantity: '',
        message: '',
        product_slug: product?.slug || '',
        product_name: product?.title || '',
    });

    useEffect(() => {
        if (product) {
            setData((prev) => ({
                ...prev,
                product_slug: product.slug,
                product_name: product.title,
            }));
        }
    }, [product]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = product?.slug ? route('products.inquiry', product.slug) : route('products.inquiry.general');
        
        post(routeName, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setTimeout(() => {
                    onClose();
                }, 2000);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Dialog */}
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 text-center">
                <div
                    className="relative w-full max-w-lg transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all border border-slate-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="bg-[#0D2245] px-6 py-6 text-white relative">
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                        >
                            ✕
                        </button>
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-white px-2.5 py-0.5 rounded-full mb-2">
                            Request a Quote
                        </span>
                        <h3 className="text-xl font-bold text-white">
                            {product ? `Inquire about ${product.title}` : 'Get a Quick Quote'}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1">
                            Fill out the form below and our sales engineering team will respond within 24 hours.
                        </p>
                    </div>

                    {/* Form Body */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        {recentlySuccessful ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center">
                                <svg className="w-12 h-12 text-emerald-500 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h4 className="font-bold text-lg text-emerald-900 mb-1">Inquiry Sent Successfully!</h4>
                                <p className="text-xs text-emerald-700">Thank you for your interest. We will be in touch with pricing & specifications shortly.</p>
                            </div>
                        ) : (
                            <>
                                {product?.title && (
                                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between">
                                        <span className="text-xs font-semibold text-slate-600">Target Product:</span>
                                        <span className="text-xs font-bold text-[#0D2245] truncate max-w-[240px]">{product.title}</span>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Full Name <span className="text-amber-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., Rajesh Kumar"
                                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0D2245] focus:ring-1 focus:ring-[#0D2245] outline-none transition-all"
                                    />
                                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Email Address <span className="text-amber-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="rajesh@company.com"
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0D2245] focus:ring-1 focus:ring-[#0D2245] outline-none transition-all"
                                        />
                                        {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                                            Phone / WhatsApp <span className="text-amber-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+91 98765 43210"
                                            className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0D2245] focus:ring-1 focus:ring-[#0D2245] outline-none transition-all"
                                        />
                                        {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Estimated Requirement Quantity (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        placeholder="e.g., 2 Units / 5000 Tons capacity"
                                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0D2245] focus:ring-1 focus:ring-[#0D2245] outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                                        Additional Specifications or Message
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Please provide price quote, lead time, and technical specs..."
                                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0D2245] focus:ring-1 focus:ring-[#0D2245] outline-none transition-all resize-none"
                                    />
                                </div>

                                <div className="pt-2 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="text-xs font-bold text-slate-500 hover:text-slate-700 px-4 py-2.5 rounded-xl border border-slate-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-50 px-6 py-2.5 rounded-xl transition-all shadow-md"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Inquiry'}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
