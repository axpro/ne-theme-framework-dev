import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

// Concatenate and minify JavaScript. Transpiles ES2015 code to ES5.
gulp.task('scripts:babel', () =>
    gulp.src([
      './src/{scripts,vendor}/**/*.js'
    ])
      .pipe($.newer('.tmp/scripts'))
      .pipe($.sourcemaps.init())
      .pipe($.babel({
        plugins: ['transform-es2015-modules-commonjs']
      }))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('.tmp'))
);
