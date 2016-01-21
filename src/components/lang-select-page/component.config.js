'use strict';

module.exports = {
  // You can define multiple variants
  'lang-select-page': {
    styles: ['./styles/lang-select-page.scss'],
    scripts: ['./scripts/lang-switcher.js'],
    assets: [{
      src: './images/**',
      dest: 'images'
    }],
    templates: ['./templates/*.html'],
    dependencies: ['core']
  }
};
