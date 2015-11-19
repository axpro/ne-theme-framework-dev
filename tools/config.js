// Put config here
// Like https://github.com/angular/material/tree/master/gulp

module.exports = {
  // Main directories
  buildDir: 'build/',
  distDir: 'dist/',
  bowerMainDir: 'src/vendor/',
  bowerDevDir: 'test/vendor/',

  // Files to copy manually (no process applied)
  copyBuildFiles: [
    'src/{fonts,images}/**'
  ],
  copyDistFiles: [],

  // Images to optimize
  imageFiles: [
    'build/images/**/*'
  ],
  imageDir: 'dist/images/',

  // JavaScript
  buildScriptsDir: 'build/scripts/',
  distScriptsDir: 'dist/scripts/',
  bundlesScriptsFiles: [
    'src/scripts/**/*.js'
  ],
  uglifyScriptsFiles: [
    'build/scripts/**/*.js'
  ],

  // Styles
  buildStylesDir: 'build/styles/',
  distStylesDir: 'dist/styles/',
  scssBaseFiles: [
    'src/styles/**/*.scss',
    '!src/styles/**/_*.scss',
    'src/styles/**/*.css'
  ],
  minifyCssFiles: [
    'build/styles/**/*.css'
  ],

  AUTOPREFIXER_BROWSERS: [
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
};
