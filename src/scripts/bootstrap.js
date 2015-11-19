/*
 * Import external lib and conquer the world
 */
 /* eslint no-unused-vars: 0 */

// jQuery
import '../vendor/jquery/dist/jquery.js';

// Bootstrap
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/transition.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/alert.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/button.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/carousel.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/collapse.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/modal.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/popover.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/tab.js';
import '../vendor/bootstrap-sass/assets/javascripts/bootstrap/affix.js';

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
