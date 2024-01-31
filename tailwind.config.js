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
      'background': '#FFF',
      'grayColor': '#626E7E',
      'navyBlue': '#12263E'
    },
    screens: {
      'sm': { 'min': '280px', 'max': '600px' },
      'mac': { 'min': '1440px', 'max': '1680px' },
      'tablet': { 'min': '601px', 'max': '1280px' },
      'lg': { 'min': '1681px' },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mobile-hero-pattern': "url('/landing/section1-mobile-background.svg')",
        'hero-pattern': "url('/landing/section1-desktop-background.svg')",
        'hero-mac-pattern': "url('/landing/section1-mac-background.svg')",
        'fqa-pattern': "url('/fqa/FQA.svg')",
        'login-pattern': 'url("/signIn/background.svg")',
        'section2-gradiant': 'linear-gradient(110deg, #172E4A 3.16%, #2E4057 102.08%)',
        'features-card': 'linear-gradient(91deg, #F3F3F3 0.35%, rgba(247, 247, 247, 0.22) 41.43%, #F3EEEF 96.6%)',
        'section4-gradiant': 'linear-gradient(110deg, #172E4A 3.16%, #2E4057 102.08%)',
        'divider-gradiant': 'linear-gradient(90deg, #D4DCE7 3.15%, rgba(104, 122, 146, 0.30) 104.87%)',
        'arrow-icon': 'linear-gradient(141deg, #B5C0CE 0%, rgba(234, 234, 234, 0.20) 83.58%)',
        'section7-gradiant': 'linear-gradient(90deg, #F4DEDF, #DBE8F2)',
        'token-gradiant': 'linear-gradient(180deg, #2E4057 0.14%, #626E7E 100.14%)',
        'login-mobile-pattern': 'url("/signIn/mobile-background.svg")'
      },
    },
  },
  plugins: [],
}
