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
      'mac': { 'min': '1400px', 'max': '1680px' },
      'mini-tablet': { 'min': '601px', 'max': '821px' },
      'tablet': { 'min': '822px', 'max': '1399px' },
      'lg': { 'min': '1681px' },
      'tablet-pro': { 'raw': '(min-height: 1200px)', 'min': '822px', 'max': '1399px' }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mobile-hero-pattern': "url('/landing/section1-mobile-background.svg')",
        'hero-pattern': "url('/landing/section1-desktop-background.svg')",
        'hero-tablet-pattern': "url('/landing/section1-tablet-background.svg')",
        'hero-miniTablet-pattern': "url('/landing/hero section tablet.svg')",
        'hero-tabletPro-pattern': "url('/landing/sectin1-tabletPro-background.svg')",
        'hero-mac-pattern': "url('/landing/section1-mac-background.svg')",
        'progresive-pattern': "url('/landing/progresive.svg')",
        'fqa-pattern': "url('/fqa/FQA.svg')",
        'login-pattern': 'url("/signIn/background.svg")',
        'section2-gradiant': 'linear-gradient(110deg, #172E4A 3.16%, #2E4057 102.08%)',
        'features-card': 'linear-gradient(91deg, #F3F3F3 1.17%, rgba(252, 252, 252, 0.56) 43.1%, #ECF0F4 96.61%)',
        'divider-gradiant': 'linear-gradient(90deg, #D4DCE7 3.15%, rgba(104, 122, 146, 0.30) 104.87%)',
        'arrow-icon': 'linear-gradient(141deg, #B5C0CE 0%, rgba(234, 234, 234, 0.20) 83.58%)',
        'section7-gradiant': 'linear-gradient(90deg, #F4DEDF, #DBE8F2)',
        'token-gradiant': 'linear-gradient(180deg, #2E4057 0.14%, #626E7E 100.14%)',
        'login-mobile-pattern': 'url("/signIn/mobile-background.svg")',
        'F&Q-pattern': "url('/landing/f&q.svg')",
        'Features-pattern': "url('/landing/Features.svg')",
        'howItWorks-pattern': "url('/landing/how it works.svg')",
        'joinNow-pattern': "url('/landing/join now.svg')",
        'footer-pattern': "url('/landing/footer.svg')",
        'featuresPage-pattern': "url('/landing/Features page.svg')",
      },
    },
  },
  plugins: [],
}
