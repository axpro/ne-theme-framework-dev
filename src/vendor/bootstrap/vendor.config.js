'use strict';

module.exports = {
  main: {
    styles: [
      './styles/bootstrap.scss'
    ],
    scripts: [
      './scripts/bootstrap.js'
    ],
    assets: [
      {
        src: '../../../bower_components/bootstrap-sass/assets/fonts/bootstrap/**',
        dest: 'fonts'
      }
    ]
  }
};
