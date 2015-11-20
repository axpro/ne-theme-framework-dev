const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const config = require('../config');
const bowerDir = require('path').resolve(process.cwd(), 'bower_components');

gulp.task('styles:compile', stylesCompile);
gulp.task('styles:minify', stylesMinify);

// Compile and automatically prefix stylesheets
function stylesCompile() {
  return gulp.src(config.scssBaseFiles, {base: 'src/styles'})
    .pipe($.newer(config.buildStylesDir))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10,
      importer: function (url) {
        return {
          file: url.replace(/__BOWER__/g, bowerDir)
        };
      }
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(config.AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '../../src/styles'}))
    .pipe(gulp.dest(config.buildStylesDir));
}

// Minify CSS
function stylesMinify() {
  return gulp.src(config.minifyCssFiles, {base: ''})
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.if('*.css', $.minifyCss()))
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '/src/styles/'}))
    .pipe(gulp.dest(config.distStylesDir));
}
