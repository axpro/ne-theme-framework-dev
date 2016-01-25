'use strict';

const del = require('del');

// Clean process directories
module.exports = {
  build: (done) => {
    const startTime = Date.now();
    console.log('Clean `build` and `dist`: started');
    return del(['build', 'dist'], { dot: true }).then(() => {
      const diff = Date.now() - startTime;
      console.log(`Clean 'build' and 'dist': done (${diff}ms)`);
      done();
    });
  }
};
