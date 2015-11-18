const gulp = require('gulp');
const patterns = [
  'src/{fonts,images}/**'
];

// Copy all files at the root level
gulp.task('copy', () =>
  gulp.src(patterns, {
    dot: true
  }).pipe(gulp.dest('dist'))
);
