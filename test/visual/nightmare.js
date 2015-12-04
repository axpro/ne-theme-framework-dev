const nightmare = require('nightmare');
const vo = require('vo');
const mkdirp = require('mkdirp');

const buildRef = (process.argv.indexOf('--ref') !== -1);
const outputDir = buildRef ?
  './test/visual/screenshots/reference' :
  './test/visual/screenshots/test';

vo(function * () {
  const browser = nightmare({
    show: false,
    width: 1024,
    height: 768
  });

  mkdirp.sync(outputDir);

  yield browser
    .goto('http://localhost:8888/')
    .captureSelection(outputDir + '/test1.png', '#navbar')
    .captureSelection(outputDir + '/test2.png', '.page-header');

  yield browser.end();
})(function (err) {
  if (err) {
    return console.log(err);
  }
});
