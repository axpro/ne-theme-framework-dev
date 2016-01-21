'use strict';

const path = require('path');
const glob = require('glob');

module.exports = function (theme) {
  let config = {};
  if (theme) {
    config = require('../../src/theme/' + theme + '/theme.config.js');
    config.theme = config.theme || theme;
  } else {
    config = parseFrameworkConfig();
  }

  return config;
};

function parseFrameworkConfig() {
  let stylesSrc = [];
  let scriptsSrc = [];
  let assetsSrc = [];
  let templatesSrc = [];

  // Get differents config
  let files = glob.sync('./src/components/**/component.config.js');
  files = files.concat(glob.sync('./src/utilities/**/utility.config.js'));
  files = files.concat(glob.sync('./src/vendor/**/vendor.config.js'));
  files.push('./src/core/core.config.js');

  files.forEach(file => {
    let conf = require(path.resolve(process.cwd(), file));
    if (conf) {
      for (let variant in conf) {
        if ({}.hasOwnProperty.call(conf, variant)) {
          // Styles
          if (conf[variant].styles) {
            if (Array.isArray(conf[variant].styles)) {
              stylesSrc = stylesSrc.concat(conf[variant].styles.map(rebase(file)));
            } else {
              stylesSrc.push(rebase(file)(conf[variant].styles));
            }
          }

          // Scripts
          if (conf[variant].scripts) {
            if (Array.isArray(conf[variant].scripts)) {
              scriptsSrc = scriptsSrc.concat(conf[variant].scripts.map(rebase(file)));
            } else {
              scriptsSrc.push(rebase(file)(conf[variant].scripts));
            }
          }

          // Copy / Assets
          if (conf[variant].assets) {
            if (Array.isArray(conf[variant].assets)) {
              assetsSrc = assetsSrc.concat(conf[variant].assets.map(rebase(file)));
            } else {
              assetsSrc.push(rebase(file)(conf[variant].assets));
            }
          }

          // Templates
          if (conf[variant].templates) {
            if (Array.isArray(conf[variant].templates)) {
              templatesSrc = templatesSrc.concat(conf[variant].templates.map(rebase(file)));
            } else {
              templatesSrc.push(rebase(file)(conf[variant].templates));
            }
          }
        }
      }
    }
  });

  return {
    styles: stylesSrc,
    scripts: scriptsSrc,
    assets: assetsSrc,
    templates: templatesSrc
  };
}

function rebase(baseFile) {
  return relativeFile => {
    if (typeof relativeFile === 'string') {
      return path.resolve(path.dirname(baseFile), relativeFile);
    }

    return {
      src: path.resolve(path.dirname(baseFile), relativeFile.src),
      dest: path.resolve('build', relativeFile.dest)
    };
  };
}
