/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom 3-color palette
        'primary-purple': '#5e17eb',
        'primary-cream': '#f7f3ec', 
        'primary-yellow': '#ffde59',
        
        // Variations and utilities
        'purple': {
          50: '#f4f1ff',
          100: '#ebe5ff',
          200: '#d9ceff',
          300: '#bea6ff',
          400: '#9f75ff',
          500: '#8344ff',
          600: '#5e17eb', // Main purple
          700: '#5a1dd8',
          800: '#4c1ab5',
          900: '#401993',
        },
        'cream': {
          50: '#fefdfb',
          100: '#f7f3ec', // Main cream
          200: '#f0e9d6',
          300: '#e8dcc0',
          400: '#e0cfaa',
          500: '#d8c294',
          600: '#c9a876',
          700: '#b08d58',
          800: '#97723a',
          900: '#7e571c',
        },
        'yellow': {
          50: '#fffef0',
          100: '#fffadb',
          200: '#fff4b8',
          300: '#ffeb8a',
          400: '#ffde59', // Main yellow
          500: '#ffcc02',
          600: '#e6a300',
          700: '#cc7a00',
          800: '#b35100',
          900: '#992800',
        },
        
        // Semantic colors
        'background': '#f7f3ec',
        'foreground': '#5e17eb',
        'accent': '#ffde59',
        'muted': '#e8dcc0',
        'border': '#d8c294',
      },
      fontFamily: {
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(94, 23, 235, 0.15)',
        'elegant-lg': '0 8px 30px rgba(94, 23, 235, 0.2)',
        'glow': '0 0 20px rgba(255, 222, 89, 0.4)',
        'glow-lg': '0 0 40px rgba(255, 222, 89, 0.6)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 2s',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(255, 222, 89, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 222, 89, 0.6)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      borderRadius: {
        'elegant': '12px',
        'elegant-lg': '16px',
        'elegant-xl': '20px',
      },
    },
  },
  plugins: [],
} 