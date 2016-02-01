/*
 * Import external lib and conquer the world
 */

// Bootstrap
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/button';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab';
import 'bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix';

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
