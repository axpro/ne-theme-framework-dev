'use strict';

module.exports = {
  // You can define multiple variants
  'banner': {
    styles: ['./styles/banner.scss'],
    scripts: [],
    assets: [],
    templates: []
  },
  // Example of variant: banner quote
  'banner-quote': {
    styles: ['./styles/banner-quote.scss'],
    scripts: [],
    assets: [],
    templates: [
      './templates/banner-quote.html'
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
    ]
  }
};
