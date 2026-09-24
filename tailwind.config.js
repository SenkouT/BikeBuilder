module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { ink: '#14211b', pine: '#176b4d', mint: '#dff5e9', cream: '#f6f6f1' },
      boxShadow: { soft: '0 10px 30px rgba(20, 33, 27, 0.08)' },
    },
  },
  plugins: [],
};
