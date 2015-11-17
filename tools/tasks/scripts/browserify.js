import gulp from 'gulp';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import globby from 'globby';
import es from 'event-stream';
import {resolve} from 'path';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';

const folder = '.tmp/scripts';

gulp.task('scripts:browserify', function (done) {
  globby(['./**.js'], {cwd: folder})
    .then(files => {
      if (files.length === 0) {
        done();
      }

      var tasks = files.map(function (entry) {
        return browserify({entries: [resolve(folder, entry)]})
          .bundle()
          .pipe(source(entry))
          .pipe(buffer())
          .pipe(uglify())
          .pipe(gulp.dest('./dist/scripts'));
      });

      return es.merge(tasks).on('end', done);
    })
    .catch(err => {
      done(err);
    });
});
