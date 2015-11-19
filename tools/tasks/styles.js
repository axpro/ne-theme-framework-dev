const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles:compile', stylesCompile);
gulp.task('styles:minify', stylesMinify);

// Compile and automatically prefix stylesheets
//
function stylesCompile() {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'src/styles/**/*.scss',
    '!src/styles/**/_*.scss',
    'src/styles/**/*.css'
  ], {base: ''})
    .pipe($.newer('build/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: ''}))
    .pipe(gulp.dest('build/styles/'));
}

// Minify CSS
function stylesMinify() {
  return gulp.src([
    'build/styles/**/*.css'
  ], {base: ''})
    .pipe($.sourcemaps.init({loadMaps: true}))
   // Concatenate and minify styles
   .pipe($.if('*.css', $.minifyCss()))
   .pipe($.sourcemaps.write('./', {includeContent: true, sourceRoot: '/src/styles'}))
    .pipe(gulp.dest('dist/styles/'));
}
