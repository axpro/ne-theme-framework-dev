'use strict';

module.exports = {
  // You can define multiple variants
  main: {
    styles: [
      './styles/core.scss'
    ],
    scripts: [
      './scripts/core.js'
    ],
    assets: [
      {
        src: '../../bower_components/bootstrap-sass/assets/fonts/bootstrap/**',
        dest: 'fonts'
      },
      {
        src: './fonts/**',
        dest: 'fonts'
      },
      {
        src: './images/**',
        dest: 'images'
      }
    ]
  }
};
