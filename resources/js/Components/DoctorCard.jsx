import { Link } from '@inertiajs/react';

/**
 * DoctorCard — reusable card used on homepage, department pages and doctor listings.
 *
 * Props:
 *  doctor: { name, slug, designation, specialization, experience_years,
 *             image_url, department_name, department_slug }
 *  compact?: boolean  — smaller layout for grids
 */
export default function DoctorCard({ doctor, compact = false }) {
    const {
        name,
        slug,
        designation,
        specialization,
        experience_years: exp,
        image_url,
        department_name,
        department_slug,
    } = doctor;

    return (
        <Link
            href={`/doctors/${slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
            {/* Avatar */}
            <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100 ${compact ? 'h-36' : 'h-52'}`}>
                {image_url ? (
                    <img
                        src={image_url}
                        alt={name}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="text-6xl select-none">👨‍⚕️</span>
                )}

                {/* Department badge */}
                {department_name && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-teal-700/90 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                        {department_name}
                    </span>
                )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                    {designation}
                </p>
                <h3 className="mt-1 text-base font-bold text-gray-800 group-hover:text-teal-700 transition">
                    {name}
                </h3>
                {specialization && (
                    <p className="mt-0.5 text-sm text-gray-500 line-clamp-1">{specialization}</p>
                )}

                {/* Footer meta */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">
                        {exp > 0 ? `${exp} yrs experience` : ''}
                    </span>
                    <span className="text-xs font-medium text-teal-600 group-hover:underline">
                        View Profile →
                    </span>
                </div>
            </div>
        </Link>
    );
}
