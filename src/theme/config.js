'use strict';

module.exports = {
  // Files to copy manually (no process applied)
  copy: {
    build: [
      {
        src: 'src/{core,components,vendor}/**/{fonts,images}/**',
        dest: 'build'
      },
      {
        src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/**',
        dest: 'build/core/fonts/'
      }
    ],
    dist: [
      {
        src: 'build/**/fonts/**',
        dest: 'dist'
      }
    ]
  },
  // Scripts to process
  scripts: {
    entry: [
      'src/core/scripts/core.js'
    ]
  },
  // Styles to process
  styles: {
    entry: [
      'src/core/styles/core.scss',
      'src/components/breadcrumb/styles/main.scss'
    ],
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
