/**
 * @file
 * Site level language switcher related behaviors.
 */

export function langSelectSite() {
  const $overlay = jQuery('.splash-page--overlay');
  const overlay = '.splash-page--overlay';
  const closeBtn = '.splash-page__btn-close';
  const body = 'body';

  jQuery('.lang-select-site').on('click', 'a.lang-select-site__link', (event) => {
    // We only want to load it once.
    if (!$overlay.find(closeBtn).length) {
      jQuery.get(jQuery(this).attr('href'), (splashscreen) => {
        // Store our object.
        const $jQueryObject = jQuery(jQuery.parseHTML(splashscreen));
        // Output the part we want to our overlay.
        $overlay.html($jQueryObject.find('.page-content'));
      });
    }

    // Show overlay.
    jQuery(overlay).show();
    jQuery(body).addClass('disablescroll');

    // Hide frame helper function.
    const closeSplashScreen = () => {
      jQuery(overlay).hide();
      jQuery(body).removeClass('disablescroll');
    };

    // Hide frame on click.
    $overlay.on('click', closeBtn, (e) => {
      closeSplashScreen();
      // Prevent the actual close a href to trigger. This should only work
      // if javascript is disabled.
      e.preventDefault();
    });

    // Hide frame on pressing ESC.
    jQuery(document).keyup((e) => {
      // Escape key maps to keycode '27'.
      if (e.keyCode === 27) {
        closeSplashScreen();
      }
    });

    // Prevent the default click, if javascript is disabled this link
    // will keep on working.
    event.preventDefault();
  });
}
