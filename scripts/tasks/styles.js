'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const postcss = require('gulp-postcss');
const path = require('path');

const config = global.config || {};

const srcDir = path.resolve(__dirname, '../../src');
const bowerDir = path.resolve(__dirname, '../../bower_components');

// Compile and automatically prefix stylesheets
function stylesCompile(done) {
  const startTime = Date.now();
  console.log('Compile SCSS: started');

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
    .pipe($.sourcemaps.write('.', {
      includeContent: true,
      sourceRoot: '../src/'
    }))
    .pipe(gulp.dest(build))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log(`Compile SCSS: done (${diff}ms)`);
      done();
    });
}

function dist(done) {
  const startTime = Date.now();
  console.log('Dist styles: started');

  const processors = [
    require('postcss-url')({
      url: 'inline',
      maxSize: 8, // inline every image that weighs less than 8kB
      basePath: path.resolve('dist/styles')
    }),
    require('postcss-svgo'),
    require('postcss-sprites').default({
      stylesheetPath: './dist/styles',
      spritePath: './dist/images/sprites/',
      relativeTo: 'rule',
      filterBy: image => {
        // Allow only jpg/jpeg/png files
        if (!/\.(png|jpg|jpeg)$/.test(image.url)) {
          return Promise.reject();
        }
        return Promise.resolve();
      }
    }),
    require('cssnano')
  ];

  return gulp.src([
    'build/framework/core/**/*.css',
    'build/framework/vendor/**/*.css',
    'build/framework/components/**/*.css',
    'build/framework/utilities/**/*.css'
  ])
    // .pipe($.sourcemaps.init())
    .pipe($.concat('europa.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(postcss(processors, {
      to: 'dist/styles/europa.css'
    }))
    // .pipe($.concat('europa.css'))
    // .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log(`Dist styles: done (${diff}ms)`);
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
  dist,
  watch
};
