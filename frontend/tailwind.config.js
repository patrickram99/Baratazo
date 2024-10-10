/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        plomo: '#4D4D4D',
        amarillo: '#FDCD11',
        azul: '#1A6DAF',
        blanco: '#FFFFFF',
        negro: '#151611',
        gris: '#D0D5DD',
        celeste: '#F5F7FF',
      },
    },
  },
  plugins: [],
}
