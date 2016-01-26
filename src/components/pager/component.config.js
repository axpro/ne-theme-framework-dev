'use strict';

module.exports = {
  pager: {
    styles: ['./styles/pager.scss'],
    scripts: ['./scripts/pager.js'],
    templates: ['./templates/pager.html'],
    assets: [
      {
        src: './images/**',
        dest: 'images'
      }
    ]
  }
};
