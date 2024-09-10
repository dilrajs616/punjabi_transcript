module.exports = {
  content: ["./app/views/**/*.{html,js,ejs,css}", "./public/**/*.{html,js,css}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
};
