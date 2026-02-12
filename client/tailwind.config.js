/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // כחול עיקרי
        secondary: '#f1f5f9', // רקע בהיר
        accent: '#f59e42', // כתום
        background: '#f8fafc', // רקע כללי
      },
    },
  },
  plugins: [],
};
