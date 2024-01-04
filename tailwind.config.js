/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'primaryColor': '#172E4A',
      'seccondaryColor': '#2E4057',
      'whiteText': '#FFF',
      'red': '#AB141D',
      'blackText': '#252525',
      'background': '#FFF'
    },
    screens: {
      'sm': { 'min': '280px', 'max': '700px' }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mobile-hero-pattern': "url('/landing/section1-mobile-background.svg')",
        'hero-pattern': "url('/landing/section1-desktop-background.svg')",
        'section2-gradiant': 'linear-gradient(110deg, #172E4A 3.16%, #2E4057 102.08%)'
      },
    },
  },
  plugins: [],
}
