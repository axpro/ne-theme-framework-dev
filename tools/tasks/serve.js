const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

// Watch files for changes & reload
gulp.task('serve:dev', () => {
  browserSync({
    notify: false,
    server: ['build', 'test/visual'],
    port: 3000
  });

  gulp.watch(['test/visual/**/*.html'], reload);
  gulp.watch(['src/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts:bundle']);
  gulp.watch(['src/images/**/*'], reload);
});

// Watch files for changes & reload
gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    server: ['dist', 'test/visual'],
    port: 3000
  });

  gulp.watch(['test/visual/**/*.html'], reload);
  gulp.watch(['src/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts:bundle', 'scripts:uglify']);
  gulp.watch(['src/images/**/*'], reload);
});
