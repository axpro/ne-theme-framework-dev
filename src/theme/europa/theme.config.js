'use strict';

module.exports = {
  assets: [
    {
      src: 'src/core/{fonts,images}/**',
      dest: 'build/europa'
    },
    {
      src: 'src/components/{fonts,images}/**',
      dest: 'build/europa'
    },
    {
      src: 'docs/*.md',
      dest: 'build/europa'
    },
    {
      src: 'docs/book.json',
      dest: 'build/europa'
    },
    {
      src: 'docs/styles.css',
      dest: 'build/europa'
    },
    {
      src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/**',
      dest: 'build/europa/fonts/'
    }
  ],
  // Scripts to process
  scripts: [
    'src/theme/europa/scripts/europa.js'
  ],
  // Styles to process
  styles: [
    'src/theme/europa/styles/europa.scss',
    'src/components/banner/styles/banner.scss'
  ]
};
