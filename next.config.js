const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withVideos = require('next-videos');

module.exports = withVideos({
   i18n: {
      defaultLocale: 'ru',
      locales: ['uz', 'ru', 'en'],
   },
});