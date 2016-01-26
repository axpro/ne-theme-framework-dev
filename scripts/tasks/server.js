'use strict';

const browserSync = require('browser-sync').create();
const resolve = require('path').resolve;

global.browserSyncServer = browserSync;

// To be improved
function serverGenerate(done) {
  browserSync.init({
    server: {
      baseDir: [
        resolve(process.cwd(), 'build/framework'),
        resolve(process.cwd(), 'build/styleguide')
      ]
    },
    port: 3000,
    open: false,
    notify: false
  }, () => {
    done();
  });
}

module.exports = {
  generate: serverGenerate
};
