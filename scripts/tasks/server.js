'use strict';

const browserSync = require('browser-sync').create();
const resolve = require('path').resolve;

let config = {};

global.browserSyncServer = browserSync;

module.exports = {
  generate: serverGenerate
};

// To be improved
function serverGenerate(done) {
  let src = 'build';
  if (config.theme) {
    src = 'build/' + config.theme;
  }

  browserSync.init({
    server: {
      baseDir: [
        resolve(process.cwd(), src),
        resolve(process.cwd(), 'build/_server')
      ]
    },
    port: 3000,
    open: false,
    notify: false
  }, () => {
    done();
  });
}
