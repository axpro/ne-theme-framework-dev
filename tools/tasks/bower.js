const gulp = require('gulp');
const mainBowerFiles = require('main-bower-files');

gulp.task('bower:main', bowerMain);
gulp.task('bower:dev', bowerDev);

function bowerMain() {
  return gulp.src(mainBowerFiles({includeDev: false}), {base: './bower_components'})
    .pipe(gulp.dest('./src/vendor'));
}

function bowerDev() {
  return gulp.src(mainBowerFiles({includeDev: 'exclusive'}), {base: './bower_components'})
    .pipe(gulp.dest('./test/vendor'));
}
