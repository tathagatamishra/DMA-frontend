/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink1: "#F54040",
        pink2: "rgba(254, 113, 113, 0.12);",
        pBar: "#DFDBD8",
        cWhite: "#FFFFFF",
        navBack: "rgba(255, 255, 255, 0.12);",
        cGrey: "#817C7C",
        purple:"#6B65DA"
      },
      animation: {
        marquee: "marquee 26s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(calc(-100% - 32px))" },
        },
      },
      // backgroundImage: {
      //   gradientradial: 'radial-gradient(var(--tw-gradient-stops))',
      // }
    },
    screens: {
      fold:"280px",
     xxsm:"300px",
      xssm:"320p",
      xsm: "340px",
      xsm1:"360px",
      xsm11:"380px",
      xsm2: "420px",
      xsm3:"480px",
      sm: "568px",
      sm2: "650px",
      smd: "720px",
      md: "768px",
      md2: "800px",
      md22:"825px",
      md3: "860px",
      md4: "900px",
      lg: "1024px",
      ex: "1160px",
      ex2: "1240px",
      xl: "1280px",
      "2xl": "1536px",

      // custom screens used in chooseProfile & template&Design
      'custom': '675px',
      'custom2': '400px',
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
