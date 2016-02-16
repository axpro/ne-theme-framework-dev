'use strict';

// Copy files during build phase
function copy(dest, done) {
  const startTime = Date.now();
  console.log('Copy assets: started');

  const gulp = require('gulp');
  const glob = require('glob');
  const async = require('async');
  const path = require('path');
  const config = require('../../src/themes/default/config.js');

  const sources = [];

  [
    'src/framework/elements/*',
    'src/framework/components/*',
    'src/framework/base/*',
    'src/framework/layout/*'
  ].forEach(folder => {
    glob.sync(folder).forEach(component => {
      sources.push(`${component}/{images,fonts}/**`);
    });
  });

  const assets = [{ src: sources, dest: '' }].concat(config.extraAssets);

  return async.each(assets,
    (file, cb) => gulp.src(file.src)
      .pipe(gulp.dest(path.resolve(dest, file.dest)))
      .on('end', cb),
    res => {
      const diff = Date.now() - startTime;
      console.log(`Copy assets: done (${diff}ms)`);
      return done(res);
    }
  );
}

module.exports = {
  build: cb => copy('build/framework', cb),
  dist: cb => copy('dist', cb)
};
