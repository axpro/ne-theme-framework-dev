const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files');

gulp.task('bower', function () {
  return gulp.src(mainBowerFiles({includeDev: false}), {base: './bower_components'})
    .pipe(gulp.dest('./src/vendor'));
});

gulp.task('bower:dev', function () {
  return gulp.src(mainBowerFiles({includeDev: 'exclusive'}), {base: './bower_components'})
    .pipe(gulp.dest('./test/vendor'));
});
