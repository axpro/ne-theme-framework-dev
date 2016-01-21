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
        src: './fonts/**',
        dest: 'fonts'
      },
      {
        src: './images/**',
        dest: 'images'
      }
    ],
    templates: [
      './templates/*.html'
    ],
    docs: [
      {
        id: 'core-test',
        parent: 'core',
        title: 'Hello',
        page: 'test.md'
      }
    ]
  }
};
