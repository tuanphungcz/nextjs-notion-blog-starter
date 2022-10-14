module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.tsx',
    './lib/**/*.tsx'
  ],
  theme: {
    extend: {
      fontSize: {
        base: [
          '1rem',
          {
            lineHeight: '1.75rem'
          }
        ],
        sm: [
          '0.875rem',
          {
            lineHeight: '1.5rem'
          }
        ]
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
