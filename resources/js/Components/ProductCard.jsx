import { Link } from '@inertiajs/react';
import { storageUrl } from '@/Utils/asset';

/**
 * Reusable product card used on Home, Categories/Show, and Services/Index.
 * Props:
 *   product  — { id, title, slug, short_description, image_url, price, price_unit, min_order_qty, is_featured, category }
 *   compact  — boolean, renders smaller card (default false)
 */
export default function ProductCard({ product, compact = false }) {
    const imgSrc = product.image_url
        ? (product.image_url.startsWith('http') ? product.image_url : storageUrl(product.image_url))
        : null;

    const initials = (product.title || 'P')
        .split(' ')
        .slice(0, 2)
        .map(w => w[0])
        .join('')
        .toUpperCase();

    const priceDisplay = product.price
        ? `${product.price}${product.price_unit ? ' / ' + product.price_unit : ''}`
        : null;

    return (
        <div className={`group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden ${compact ? 'text-sm' : ''}`}>

            {/* Image / Fallback */}
            <div className={`relative overflow-hidden bg-slate-100 ${compact ? 'h-40' : 'h-52'}`}>
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0D2245] to-[#1a3a6c]">
                        <div className="text-center">
                            <span className="block text-3xl font-black text-white/20 leading-none">{initials}</span>
                            <svg className="w-10 h-10 text-amber-400/40 mx-auto mt-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Featured Badge */}
                {product.is_featured && (
                    <span className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                        ★ Featured
                    </span>
                )}

                {/* Category Tag */}
                {product.category?.name && (
                    <span className="absolute bottom-2.5 left-2.5 bg-[#0D2245]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {product.category.name}
                    </span>
                )}
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col gap-3">
                <h3 className="font-bold text-slate-900 group-hover:text-[#0D2245] transition-colors leading-snug line-clamp-2" style={{ fontSize: compact ? '14px' : '15px' }}>
                    {product.title}
                </h3>

                {product.short_description && (
                    <p className="text-[12.5px] text-slate-500 line-clamp-2 leading-relaxed flex-1">
                        {product.short_description}
                    </p>
                )}

                {/* Price */}
                {priceDisplay && (
                    <div className="flex items-center gap-2 pt-1">
                        <div className="flex items-baseline gap-1">
                            <span className="text-[15px] font-black text-[#0D2245]">{product.price}</span>
                            {product.price_unit && (
                                <span className="text-[11px] font-semibold text-slate-400">/ {product.price_unit}</span>
                            )}
                        </div>
                        {product.min_order_qty && (
                            <span className="ml-auto text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                                Min: {product.min_order_qty}
                            </span>
                        )}
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                    <Link
                        href={route('services.show', product.slug)}
                        className="flex-1 text-center text-[12.5px] font-bold text-white bg-[#0D2245] hover:bg-[#0a1c3d] px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                    >
                        View Details
                    </Link>
                    <Link
                        href={route('contact')}
                        className="flex-1 text-center text-[12.5px] font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-2.5 rounded-xl transition-all duration-200"
                    >
                        Get Quote
                    </Link>
                </div>
            </div>
        </div>
    );
}
