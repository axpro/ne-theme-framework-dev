/**
 * Exposed filter related behaviors.
 */

export function filters(refineText, hideText, clearAll, exposedBlockId) {
  const $filters = jQuery('.filters');
  const $filtersSubmit = jQuery('.filters__btn-submit', $filters);
  const filtersFormId = $filters.find('form').attr('id');
  const $resultsCount = jQuery('.filters__result-count');
  const $itemsNumber = jQuery('.filters__items-number');

  // Checking if IE8 is used.
  let oldIE = false;
  if (jQuery('html').is('.ie8')) {
    oldIE = true;
  }

  // Function for hiding Submit and Reset buttons.
  const hideFilterButtons = () => {
    jQuery('.filters__btn-collapse, .filters__btn-reset--small').hide();
  };

  const showFilterButtons = () => {
    jQuery('.filters__btn-collapse, .filters__btn-reset--small').show();
  };

  // Adding buttons for the filters.
  if ($resultsCount.is(':visible') && !jQuery('.filters__btn-collapse').length) {
    $resultsCount.append(`
      <div class="btn-group">
        <button class="btn btn-default filters__btn-reset--small hidden js-showonsubmit">
          ${clearAll}
        </button>
        <button class="btn btn-primary filters__btn-collapse" type="button"
          data-toggle="collapse" data-target="#${exposedBlockId}"
          aria-expanded="false" aria-controls="collapseFilters">
          ${refineText}
        </button>
      </div>`);
  }

  // Listeners.
  // Small button emulating the original reset button.
  jQuery('.filters__btn-reset--small').on('click', () => {
    jQuery('.filters__btn-reset').trigger('click');
  });

  // Runs only once.
  // Add throbber next to content type and items count text.
  $filters.once('filters', () => {
    const throbber = `<div class="ajax-progress ajax-progress-throbber">
        <i class="icon icon--spinner is-spinning"></i>
      </div>`;
    jQuery(document).ajaxStart((e) => {
      if (e.currentTarget.activeElement.form === 'undefined'
        && e.currentTarget.activeElement.form.id === filtersFormId) {
        $itemsNumber.prepend(throbber);
      }
    });

    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register('screen and (min-width: 992px)', {
        // Desktop.
        match: () => {
          const $filtersWrapper = jQuery('.filters__wrapper');

          $filtersSubmit.addClass('ctools-auto-submit-click');

          // Opening filters when changing to desktop.
          $filters
            .removeClass('collapse')
            .addClass('collapse in')
            .attr('aria-expanded', true)
            .removeAttr('style');

          // Hiding filter buttons.
          hideFilterButtons();

          $filters.children('.close').remove();
          if ($filtersWrapper.length) {
            $filtersWrapper.children().unwrap('<div class="filters__wrapper"></div>');
          }
        },
        // Mobile.
        unmatch: () => {
          // Showing buttons on viewport switch.
          showFilterButtons();

          $filters.wrapInner('<div class="filters__wrapper"></div>');
          $filters
            .removeClass('collapse in')
            .addClass('collapse')
            .attr('aria-expanded', false);

          $filtersSubmit.removeClass('ctools-auto-submit-click');
        },

        setup: () => {
          // IE8 fix - showing the element containing the filters.
          if (jQuery(window).width() > 991) {
            $filters
              .removeClass('collapse')
              .addClass('collapse in')
              .attr('aria-expanded', true)
              .removeAttr('style');
          } else {
            $filters.addClass('collapse');
          }
          $filtersSubmit.removeClass('ctools-auto-submit-click');
          $filters.wrapInner('<div class="filters__wrapper"></div>');

          if (!oldIE) {
            $filtersSubmit.click(() => {
              if (!$filtersSubmit.hasClass('ctools-auto-submit-click')) {
                $filters.collapse('hide');
              }
            });
          }

          $filters.on('show.bs.collapse', () => {
            jQuery(this).prepend(`
              <a class="close filters__close" data-toggle="collapse"
                data-target="#${exposedBlockId}"
                aria-expanded="true" aria-controls="collapseFilters">
                ${hideText}
              </a>`);
            hideFilterButtons();
          });

          $filters.on('hide.bs.collapse', () => {
            jQuery(this).children('.close').remove();
            showFilterButtons();
          });
        },
      });
    }
  });
}
