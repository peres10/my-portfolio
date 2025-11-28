/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  safelist: [
    'blur-sm', 'blur-md', 'blur-lg',
    'backdrop-blur-sm', 'backdrop-blur-md', 'backdrop-blur-lg'
  ], // Prevents purging
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backdropBlur: { // Fixed: backdropBlur, not backdropFilter
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
      },
    },
  },
  plugins: [],
}