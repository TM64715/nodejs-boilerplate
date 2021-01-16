module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: ["OFL Sorts Mill Goudy"]
    },
    colors: {
      blue: '#141726',
      gray: "#d9d9d9",
      lightGreen: "#26a6a6",
      darkgreen: "#106973"
    },
    // minHeight: {
    //   '0': '0',
    //   '1/4': '25%',
    //   '1/2': '50%',
    //   '3/4': '75%',
    //   'full': '100%',
    // },
    extend: {
      backgroundImage: theme => ({
        'tsunami': "url('./img/tsunami.png')",
        'tsunami2': "url('./img/tsunami@2x.png'); background-color: #141726"
      }),
      boxShadow: theme => ({
        gray: `0 4px 14px 0 ${theme("colors.lightGreen")}`,
      }),
      animation: {
        'slideIn': 'slideIn 2s ease-in'
      },
      keyframes: {
        slideIn: {
          from: {'marginLeft': "100%", width: "300%"},
          to: {"marginLeft": "0%", width: "100%"}
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
