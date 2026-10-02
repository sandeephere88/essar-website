import React, { useState, useRef, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { assetUrl } from '@/Utils/asset';

const INDIA_COUNTRY = { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' };

const PINNED_COUNTRIES = [
    INDIA_COUNTRY,
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
];

const ALL_COUNTRIES = [
    INDIA_COUNTRY,
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
    { code: 'AF', name: 'Afghanistan', dialCode: '+93', flag: '🇦🇫' },
    { code: 'AL', name: 'Albania', dialCode: '+355', flag: '🇦🇱' },
    { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿' },
    { code: 'AD', name: 'Andorra', dialCode: '+376', flag: '🇦🇩' },
    { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴' },
    { code: 'AG', name: 'Antigua & Barbuda', dialCode: '+1268', flag: '🇦🇬' },
    { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
    { code: 'AM', name: 'Armenia', dialCode: '+374', flag: '🇦🇲' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
    { code: 'AZ', name: 'Azerbaijan', dialCode: '+994', flag: '🇦🇿' },
    { code: 'BS', name: 'Bahamas', dialCode: '+1242', flag: '🇧🇸' },
    { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
    { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
    { code: 'BB', name: 'Barbados', dialCode: '+1246', flag: '🇧🇧' },
    { code: 'BY', name: 'Belarus', dialCode: '+375', flag: '🇧🇾' },
    { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
    { code: 'BZ', name: 'Belize', dialCode: '+501', flag: '🇧🇿' },
    { code: 'BJ', name: 'Benin', dialCode: '+229', flag: '🇧🇯' },
    { code: 'BT', name: 'Bhutan', dialCode: '+975', flag: '🇧🇹' },
    { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴' },
    { code: 'BA', name: 'Bosnia & Herzegovina', dialCode: '+387', flag: '🇧🇦' },
    { code: 'BW', name: 'Botswana', dialCode: '+267', flag: '🇧🇼' },
    { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { code: 'BN', name: 'Brunei', dialCode: '+673', flag: '🇧🇳' },
    { code: 'BG', name: 'Bulgaria', dialCode: '+359', flag: '🇧🇬' },
    { code: 'BF', name: 'Burkina Faso', dialCode: '+226', flag: '🇧🇫' },
    { code: 'BI', name: 'Burundi', dialCode: '+257', flag: '🇧🇮' },
    { code: 'KH', name: 'Cambodia', dialCode: '+855', flag: '🇰🇭' },
    { code: 'CM', name: 'Cameroon', dialCode: '+237', flag: '🇨🇲' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'CV', name: 'Cape Verde', dialCode: '+238', flag: '🇨🇻' },
    { code: 'CF', name: 'Central African Republic', dialCode: '+236', flag: '🇨🇫' },
    { code: 'TD', name: 'Chad', dialCode: '+235', flag: '🇹🇩' },
    { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
    { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
    { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
    { code: 'KM', name: 'Comoros', dialCode: '+269', flag: '🇰🇲' },
    { code: 'CG', name: 'Congo', dialCode: '+242', flag: '🇨🇬' },
    { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷' },
    { code: 'HR', name: 'Croatia', dialCode: '+385', flag: '🇭🇷' },
    { code: 'CU', name: 'Cuba', dialCode: '+53', flag: '🇨🇺' },
    { code: 'CY', name: 'Cyprus', dialCode: '+357', flag: '🇨🇾' },
    { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
    { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
    { code: 'DJ', name: 'Djibouti', dialCode: '+253', flag: '🇩🇯' },
    { code: 'DM', name: 'Dominica', dialCode: '+1767', flag: '🇩🇲' },
    { code: 'DO', name: 'Dominican Republic', dialCode: '+1809', flag: '🇩🇴' },
    { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨' },
    { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
    { code: 'SV', name: 'El Salvador', dialCode: '+503', flag: '🇸🇻' },
    { code: 'GQ', name: 'Equatorial Guinea', dialCode: '+240', flag: '🇬🇶' },
    { code: 'ER', name: 'Eritrea', dialCode: '+291', flag: '🇪🇷' },
    { code: 'EE', name: 'Estonia', dialCode: '+372', flag: '🇪🇪' },
    { code: 'SZ', name: 'Eswatini', dialCode: '+268', flag: '🇸🇿' },
    { code: 'ET', name: 'Ethiopia', dialCode: '+251', flag: '🇪🇹' },
    { code: 'FJ', name: 'Fiji', dialCode: '+679', flag: '🇫🇯' },
    { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'GA', name: 'Gabon', dialCode: '+241', flag: '🇬🇦' },
    { code: 'GM', name: 'Gambia', dialCode: '+220', flag: '🇬🇲' },
    { code: 'GE', name: 'Georgia', dialCode: '+995', flag: '🇬🇪' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { code: 'GH', name: 'Ghana', dialCode: '+233', flag: '🇬🇭' },
    { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
    { code: 'GD', name: 'Grenada', dialCode: '+1473', flag: '🇬🇩' },
    { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹' },
    { code: 'GN', name: 'Guinea', dialCode: '+224', flag: '🇬🇳' },
    { code: 'GW', name: 'Guinea-Bissau', dialCode: '+245', flag: '🇬🇼' },
    { code: 'GY', name: 'Guyana', dialCode: '+592', flag: '🇬🇾' },
    { code: 'HT', name: 'Haiti', dialCode: '+509', flag: '🇭🇹' },
    { code: 'HN', name: 'Honduras', dialCode: '+504', flag: '🇭🇳' },
    { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
    { code: 'HU', name: 'Hungary', dialCode: '+36', flag: '🇭🇺' },
    { code: 'IS', name: 'Iceland', dialCode: '+354', flag: '🇮🇸' },
    { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
    { code: 'IR', name: 'Iran', dialCode: '+98', flag: '🇮🇷' },
    { code: 'IQ', name: 'Iraq', dialCode: '+964', flag: '🇮🇶' },
    { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
    { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
    { code: 'CI', name: 'Ivory Coast', dialCode: '+225', flag: '🇨🇮' },
    { code: 'JM', name: 'Jamaica', dialCode: '+1876', flag: '🇯🇲' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { code: 'JO', name: 'Jordan', dialCode: '+962', flag: '🇯🇴' },
    { code: 'KZ', name: 'Kazakhstan', dialCode: '+7', flag: '🇰🇿' },
    { code: 'KE', name: 'Kenya', dialCode: '+254', flag: '🇰🇪' },
    { code: 'KI', name: 'Kiribati', dialCode: '+686', flag: '🇰🇮' },
    { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
    { code: 'KG', name: 'Kyrgyzstan', dialCode: '+996', flag: '🇰🇬' },
    { code: 'LA', name: 'Laos', dialCode: '+856', flag: '🇱🇦' },
    { code: 'LV', name: 'Latvia', dialCode: '+371', flag: '🇱🇻' },
    { code: 'LB', name: 'Lebanon', dialCode: '+961', flag: '🇱🇧' },
    { code: 'LS', name: 'Lesotho', dialCode: '+266', flag: '🇱🇸' },
    { code: 'LR', name: 'Liberia', dialCode: '+231', flag: '🇱🇷' },
    { code: 'LY', name: 'Libya', dialCode: '+218', flag: '🇱🇾' },
    { code: 'LI', name: 'Liechtenstein', dialCode: '+423', flag: '🇱🇮' },
    { code: 'LT', name: 'Lithuania', dialCode: '+370', flag: '🇱🇹' },
    { code: 'LU', name: 'Luxembourg', dialCode: '+352', flag: '🇱🇺' },
    { code: 'MO', name: 'Macao', dialCode: '+853', flag: '🇲🇴' },
    { code: 'MG', name: 'Madagascar', dialCode: '+261', flag: '🇲🇬' },
    { code: 'MW', name: 'Malawi', dialCode: '+265', flag: '🇲🇼' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
    { code: 'MV', name: 'Maldives', dialCode: '+960', flag: '🇲🇻' },
    { code: 'ML', name: 'Mali', dialCode: '+223', flag: '🇲🇱' },
    { code: 'MT', name: 'Malta', dialCode: '+356', flag: '🇲🇹' },
    { code: 'MH', name: 'Marshall Islands', dialCode: '+692', flag: '🇲🇭' },
    { code: 'MR', name: 'Mauritania', dialCode: '+222', flag: '🇲🇷' },
    { code: 'MU', name: 'Mauritius', dialCode: '+230', flag: '🇲🇺' },
    { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
    { code: 'FM', name: 'Micronesia', dialCode: '+691', flag: '🇫🇲' },
    { code: 'MD', name: 'Moldova', dialCode: '+373', flag: '🇲🇩' },
    { code: 'MC', name: 'Monaco', dialCode: '+377', flag: '🇲🇨' },
    { code: 'MN', name: 'Mongolia', dialCode: '+976', flag: '🇲🇳' },
    { code: 'ME', name: 'Montenegro', dialCode: '+382', flag: '🇲🇪' },
    { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦' },
    { code: 'MZ', name: 'Mozambique', dialCode: '+258', flag: '🇲🇿' },
    { code: 'MM', name: 'Myanmar', dialCode: '+95', flag: '🇲🇲' },
    { code: 'NA', name: 'Namibia', dialCode: '+264', flag: '🇳🇦' },
    { code: 'NR', name: 'Nauru', dialCode: '+674', flag: '🇳🇷' },
    { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
    { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
    { code: 'NI', name: 'Nicaragua', dialCode: '+505', flag: '🇳🇮' },
    { code: 'NE', name: 'Niger', dialCode: '+227', flag: '🇳🇪' },
    { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
    { code: 'MK', name: 'North Macedonia', dialCode: '+389', flag: '🇲🇰' },
    { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
    { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
    { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
    { code: 'PW', name: 'Palau', dialCode: '+680', flag: '🇵🇼' },
    { code: 'PS', name: 'Palestine', dialCode: '+970', flag: '🇵🇸' },
    { code: 'PA', name: 'Panama', dialCode: '+507', flag: '🇵🇦' },
    { code: 'PG', name: 'Papua New Guinea', dialCode: '+675', flag: '🇵🇬' },
    { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾' },
    { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
    { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
    { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
    { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
    { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
    { code: 'RO', name: 'Romania', dialCode: '+40', flag: '🇷🇴' },
    { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
    { code: 'RW', name: 'Rwanda', dialCode: '+250', flag: '🇷🇼' },
    { code: 'KN', name: 'Saint Kitts & Nevis', dialCode: '+1869', flag: '🇰🇳' },
    { code: 'LC', name: 'Saint Lucia', dialCode: '+1758', flag: '🇱🇨' },
    { code: 'VC', name: 'St. Vincent & Grenadines', dialCode: '+1784', flag: '🇻🇨' },
    { code: 'WS', name: 'Samoa', dialCode: '+685', flag: '🇼🇸' },
    { code: 'SM', name: 'San Marino', dialCode: '+378', flag: '🇸🇲' },
    { code: 'ST', name: 'Sao Tome & Principe', dialCode: '+239', flag: '🇸🇹' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
    { code: 'SN', name: 'Senegal', dialCode: '+221', flag: '🇸🇳' },
    { code: 'RS', name: 'Serbia', dialCode: '+381', flag: '🇷🇸' },
    { code: 'SC', name: 'Seychelles', dialCode: '+248', flag: '🇸🇨' },
    { code: 'SL', name: 'Sierra Leone', dialCode: '+232', flag: '🇸🇱' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
    { code: 'SK', name: 'Slovakia', dialCode: '+421', flag: '🇸🇰' },
    { code: 'SI', name: 'Slovenia', dialCode: '+386', flag: '🇸🇮' },
    { code: 'SB', name: 'Solomon Islands', dialCode: '+677', flag: '🇸🇧' },
    { code: 'SO', name: 'Somalia', dialCode: '+252', flag: '🇸🇴' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
    { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
    { code: 'SS', name: 'South Sudan', dialCode: '+211', flag: '🇸🇸' },
    { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
    { code: 'LK', name: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰' },
    { code: 'SD', name: 'Sudan', dialCode: '+249', flag: '🇸🇩' },
    { code: 'SR', name: 'Suriname', dialCode: '+597', flag: '🇸🇷' },
    { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
    { code: 'SY', name: 'Syria', dialCode: '+963', flag: '🇸🇾' },
    { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼' },
    { code: 'TJ', name: 'Tajikistan', dialCode: '+992', flag: '🇹🇯' },
    { code: 'TZ', name: 'Tanzania', dialCode: '+255', flag: '🇹🇿' },
    { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
    { code: 'TL', name: 'Timor-Leste', dialCode: '+670', flag: '🇹🇱' },
    { code: 'TG', name: 'Togo', dialCode: '+228', flag: '🇹🇬' },
    { code: 'TO', name: 'Tonga', dialCode: '+676', flag: '🇹🇴' },
    { code: 'TT', name: 'Trinidad & Tobago', dialCode: '+1868', flag: '🇹🇹' },
    { code: 'TN', name: 'Tunisia', dialCode: '+216', flag: '🇹🇳' },
    { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
    { code: 'TM', name: 'Turkmenistan', dialCode: '+993', flag: '🇹🇲' },
    { code: 'TV', name: 'Tuvalu', dialCode: '+688', flag: '🇹🇻' },
    { code: 'UG', name: 'Uganda', dialCode: '+256', flag: '🇺🇬' },
    { code: 'UA', name: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
    { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
    { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾' },
    { code: 'UZ', name: 'Uzbekistan', dialCode: '+998', flag: '🇺🇿' },
    { code: 'VU', name: 'Vanuatu', dialCode: '+678', flag: '🇻🇺' },
    { code: 'VA', name: 'Vatican City', dialCode: '+39', flag: '🇻🇦' },
    { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪' },
    { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
    { code: 'YE', name: 'Yemen', dialCode: '+967', flag: '🇾🇪' },
    { code: 'ZM', name: 'Zambia', dialCode: '+260', flag: '🇿🇲' },
    { code: 'ZW', name: 'Zimbabwe', dialCode: '+263', flag: '🇿🇼' },
];

function CountryCodeSelect({ selectedCountry, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef(null);
    const searchInputRef = useRef(null);

    // Auto-focus search input whenever popover opens
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                    searchInputRef.current.select();
                }
            }, 30);
            return () => clearTimeout(timer);
        } else {
            setSearchQuery('');
            setHighlightedIndex(0);
        }
    }, [isOpen]);

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCountries = searchQuery.trim()
        ? ALL_COUNTRIES.filter(c =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.dialCode.includes(searchQuery)
        )
        : ALL_COUNTRIES;

    // Reset highlighted index when search query changes
    useEffect(() => {
        setHighlightedIndex(0);
    }, [searchQuery]);

    const handleKeyDown = (e) => {
        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                setIsOpen(true);
            } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                setIsOpen(true);
                setSearchQuery(e.key);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => Math.min(prev + 1, filteredCountries.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredCountries[highlightedIndex]) {
                onSelect(filteredCountries[highlightedIndex]);
                setIsOpen(false);
            }
        } else if (e.key === 'Escape') {
            e.preventDefault();
            setIsOpen(false);
        } else if (e.key === 'Tab') {
            setIsOpen(false);
        }
    };

    return (
        <div ref={containerRef} className="relative inline-block text-left shrink-0" onKeyDown={handleKeyDown}>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(prev => !prev);
                }}
                aria-label="Select country code"
                className="flex items-center gap-1.5 px-3 py-3 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 border-r border-slate-200 rounded-l-lg select-none transition-colors focus:outline-none focus:ring-2 focus:ring-[#00897b] shrink-0"
            >
                <span className="text-slate-800 font-extrabold">{selectedCountry.dialCode}</span>
                <svg className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-[100] p-2.5 flex flex-col max-h-80 text-left">
                    <div className="mb-2 pb-1 border-b border-slate-100">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Type to search country or code..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 border-none rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#00897b] outline-none"
                        />
                    </div>
                    <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
                        {filteredCountries.map((c, idx) => (
                            <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                    onSelect(c);
                                    setIsOpen(false);
                                }}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-xl text-left transition-colors ${highlightedIndex === idx
                                        ? 'bg-[#00897b]/10 font-bold text-[#00897b]'
                                        : selectedCountry.code === c.code
                                            ? 'bg-slate-100 font-semibold text-slate-800'
                                            : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <span className="flex items-center gap-2.5 truncate pr-2">
                                    <span className="truncate">{c.name}</span>
                                </span>
                                <span className="font-semibold text-slate-500 shrink-0">{c.dialCode}</span>
                            </button>
                        ))}
                        {filteredCountries.length === 0 && (
                            <div className="p-3 text-center text-xs text-slate-400">
                                No matching country found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ContactForm({ titleBefore = "Talk to our", titleAccent = "team", description }) {
    const { flash, captcha, businessProfile } = usePage().props;

    const profile = businessProfile;
    const phone = profile?.phone_numbers?.[0]?.number || '+91 98470 00000';
    const email = profile?.email || 'info@essartechins.co.in';
    const address = profile?.address || 'Aluva, Ernakulam, Kerala, India — 683101';
    const companyName = profile?.name || 'Essar Techins';

    const [selectedCountry, setSelectedCountry] = useState(INDIA_COUNTRY);
    const [phoneNumber, setPhoneNumber] = useState('');

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: 'business_inquiry',
        message: '',
        agreed: false,
        captcha: '',
    });

    const handlePhoneChange = (val) => {
        setPhoneNumber(val);
        const fullPhone = val.trim() ? `${selectedCountry.dialCode} ${val.trim()}` : '';
        setData('phone', fullPhone);
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        const fullPhone = phoneNumber.trim() ? `${country.dialCode} ${phoneNumber.trim()}` : '';
        setData('phone', fullPhone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.submit'), {
            onSuccess: () => {
                reset('first_name', 'last_name', 'email', 'phone', 'message', 'captcha');
                setPhoneNumber('');
                setSelectedCountry(INDIA_COUNTRY);
            },
        });
    };

    return (
        <section className="py-10 sm:py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                {(titleBefore || titleAccent || description) && (
                    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                        {(titleBefore || titleAccent) && (
                            <h2 className="text-2xl sm:text-4xl font-sans font-bold text-[#052b4d] tracking-tight">
                                {titleBefore}{titleAccent ? <> <span className="text-[#00897b] italic font-serif">{titleAccent}</span></> : ''}
                            </h2>
                        )}
                        {description && (
                            <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-line">
                                {description}
                            </p>
                        )}
                    </div>
                )}

                {/* Main 2-column grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

                    {/* Left Column: Contact Details Card */}
                    <div className="lg:col-span-5 bg-[#0D2245] text-white rounded-[28px] p-6 sm:p-9 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[460px]">
                        {/* Background radial highlight */}
                        <div className="absolute inset-0 opacity-15 pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle, #F59E0B 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            <div>
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                    Contact Details
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                                    Get in <span className="text-amber-400">Touch</span>
                                </h3>
                                <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                                    Have questions about our Copra Dryers, Oil Processing Plants, or custom industrial machinery? Contact our sales & engineering team.
                                </p>
                            </div>

                            {/* Contact Details List */}
                            <div className="space-y-5 pt-2">
                                {/* Phone */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">Phone Number</h4>
                                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors block mt-0.5">
                                            {phone}
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">Email Address</h4>
                                        <a href={`mailto:${email}`} className="text-xs sm:text-sm font-semibold text-white/90 hover:text-amber-400 transition-colors block mt-0.5 break-all">
                                            {email}
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="11" r="3" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">Factory & Location</h4>
                                        <p className="text-xs sm:text-sm font-medium text-white/80 leading-relaxed mt-0.5">
                                            {address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Badges footer */}
                        <div className="relative z-10 pt-5 border-t border-white/10 flex flex-wrap gap-2 mt-6">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                                GST Verified
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                                Pan India Delivery
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                                Est. 2000
                            </span>
                        </div>
                    </div>

                    {/* Right Column Form Container */}
                    <div className="lg:col-span-7 bg-[#EAEAEA] rounded-[28px] p-6 sm:p-10 shadow-sm relative flex flex-col justify-center">

                        {(recentlySuccessful || flash?.success) && (
                            <div className="mb-6 p-4 bg-[#E8F5E9] border border-[#00897B] text-[#004d40] rounded-xl text-xs font-bold flex items-center gap-2">
                                <span>✓</span>
                                <span>{flash?.success || 'Thank you for reaching out! We will contact you shortly.'}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* First Name + Last Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        First name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter the name"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        className="w-full bg-white border-none rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#00897b] outline-none shadow-sm"
                                    />
                                    {errors.first_name && <p className="text-red-500 text-[10px] mt-1">{errors.first_name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Last name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter the name"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        className="w-full bg-white border-none rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#00897b] outline-none shadow-sm"
                                    />
                                    {errors.last_name && <p className="text-red-500 text-[10px] mt-1">{errors.last_name}</p>}
                                </div>
                            </div>

                            {/* Phone Number + Email Address */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative flex bg-white rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-[#00897b]">
                                        <CountryCodeSelect
                                            selectedCountry={selectedCountry}
                                            onSelect={handleCountrySelect}
                                        />
                                        <input
                                            type="tel"
                                            required
                                            placeholder="Phone Number"
                                            value={phoneNumber}
                                            onChange={e => handlePhoneChange(e.target.value)}
                                            className="flex-1 bg-white border-none rounded-r-lg px-3 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none min-w-0"
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your Email Address"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-white border-none rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#00897b] outline-none shadow-sm"
                                    />
                                    {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            {/* Inquiry Category */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-2">
                                    I'm looking for... <span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-700">
                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="business_inquiry"
                                            checked={data.role === 'business_inquiry' || data.role === 'health_care_organization'}
                                            onChange={e => setData('role', e.target.value)}
                                            className="w-4 h-4 text-[#052b4d] focus:ring-[#052b4d] border-slate-300"
                                        />
                                        <span>Product / Machine Quote</span>
                                    </label>

                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="technical_support"
                                            checked={data.role === 'technical_support' || data.role === 'professional_looking_for_work'}
                                            onChange={e => setData('role', e.target.value)}
                                            className="w-4 h-4 text-[#052b4d] focus:ring-[#052b4d] border-slate-300"
                                        />
                                        <span>Technical Support / Service</span>
                                    </label>

                                    <label className="inline-flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="others"
                                            checked={data.role === 'others'}
                                            onChange={e => setData('role', e.target.value)}
                                            className="w-4 h-4 text-[#052b4d] focus:ring-[#052b4d] border-slate-300"
                                        />
                                        <span>Others</span>
                                    </label>
                                </div>
                                {errors.role && <p className="text-red-500 text-[10px] mt-1">{errors.role}</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <textarea
                                    rows={4}
                                    placeholder="Please write your message"
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    className="w-full bg-white border-none rounded-lg p-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#00897b] outline-none shadow-sm resize-none"
                                />
                                {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>}
                            </div>

                            {/* Math Captcha Check if present */}
                            {captcha?.question && (
                                <div className="bg-white rounded-lg p-3 flex items-center justify-between gap-4 shadow-sm">
                                    <div className="text-xs font-medium text-slate-600">
                                        Security Check: <span className="font-bold text-slate-800">{captcha.question}</span>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Answer"
                                        value={data.captcha}
                                        onChange={e => setData('captcha', e.target.value)}
                                        required
                                        className="w-24 bg-slate-50 border border-slate-200 rounded-md px-3 py-1.5 text-xs text-center text-slate-800 focus:ring-1 focus:ring-[#00897b]"
                                    />
                                </div>
                            )}
                            {errors.captcha && <p className="text-red-500 text-[10px] -mt-2">{errors.captcha}</p>}

                            {/* Checkbox + Submit */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                                <label className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 cursor-pointer max-w-lg">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={data.agreed}
                                        onChange={e => setData('agreed', e.target.checked)}
                                        className="mt-0.5 w-4 h-4 rounded text-[#052b4d] focus:ring-[#052b4d] border-slate-300 shrink-0"
                                    />
                                    <span>
                                        I agree to my personal data being processed in accordance with {companyName} privacy policy and communication about its services.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#032541] hover:bg-[#06355c] text-white px-8 py-3 rounded-full text-xs sm:text-sm font-extrabold tracking-wide shadow-md transition-all hover:scale-[1.02] disabled:opacity-50 self-end sm:self-auto shrink-0"
                                >
                                    {processing ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </section>
    );
}
