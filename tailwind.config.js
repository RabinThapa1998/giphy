/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            container:{
                center: true,
                screens: {
                    '2xl': '1400px',
                },
                padding:{
                    DEFAULT: '1rem',
                    sm: '2rem',
                    lg: '4rem',
                    '2xl': '6rem',
                }
            },
            borderRadius:{
                'primary': '0.5rem',
            },
            colors:{
                primary: '#F15897',
                dark:"#121212"
            }
        },
    },
    plugins: [],
};
