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
      'src/core/scripts/core.js',
      'src/components/breadcrumb/scripts/breadcrumb.js',
      'src/components/filters/scripts/filters.js',
      'src/components/lang-select-page/scripts/lang-select-page.js',
      'src/components/lang-select-site/scripts/lang-select-site.js',
      'src/components/pager/scripts/pager.js'

    ]
  },
  // Styles to process
  styles: {
    entry: [
      'src/core/styles/core.scss',
      'src/components/breadcrumb/styles/breadcrumb.scss',
      'src/components/filters/styles/filters.scss',
      'src/components/lang-select-page/styles/lang-select-page.scss',
      'src/components/lang-select-site/styles/lang-select-site.scss',
      'src/components/pager/styles/pager.scss'
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
