'use strict';

module.exports = {
  // You can define multiple variants
  'banner': {
    styles: ['./styles/banner.scss'],
    scripts: [],
    assets: [],
    templates: [],
    dependencies: [
      'core'
    ]
  },
  // Example of variant: banner quote
  'banner-quote': {
    styles: ['./styles/banner-quote.scss'],
    scripts: [],
    assets: [],
    templates: [
      './templates/banner-quote.html'
    ],
    dependencies: [
      'banner'
    ]
  },
  'banner-video': {
    styles: [
      './styles/banner-video.scss'
    ],
    scripts: [],
    assets: [],
    templates: [
      './templates/banner-video.html'
    ],
    dependencies: [
      'banner'
    ]
  }
};
