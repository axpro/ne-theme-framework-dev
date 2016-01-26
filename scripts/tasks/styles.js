'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const path = require('path');

const config = global.config || {};

// Compile and automatically prefix stylesheets
function stylesCompile(done) {
  const startTime = Date.now();
  console.log('Compile SCSS: started');

  const srcDir = path.resolve(__dirname, '../../src');
  const bowerDir = path.resolve(__dirname, '../../bower_components');
  const build = 'build/framework';

  gulp.src(config.styles, { base: 'src' })
    .pipe($.newer(build))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 8,
      includePaths: [
        bowerDir,
        srcDir
      ]
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer([
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]))
    .pipe($.sourcemaps.write('.', { includeContent: true, sourceRoot: '../src/' }))
    .pipe(gulp.dest(build))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log(`Compile SCSS: done (${diff}ms)`);
      done();
    });
}

function watch() {
  gulp.watch('./src/**/*.scss', event => {
    console.log(`File ${path.relative(process.cwd(), event.path)} was ${event.type}`);
    stylesCompile(() => {
      if (global.browserSyncServer && global.browserSyncServer.active === true) {
        global.browserSyncServer.reload('*.css');
      }
      console.log('Waiting for changes...');
    });
  });
}

module.exports = {
  compile: stylesCompile,
  watch
};
