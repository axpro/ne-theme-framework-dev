const gulp = require('gulp');
const del = require('del');

const folders = [
  '.tmp',
  'dist/*',
  'src/vendor',
  'test/vendor'
];

// Clean directories
gulp.task('clean', () => del(folders, {dot: true}));
