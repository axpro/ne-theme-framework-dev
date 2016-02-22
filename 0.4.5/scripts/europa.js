(function (exports) {
'use strict';

/**
 * Breadcrumb related behaviors.
 */

function breadcrumb(selector, breakpoints) {
  var _this2 = this;

  jQuery(selector).once('breadcrumb', function () {
    var $wrapper = jQuery(selector);
    $wrapper.addClass('breadcrumb--collapsible');

    // Global selectors.
    var $segmentsWrapper = $wrapper.children('.breadcrumb__segments-wrapper');
    var $segments = $segmentsWrapper.children('.breadcrumb__segment');
    var $segmentFirst = $segmentsWrapper.children('.breadcrumb__segment--first');
    var $segmentsecond = $segmentFirst.next();

    // Calculating items that are not hidden.
    var $visibleSegments = $segments.not('.is-hidden');

    // Hiding breadcrumb segments when there is not enough space.
    function togglesegments() {
      var _this = this;

      var _loop = function _loop(i) {
        // Calculating sizes.
        var calculations = {};
        calculations.wrapperWidth = $wrapper.width();
        calculations.width = $segmentsWrapper.width();

        calculations.itemsWidth = 0;
        $segments.not('.is-hidden').each(function (i) {
          calculations.itemsWidth += jQuery(_this).outerWidth(true);
        });

        var $lastHiddenItem = $segments.siblings('.is-hidden').last();
        var lastHiddenItemWidth = $lastHiddenItem.width();

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
        if (calculations.itemsWidth + lastHiddenItemWidth < calculations.wrapperWidth) {
          if ($lastHiddenItem.hasClass('is-hidden')) {
            $lastHiddenItem.removeClass('is-hidden');
          } else {
            $segmentFirst.removeClass('breadcrumb__segment--next-hidden');
          }
        }
      };

      for (var i = 0; i < $visibleSegments.length; i++) {
        _loop(i);
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
    var $breadcrumbButton = undefined;
    if ($segments.length > 1) {
      $wrapper.append('<span class="breadcrumb__btn-separator">...</span>');
      $breadcrumbButton = $wrapper.find('.breadcrumb__btn-separator');
    }

    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register(breakpoints.medium, {
        // Desktop.
        match: function match() {
          $wrapper.removeClass('is-open');

          if ($breadcrumbButton) {
            $breadcrumbButton.hide();
          }

          togglesegments();

          jQuery(window).resize(function () {
            togglesegments();
          });
        },
        // Mobile.
        unmatch: function unmatch() {
          if ($breadcrumbButton) {
            $breadcrumbButton.show();
          }
          $segments.removeClass('is-hidden');

          $segmentFirst.removeClass('breadcrumb__segment--next-hidden');
          jQuery(window).off('resize');
        },

        setup: function setup() {
          if ($breadcrumbButton) {
            $breadcrumbButton.click(function () {
              // Adding jQuery(this) as a selector for the showBreadcrumbs function.
              showBreadcrumbs(jQuery(_this2));
            });
          }
        }
      });
    }
  });
}

function collapse(showText, hideText) {
  var _this = this;

  jQuery('button[data-toggle=collapse]').each(function () {
    var dependentId = jQuery(_this).attr('data-target');
    var toggler = jQuery(dependentId).hasClass('in') ? hideText : showText;
    var arrow = jQuery('.icon', jQuery(_this));
    var fillMe = jQuery('.toggling-text', jQuery(_this));
    fillMe.text(toggler);

    jQuery(_this).click(function () {
      var up = 'icon--up';
      var down = 'icon--down';
      var add = arrow.hasClass(down) ? up : down;
      var rem = arrow.hasClass(down) ? down : up;
      toggler = fillMe.text() === hideText ? showText : hideText;
      fillMe.text(toggler);
      arrow.addClass(add).removeClass(rem);
    });
  });
}

/**
 * File component related behaviors.
 */

function file() {
  var _this = this;

  var $button = jQuery('.file__translations-control');
  var $translations = jQuery('.file__translations-list');

  $button.click(function () {
    var self = _this;
    $translations.collapse('toggle');
    jQuery(self).toggleClass('is-collapsed');
  });
}

/**
 * Exposed filter related behaviors.
 */

function filters(refineText, hideText, clearAll, exposedBlockId) {
  var _this = this;

  var $filters = jQuery('.filters');
  var $filtersSubmit = jQuery('.filters__btn-submit', $filters);
  var filtersFormId = $filters.find('form').attr('id');
  var $resultsCount = jQuery('.filters__result-count');
  var $itemsNumber = jQuery('.filters__items-number');

  // Checking if IE8 is used.
  var oldIE = false;
  if (jQuery('html').is('.ie8')) {
    oldIE = true;
  }

  // Function for hiding Submit and Reset buttons.
  var hideFilterButtons = function hideFilterButtons() {
    jQuery('.filters__btn-collapse, .filters__btn-reset--small').hide();
  };

  var showFilterButtons = function showFilterButtons() {
    jQuery('.filters__btn-collapse, .filters__btn-reset--small').show();
  };

  // Adding buttons for the filters.
  if ($resultsCount.is(':visible') && !jQuery('.filters__btn-collapse').length) {
    $resultsCount.append('\n      <div class="btn-group">\n        <button class="btn btn-default filters__btn-reset--small hidden js-showonsubmit">\n          ' + clearAll + '\n        </button>\n        <button class="btn btn-primary filters__btn-collapse" type="button"\n          data-toggle="collapse" data-target="#' + exposedBlockId + '"\n          aria-expanded="false" aria-controls="collapseFilters">\n          ' + refineText + '\n        </button>\n      </div>');
  }

  // Listeners.
  // Small button emulating the original reset button.
  jQuery('.filters__btn-reset--small').on('click', function () {
    jQuery('.filters__btn-reset').trigger('click');
  });

  // Runs only once.
  // Add throbber next to content type and items count text.
  $filters.once('filters', function () {
    var throbber = '<div class="ajax-progress ajax-progress-throbber">\n        <i class="icon icon--spinner is-spinning"></i>\n      </div>';
    jQuery(document).ajaxStart(function (e) {
      if (e.currentTarget.activeElement.form === 'undefined' && e.currentTarget.activeElement.form.id === filtersFormId) {
        $itemsNumber.prepend(throbber);
      }
    });

    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register('screen and (min-width: 992px)', {
        // Desktop.
        match: function match() {
          var $filtersWrapper = jQuery('.filters__wrapper');

          $filtersSubmit.addClass('ctools-auto-submit-click');

          // Opening filters when changing to desktop.
          $filters.removeClass('collapse').addClass('collapse in').attr('aria-expanded', true).removeAttr('style');

          // Hiding filter buttons.
          hideFilterButtons();

          $filters.children('.close').remove();
          if ($filtersWrapper.length) {
            $filtersWrapper.children().unwrap('<div class="filters__wrapper"></div>');
          }
        },
        // Mobile.
        unmatch: function unmatch() {
          // Showing buttons on viewport switch.
          showFilterButtons();

          $filters.wrapInner('<div class="filters__wrapper"></div>');
          $filters.removeClass('collapse in').addClass('collapse').attr('aria-expanded', false);

          $filtersSubmit.removeClass('ctools-auto-submit-click');
        },

        setup: function setup() {
          // IE8 fix - showing the element containing the filters.
          if (jQuery(window).width() > 991) {
            $filters.removeClass('collapse').addClass('collapse in').attr('aria-expanded', true).removeAttr('style');
          } else {
            $filters.addClass('collapse');
          }
          $filtersSubmit.removeClass('ctools-auto-submit-click');
          $filters.wrapInner('<div class="filters__wrapper"></div>');

          if (!oldIE) {
            $filtersSubmit.click(function () {
              if (!$filtersSubmit.hasClass('ctools-auto-submit-click')) {
                $filters.collapse('hide');
              }
            });
          }

          $filters.on('show.bs.collapse', function () {
            jQuery(_this).prepend('\n              <a class="close filters__close" data-toggle="collapse"\n                data-target="#' + exposedBlockId + '"\n                aria-expanded="true" aria-controls="collapseFilters">\n                ' + hideText + '\n              </a>');
            hideFilterButtons();
          });

          $filters.on('hide.bs.collapse', function () {
            jQuery(_this).children('.close').remove();
            showFilterButtons();
          });
        }
      });
    }
  });
}

/**
 * In-page nav related behaviors.
 */

function inpageNav(nodeTitle, onThisPageText, toggleNavText) {
  var _this = this;

  var currentTitle = function currentTitle($navBar, $navBarCurrent) {
    // Clear title for In page nav navbar title if nothing selected.
    var currentItem = jQuery('li.active > a', $navBar);
    if (currentItem.length === 0) {
      $navBarCurrent.text(nodeTitle);
    } else {
      $navBarCurrent.text(currentItem.text());
    }
  };

  jQuery('.inpage-nav').once('page-navigation', function () {
    var $inPage = jQuery('.inpage-nav');
    var $inPageBlock = $inPage.parents('.inpage-nav__wrapper');
    var $inPageBlockParent = $inPageBlock.parent();
    var inPageBlockHeight = $inPageBlock.height();
    var inPageBlockTop = $inPageBlock.offset().top;
    var title = nodeTitle;

    // Calculate width on window resize, and check offset height of in-page
    // nav block.
    jQuery(window).resize(function () {
      $inPageBlock.css({ width: $inPageBlockParent.width() + 'px' });
      inPageBlockTop = $inPageBlock.offset().top;
      inPageBlockHeight = $inPageBlock.height();

      // Refresh scrollspy.
      jQuery('body').scrollspy('refresh');
    });

    var $navBar = jQuery('\n          <div class="inpage-nav__navbar-wrapper is-scrollspy-target">\n            <nav class="navbar navbar-default navbar-fixed-top inpage-nav__navbar">\n              <div class="container inpage-nav__container">\n                <div class="navbar-header inpage-nav__header"\n                  data-toggle="collapse" data-target="#inpage-navigation-list"\n                  aria-expanded="false" aria-controls="navbar">\n                  <button type="button" class="navbar-toggle collapsed inpage-nav__toggle">\n                    <span class="sr-only">' + toggleNavText + '</span>\n                    <span class="inpage-nav__icon-arrow icon icon--arrow-down"></span>\n                  </button>\n                  <span class="navbar-brand inpage-nav__help">' + onThisPageText + '</span>\n                <div class="inpage-nav__current-wrapper">\n                <span class="navbar-brand inpage-nav__current">' + title + '</span>\n                </div>\n              </div>\n              <div class="navbar-collapse collapse" id="inpage-navigation-list">\n                <span class="inpage-nav__title" >' + title + '</span>' + $inPage.html() + '\n              </div>\n            </div>\n          </nav>');

    var $navBarCurrent = jQuery('.inpage-nav__current', $navBar);
    var $navBarList = jQuery('.inpage-nav__list', $navBar);

    $navBarList.addClass('nav inpage-nav__list--navbar');
    jQuery('body').append($navBar);

    enquire.register('screen and (min-width: 992px)', {
      // Desktop.
      match: function match() {
        // Adding function that is calculating and adding inpage-nav block
        // width. This is due to usage of position: fixed on the inpage-nav
        // element.
        $inPageBlock.css({ width: $inPageBlockParent.width() + 'px' });

        // Remove class that adds overflow: hidden to body.
        jQuery('body').removeClass('is-inpage-nav-open');
        $inPageBlock.affix('checkPosition');
      },

      setup: function setup() {
        // Hide if clicked outside.
        jQuery('.inpage-nav__navbar', $navBar).click(function () {
          jQuery('#inpage-navigation-list').collapse('hide');
        });

        // Page navigation scroll spy.
        jQuery('body').scrollspy({ target: '.is-scrollspy-target' });

        $navBar.on('show.bs.collapse', function () {
          $navBar.addClass('is-collapsing');
        });

        $navBar.on('shown.bs.collapse', function () {
          $navBar.addClass('is-collapsed');
          $navBar.removeClass('is-collapsing');
        });

        $navBar.on('hide.bs.collapse', function () {
          $navBar.removeClass('is-collapsed');
          jQuery('body').removeClass('is-inpage-nav-open');
        });

        $navBar.on('activate.bs.scrollspy', function () {
          // Set title to current;.
          currentTitle($navBar, $navBarCurrent);
        });

        // Affix.
        $inPageBlock.affix({
          offset: {
            top: function top() {
              return Math.floor($inPageBlock.parent().offset().top) - 30;
            },
            bottom: function bottom() {
              return jQuery('.footer').outerHeight(true) + jQuery('.footer-top').outerHeight(true) + 20;
            }
          }
        });

        jQuery(window).scroll(function () {
          var $window = jQuery(_this);
          // Set title to current;.
          currentTitle($navBar, $navBarCurrent);

          // Show navbar if scroll is under the block.
          var docViewTop = $window.scrollTop();
          var inPageBottom = inPageBlockTop + inPageBlockHeight - 5;

          if (inPageBottom <= docViewTop) {
            $navBar.addClass('is-active');
          } else {
            $navBar.removeClass('is-active');
            jQuery('#inpage-navigation-list').collapse('hide');
          }
        });
      },

      // Mobile.
      unmatch: function unmatch() {
        // Collapse navbar on changing to mobile behavior.
        if (jQuery('.inpage-nav__navbar-wrapper').hasClass('is-collapsed')) {
          jQuery('#inpage-navigation-list').collapse('hide');
        }

        $navBar.on('show.bs.collapse', function () {
          jQuery('body').addClass('is-inpage-nav-open');
        });

        $navBar.on('hide.bs.collapse', function () {
          jQuery('body').removeClass('is-inpage-nav-open');
        });
      }
    });
  });
}

/**
 * Page level language switcher.
 */

function languageSwitcherPage(breakpoints) {
  var _this = this;

  var pageSwitcher = {
    wrapClass: '.lang-select-page',
    listClass: '.lang-select-page__list',
    itemClass: '.lang-select-page__option',
    iconClass: '.lang-select-page__icon',
    unavClass: '.lang-select-page__unavailable',
    wrapWidth: function wrapWidth() {
      return jQuery(pageSwitcher.wrapClass).outerWidth();
    },
    listWidth: function listWidth() {
      return jQuery(pageSwitcher.listClass).outerWidth();
    },
    iconWidth: function iconWidth() {
      return jQuery(pageSwitcher.iconClass).outerWidth();
    },
    unavailableWidth: function unavailableWidth() {
      return jQuery(pageSwitcher.unavClass).outerWidth();
    },
    itemsWidth: function itemsWidth() {
      var overallWidth = 0;
      jQuery(pageSwitcher.listClass).children(pageSwitcher.itemClass).each(function () {
        overallWidth += jQuery(_this).outerWidth();
      });
      return overallWidth;
    },
    itemsOverflow: function itemsOverflow() {
      var availableSpace = pageSwitcher.wrapWidth() - pageSwitcher.iconWidth() - pageSwitcher.unavailableWidth();

      return pageSwitcher.itemsWidth() > availableSpace - 20;
    }
  };

  jQuery('#block-language-selector-page-language-selector-page').once('lang-select-page', function () {
    var pageLanguageSelector = jQuery('.lang-select-page');
    pageLanguageSelector.selectify({
      listSelector: 'lang-select-page__list',
      item: 'lang-select-page__option',
      other: 'lang-select-page__other',
      unavailable: 'lang-select-page__unavailable',
      selected: 'is-selected'
    });

    var overflowToggle = function overflowToggle() {
      switch (pageSwitcher.itemsOverflow()) {
        case true:
          pageLanguageSelector.trigger('hide.list');
          pageLanguageSelector.trigger('show.dropdown');
          break;
        case false:
        default:
          pageLanguageSelector.trigger('show.list');
          pageLanguageSelector.trigger('hide.dropdown');
          break;
      }
    };

    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register(breakpoints.medium, {
        // Desktop case.
        match: function match() {
          jQuery(window).resize(function () {
            overflowToggle();
          });
        },
        // Mobile case.
        unmatch: function unmatch() {
          jQuery(window).off('resize');
        },
        setup: function setup() {
          overflowToggle();
        }
      });
    }
  });
}

/**
 * @file
 * Site level language switcher related behaviors.
 */

function langSelectSite() {
  var _this = this;

  var $overlay = jQuery('.splash-page--overlay');
  var overlay = '.splash-page--overlay';
  var closeBtn = '.splash-page__btn-close';
  var body = 'body';

  jQuery('.lang-select-site').on('click', 'a.lang-select-site__link', function (event) {
    // We only want to load it once.
    if (!$overlay.find(closeBtn).length) {
      jQuery.get(jQuery(_this).attr('href'), function (splashscreen) {
        // Store our object.
        var $jQueryObject = jQuery(jQuery.parseHTML(splashscreen));
        // Output the part we want to our overlay.
        $overlay.html($jQueryObject.find('.page-content'));
      });
    }

    // Show overlay.
    jQuery(overlay).show();
    jQuery(body).addClass('disablescroll');

    // Hide frame helper function.
    var closeSplashScreen = function closeSplashScreen() {
      jQuery(overlay).hide();
      jQuery(body).removeClass('disablescroll');
    };

    // Hide frame on click.
    $overlay.on('click', closeBtn, function (e) {
      closeSplashScreen();
      // Prevent the actual close a href to trigger. This should only work
      // if javascript is disabled.
      e.preventDefault();
    });

    // Hide frame on pressing ESC.
    jQuery(document).keyup(function (e) {
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

/**
 * Pager related behaviors.
 */

function pager(pageText) {
  var _this = this;

  var options = '';
  jQuery('ul.pager').once('pager', function () {
    jQuery('li.select', _this).once('pagerselect', function () {
      var $link = jQuery('a', _this);
      var value = undefined;
      var title = undefined;
      var selected = undefined;

      if ($link.length > 0) {
        value = $link.attr('href');
        title = pageText + '  ' + $link.html();
        selected = '';
      } else {
        value = '';
        title = pageText + '  ' + jQuery(_this).html();
        selected = ' selected="selected"';
      }

      options += '<option value="' + value + '"' + selected + '>' + title + '</option>';
      jQuery(_this).hide();
    });

    if (options !== '') {
      var select = jQuery('\n        <span class="pager__combo-upper">\n          <select class="pager__combo-dropdown">\n            ' + options + '\n          </select>\n        </span>');

      select.children().data('activation', 'activated').on({
        keydown: function keydown(event) {
          if (event.which === 13) {
            if (jQuery(_this).data('activation') === 'paused') {
              jQuery(_this).data('activation', 'activated');
              jQuery(_this).trigger('change');
            }
          } else {
            jQuery(_this).data('activation', 'paused');
          }
        },
        click: function click() {
          if (jQuery(_this).data('activation') === 'paused') {
            jQuery(_this).data('activation', 'activated');
            jQuery(_this).trigger('change');
          }
        },
        change: function change() {
          if (jQuery(_this).data('activation') === 'activated') {
            var optionHref = jQuery(_this).val();
            var $pagerItem = jQuery('.pager__item:hidden');
            $pagerItem.children('a[href="' + optionHref + '"]').click();
          }
        }
      });
      jQuery('.pager__combo-container', _this).before(select);
    }
  });
}

function tab() {
  var _this = this;

  jQuery('.nav-tabs--with-content').once('nav-tabs', function () {
    var $this = jQuery(_this);
    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register('screen and (max-width: 479px)', {
        // Setup.
        setup: function setup() {
          $this.siblings('.tab-content').children().addClass('tab-pane');
        },
        // Mobile.
        match: function match() {
          $this.siblings('.tab-content').children().removeClass('tab-pane');
        },
        // Desktop.
        unmatch: function unmatch() {
          $this.siblings('.tab-content').children().addClass('tab-pane');
        }
      });
    }
  });
}

function timeline(showTimelineText) {
  var $timelineSelector = jQuery('.timeline');

  jQuery($timelineSelector).once('timeline', function () {
    var timelineItemSelector = '.timeline__item';
    var timelineItemsCount = jQuery(timelineItemSelector).length;
    var timeLineButton = '\n      <div class="timeline__footer">\n        <button class="btn btn-time-line">' + showTimelineText + '</button>\n      </div>';

    if (timelineItemsCount > 4) {
      $timelineSelector.append(timeLineButton);
      jQuery(timelineItemSelector).each(function (index, element) {
        if (index >= 4) {
          jQuery(element).addClass('hidden');
        }
      });

      jQuery('.btn-time-line').click(function (event) {
        event.preventDefault();
        jQuery(event.target).hide();
        jQuery(timelineItemSelector).removeClass('hidden');
        // Refreshing scrollspy to recalculate the offset.
        jQuery('body').scrollspy('refresh');
      });
    }
  });
}

function fixBlockHeights($block) {
  var _this = this;

  $block.each(function () {
    var $wrapper = jQuery(_this);
    var $blocks = [];

    // Columns and rows.
    if ($wrapper.hasClass('listing__wrapper--two-columns') || $wrapper.hasClass('listing__wrapper--row-two')) {
      (function () {
        var selector = '.listing__item-link > :first-child';
        // Two column listing blocks.
        var $firstColumn = undefined;
        var $lastColumn = undefined;

        if ($wrapper.hasClass('listing__wrapper--two-columns')) {
          $firstColumn = $wrapper.find('.listing:first-child .listing__item');
          $lastColumn = $wrapper.find('.listing:last-child .listing__item');
        } else if ($wrapper.hasClass('listing__wrapper--row-two')) {
          // Row with two items.
          $firstColumn = $wrapper.find('.listing .listing__item:nth-child(odd)');
          $lastColumn = $wrapper.find('.listing .listing__item:nth-child(even)');
        }

        // First column always contains more items if not equal.
        $firstColumn.each(function (index, item) {
          // Only applicable if there's an item in the other column at index.
          if (!$lastColumn.eq(index)) {
            return;
          }
          var $row = jQuery(item).find(selector).add($lastColumn.eq(index).find(selector));
          $blocks.push($row);
        });
      })();
    } else {
      // Simple listing blocks.
      $blocks.push($wrapper.find('.listing__item-link > :first-child'));
    }

    for (var i = 0, max = $blocks.length; i < max; i++) {
      $blocks[i].matchHeight();
    }
  });
}

function equalHeight(breakpoints) {
  var _this2 = this;

  jQuery('.equal-height').once('equal-height-blocks', function () {
    var $equalHeightBlock = jQuery(_this2);
    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register(breakpoints.small, {
        // Desktop.
        match: function match() {
          return fixBlockHeights($equalHeightBlock, false);
        },
        // Mobile.
        unmatch: function unmatch() {
          return fixBlockHeights($equalHeightBlock, true);
        }
      });
    }
  });
}

exports.breadcrumb = breadcrumb;
exports.collapse = collapse;
exports.file = file;
exports.filters = filters;
exports.inpageNav = inpageNav;
exports.languageSwitcherPage = languageSwitcherPage;
exports.langSelectSite = langSelectSite;
exports.pager = pager;
exports.tab = tab;
exports.timeline = timeline;
exports.equalHeight = equalHeight;

}((this.Europa = {})));
//# sourceMappingURL=europa.js.map