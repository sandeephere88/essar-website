import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', '"DM Sans"', ...defaultTheme.fontFamily.sans],
                primary: ['"DM Sans"', 'Figtree', ...defaultTheme.fontFamily.sans],
                body: ['Figtree', '"DM Sans"', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                'h1': ['86px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'h2': ['44px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
                'h3': ['36px', { lineHeight: '1.25' }],
                'h4': ['24px', { lineHeight: '1.3' }],
                'h5': ['20px', { lineHeight: '1.4' }],
                'h6': ['18px', { lineHeight: '1.4' }],
                'body': ['16px', { lineHeight: '1.5' }],
                'caption': ['14px', { lineHeight: '1.4' }],
            },
            colors: {
                brand: {
                    teal: '#008077',
                    tealDark: '#005C56',
                    tealLight: '#E6F5F2',
                    navy: '#0A2540',
                    navyHover: '#061729',
                    iceBlue: '#E6F4F8',
                    lavender: '#EDEAF4',
                    bg: '#F8FAFC',
                    primary: '#008077',
                    secondary: '#E6F5F2',
                    accent: '#0A2540',
                    background: '#F8FAFC',
                }
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            }
        },
    },

    plugins: [forms, typography],
};
