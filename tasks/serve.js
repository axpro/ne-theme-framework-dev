'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('serve:dev', serveDev);
gulp.task('serve:dist', serveDist);
gulp.task('serve:visureg', serveVisureg);

// Watch files for changes & reload
function serveDev() {
  browserSync({
    notify: false,
    server: ['build', 'templates'],
    port: 3000
  });

  gulp.watch(['templates/**/*.html'], reload);
  gulp.watch(['src/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts:bundle']);
  gulp.watch(['src/images/**/*'], reload);
}

// Watch files for changes & reload
function serveDist() {
  browserSync({
    notify: false,
    server: ['dist', 'templates'],
    port: 3001
  });

  gulp.watch(['templates/**/*.html'], reload);
  gulp.watch(['src/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['scripts:bundle', 'scripts:uglify']);
  gulp.watch(['src/images/**/*'], reload);
}

function serveVisureg() {
  browserSync({
    notify: false,
    server: ['bower_components', 'test/visual'],
    port: 3002
  });
}
