/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary:    '#0F172A',
        secondary:  '#334155',
        accent:     '#0369A1',
        gold:       '#B8960C',
        'gold-light': '#D4A829',
        background: '#F8FAFC',
        foreground: '#020617',
        muted:      '#E8ECF1',
        'muted-fg': '#64748B',
        border:     '#E2E8F0',
        card:       '#FFFFFF',
        destructive:'#DC2626',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      boxShadow: {
        'card':    '0 4px 6px rgba(0,0,0,0.07)',
        'card-hover': '0 10px 25px rgba(0,0,0,0.12)',
        'gold':    '0 4px 20px rgba(184,150,12,0.25)',
        'accent':  '0 4px 20px rgba(3,105,161,0.30)',
      },
      backgroundImage: {
        'hero-grid': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'float-slow':   'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite reverse',
        'count-up':     'countUp 1.2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%':      { transform: 'translateY(-20px) translateX(10px)' },
          '66%':      { transform: 'translateY(10px) translateX(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
