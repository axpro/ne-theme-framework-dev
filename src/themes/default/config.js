const path = require('path');

module.exports = {
  extraAssets: [{
    src: path.resolve(__dirname, '../../../bower_components/bootstrap-sass/assets/fonts/bootstrap/**'),
    dest: 'fonts/bootstrap'
  }],
};
