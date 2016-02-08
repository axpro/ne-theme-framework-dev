'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const postcss = require('gulp-postcss');
const path = require('path');

// Compile and automatically prefix stylesheets
function stylesCompile(done) {
  const startTime = Date.now();
  console.log('Compile SCSS: started');

  const build = 'build/framework';
  const importOnce = require('node-sass-import-once');

  gulp.src('src/themes/default/styles/europa.scss', { base: 'src/themes/default' })
    .pipe($.newer(build))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 8,
      importer: importOnce,
      importOnce: {
        index: true,
        css: true,
        bower: true
      }
    }).on('error', $.sass.logError))
    .pipe(postcss([require('autoprefixer')({ browsers: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ] })]))
    .pipe($.sourcemaps.write('.', {
      includeContent: true,
      sourceRoot: '../../src/'
    }))
    .pipe(gulp.dest(build))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log(`Compile SCSS: done (${diff}ms)`);
      done();
    });
}

function dist(done) {
  const startTime = Date.now();
  console.log('Dist styles: started');

  const processors = [
    require('postcss-sprites').default({
      stylesheetPath: './dist/styles',
      spritePath: './dist/images/png/',
      relativeTo: 'rule',
      filterBy: image => {
        // Allow only png files and files in subfolders of 'images/png'
        if (!/\.(png)$/.test(image.url) ||
          path.dirname(path.relative(path.resolve('./dist/images/png/'), image.path)) === '.') {
          return Promise.reject();
        }
        return Promise.resolve();
      },
      groupBy: image => {
        const file = path.dirname(path.relative(path.resolve('./dist/images/png/'), image.path));
        if (file === '.') {
          return Promise.reject();
        }
        return Promise.resolve(file);
      },
      hooks: {
        onSaveSpritesheet: (opts, groups) => path.join(
          opts.spritePath,
          groups.join('/'),
          '..',
          `${path.basename(groups.join('/'), '.png')}.sprite.png`
        )
      }
    }),
    require('postcss-url')({
      url: 'inline',
      maxSize: 8, // inline every image that weighs less than 8kB
      basePath: path.resolve('dist/styles')
    }),
    require('postcss-svgo'),
    require('cssnano')
  ];

  return gulp.src('build/framework/styles/**/*.css')
    // .pipe($.sourcemaps.init())
    .pipe($.concat('europa.css'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(postcss(processors, {
      to: 'dist/styles/europa.css'
    }))
    // .pipe($.concat('europa.css'))
    // .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'))
    .on('end', () => {
      const diff = Date.now() - startTime;
      console.log(`Dist styles: done (${diff}ms)`);
      done();
    });
}

function watch() {
  gulp.watch('./src/**/*.scss', event => {
    console.log(`File ${path.relative(process.cwd(), event.path)} was ${event.type}`);
    stylesCompile(() => {
      if (global.browserSyncServer && global.browserSyncServer.active === true) {
        global.browserSyncServer.reload('*.css');
      }
      console.log('Waiting for changes...');
    });
  });
}

module.exports = {
  compile: stylesCompile,
  dist,
  watch
};
