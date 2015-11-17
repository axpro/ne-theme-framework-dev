import gulp from 'gulp';
import del from 'del';

const folders = [
  '.tmp',
  'dist/*',
  'src/vendor',
  'test/vendor'
];

// Clean directories
gulp.task('clean', () => del(folders, {dot: true}));
