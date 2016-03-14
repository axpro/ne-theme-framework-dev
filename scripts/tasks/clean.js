'use strict';

// Clean process directories
module.exports = {
  build: (done) => {
    const startTime = Date.now();
    console.log('Clean `.tmp`, `build` and `dist`: started');

    const del = require('del');

    return del(['.tmp', 'build', 'dist'], { dot: true }).then(() => {
      const diff = Date.now() - startTime;
      console.log(`Clean: done (${diff}ms)`);
      done();
    });
  },
};
