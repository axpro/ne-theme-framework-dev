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
  ]
};
