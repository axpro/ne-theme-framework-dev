import gulp from 'gulp';
import browserSync from 'browser-sync';

const reload = browserSync.reload;

// Watch files for changes & reload
gulp.task('serve:dev', () => {
  browserSync({
    notify: false,
    server: ['dist', 'test/visual'],
    port: 3000
  });

  gulp.watch(['test/visual/**/*.html'], reload);
  gulp.watch(['src/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts']);
  gulp.watch(['src/images/**/*'], reload);
});
