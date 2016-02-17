/**
 * Breadcrumb related behaviors.
 */

export function breadcrumb(selector, breakpoints) {
  jQuery(selector).once('breadcrumb', () => {
    const $wrapper = jQuery(selector);
    $wrapper.addClass('breadcrumb--collapsible');

    // Global selectors.
    const $segmentsWrapper = $wrapper.children('.breadcrumb__segments-wrapper');
    const $segments = $segmentsWrapper.children('.breadcrumb__segment');
    const $segmentFirst = $segmentsWrapper.children('.breadcrumb__segment--first');
    const $segmentsecond = $segmentFirst.next();

    // Calculating items that are not hidden.
    let $visibleSegments = $segments.not('.is-hidden');

    // Hiding breadcrumb segments when there is not enough space.
    function togglesegments() {
      for (let i = 0; i < $visibleSegments.length; i++) {
        // Calculating sizes.
        const calculations = {};
        calculations.wrapperWidth = $wrapper.width();
        calculations.width = $segmentsWrapper.width();

        calculations.itemsWidth = 0;
        $segments.not('.is-hidden').each(i => {
          calculations.itemsWidth += jQuery(this).outerWidth(true);
        });

        const $lastHiddenItem = $segments.siblings('.is-hidden').last();
        const lastHiddenItemWidth = $lastHiddenItem.width();

        // Hiding segments.
        if (calculations.wrapperWidth <= calculations.itemsWidth) {
          if ($segmentsecond.hasClass('is-hidden')) {
            $lastHiddenItem.next().not('.breadcrumb__segment--last').addClass('is-hidden');
          } else {
            $segmentFirst.addClass('breadcrumb__segment--next-hidden');
            $segmentsecond.addClass('is-hidden');
          }
        }

        // Showing segments.
        if ((calculations.itemsWidth + lastHiddenItemWidth) < calculations.wrapperWidth) {
          if ($lastHiddenItem.hasClass('is-hidden')) {
            $lastHiddenItem.removeClass('is-hidden');
          } else {
            $segmentFirst.removeClass('breadcrumb__segment--next-hidden');
          }
        }
      }

      $visibleSegments = $segments.not('.is-hidden');
    }

    // Showing all hidden breadcrumbs.
    function showBreadcrumbs($selector) {
      $selector.hide();
      $wrapper.addClass('is-open');
    }

    // Adding button to breadcrumb element that will be used for showing
    // hidden breadcrumb elements.
    let $breadcrumbButton;
    if ($segments.length > 1) {
      $wrapper.append('<span class="breadcrumb__btn-separator">...</span>');
      $breadcrumbButton = $wrapper.find('.breadcrumb__btn-separator');
    }

    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register(breakpoints.medium, {
        // Desktop.
        match: () => {
          $wrapper.removeClass('is-open');

          if ($breadcrumbButton) {
            $breadcrumbButton.hide();
          }

          togglesegments();

          jQuery(window).resize(() => {
            togglesegments();
          });
        },
        // Mobile.
        unmatch: () => {
          if ($breadcrumbButton) {
            $breadcrumbButton.show();
          }
          $segments.removeClass('is-hidden');

          $segmentFirst.removeClass('breadcrumb__segment--next-hidden');
          jQuery(window).off('resize');
        },

        setup: () => {
          if ($breadcrumbButton) {
            $breadcrumbButton.click(() => {
              // Adding jQuery(this) as a selector for the showBreadcrumbs function.
              showBreadcrumbs(jQuery(this));
            });
          }
        },
      });
    }
  });
}
