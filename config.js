'use strict';

module.exports = {
  // Files to copy manually (no process applied)
  copy: {
    build: [
      {
        src: 'src/{core,components,dependencies}/{fonts,images}/**',
        dest: 'build'
      },
      {
        src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/**',
        dest: 'build/fonts/'
      }
    ],
    dist: [
      {
        src: 'build/fonts/**',
        dest: 'dist/fonts'
      }
    ]
  },
  // Scripts to process
  scripts: {
    entry: [
      'src/theme.js'
    ]
  },
  // Styles to process
  styles: {
    entry: ['src/theme.scss'],
    autoprefixer: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]
  }
};
