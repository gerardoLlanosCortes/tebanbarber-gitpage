/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        "agenda-bg-color": "#f8f8f8",
        "agenda-font-white": "#e2e2e2",
        "agenda-primary": "#324b4c",
        "agenda-primary-clear": "#4B6D6F",
        "agenda-black": "#324b4c",
        "agenda-gray": "#a5a5a5",
        "agenda-green": "#478641",
        "hora-agendada": "rgb(198, 198, 198)",
      },
      backgroundImage: {
        "agenda-hero-img": "url('./assets/img/teban-logo-black.jpeg')",
        "agenda-hero-img-web":
          "url('./assets/img/pagina/teban_barberia_3.jpg')",
      },

      width: {
        mobile: "80%",
        dekstop: "1000px",
      },
      screens: {
        xs: "360px",
      },
      boxShadow: {
        "btn-agenda": "0px 4px 6px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "pulse-brightness": {
          "0%, 100%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(130%)" },
        },
        "pulse-brightness-less": {
          "0%, 100%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(110%)" },
        },
      },
      animation: {
        "pulse-brightness": "pulse-brightness 2s ease-in-out infinite",
        "pulse-brightness-less":
          "pulse-brightness-less 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
