'use strict';

module.exports = {
  // You can define multiple variants
  checkbox: {
    styles: [
      './styles/checkbox.scss'
    ],
    templates: [
      './templates/checkbox.html'
    ],
    assets: [
      {
        src: './images/**',
        dest: 'images'
      }
    ]
  }
};
