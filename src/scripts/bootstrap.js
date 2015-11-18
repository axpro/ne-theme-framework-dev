/*
 * Import external lib and conquer the world
 */
 /* eslint no-unused-vars: 0 */
import * as jQuery from '../vendor/jquery/dist/jquery.js';
import Bootstrap from '../vendor/bootstrap-sass/assets/javascripts/bootstrap.js';

/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (window.navigator.userAgent.match(/IEMobile\/10\.0/)) {
  const msViewportStyle = document.createElement('style');
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  );
  document.querySelector('head').appendChild(msViewportStyle);
}
