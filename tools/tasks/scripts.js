const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const babel = require('rollup-plugin-babel');

const $ = gulpLoadPlugins();
const folder = '.tmp/scripts';

// Concatenate and minify JavaScript. Transpiles ES2015 code to ES5.
// See https://babeljs.io/docs/usage/options/ for more informations on Babel options
// Note: "comments: false" is very heavy
gulp.task('scripts:bundle', () =>
    gulp.src([
      './src/scripts/**/*.js'
    ], {read: false})
      .pipe($.newer('.tmp/scripts'))
      .pipe($.sourcemaps.init())
      .pipe($.rollup({
        sourceMap: true,
        format: 'iife',
        plugins: [
          babel({
            only: 'src/**',
            presets: ['es2015-rollup'],
            compact: true
          })
        ]
      }))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(folder))
);

// Uglify JS
gulp.task('scripts:uglify', function () {
  return gulp.src(['./**.js'], {cwd: folder})
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/scripts'));
});
