/**
 * In-page nav related behaviors.
 */

export function inpageNav(nodeTitle, onThisPageText, toggleNavText) {
  const currentTitle = ($navBar, $navBarCurrent) => {
    // Clear title for In page nav navbar title if nothing selected.
    const currentItem = jQuery('li.active > a', $navBar);
    if (currentItem.length === 0) {
      $navBarCurrent.text(nodeTitle);
    } else {
      $navBarCurrent.text(currentItem.text());
    }
  };

  jQuery('.inpage-nav').once('page-navigation', () => {
    const $inPage = jQuery(this);
    const $inPageBlock = $inPage.parents('.inpage-nav__wrapper');
    const $inPageBlockParent = $inPageBlock.parent();
    let inPageBlockHeight = $inPageBlock.height();
    let inPageBlockTop = $inPageBlock.offset().top;
    const title = nodeTitle;

    // Calculate width on window resize, and check offset height of in-page
    // nav block.
    jQuery(window).resize(() => {
      $inPageBlock.css({ width: `${$inPageBlockParent.width()}px` });
      inPageBlockTop = $inPageBlock.offset().top;
      inPageBlockHeight = $inPageBlock.height();

      // Refresh scrollspy.
      jQuery('body').scrollspy('refresh');
    });

    const $navBar = jQuery(`
          <div class="inpage-nav__navbar-wrapper is-scrollspy-target">
            <nav class="navbar navbar-default navbar-fixed-top inpage-nav__navbar">
              <div class="container inpage-nav__container">
                <div class="navbar-header inpage-nav__header"
                  data-toggle="collapse" data-target="#inpage-navigation-list"
                  aria-expanded="false" aria-controls="navbar">
                  <button type="button" class="navbar-toggle collapsed inpage-nav__toggle">
                    <span class="sr-only">${toggleNavText}</span>
                    <span class="inpage-nav__icon-arrow icon icon--arrow-down"></span>
                  </button>
                  <span class="navbar-brand inpage-nav__help">${onThisPageText}</span>
                <div class="inpage-nav__current-wrapper">
                <span class="navbar-brand inpage-nav__current">${title}</span>
                </div>
              </div>
              <div class="navbar-collapse collapse" id="inpage-navigation-list">
                <span class="inpage-nav__title" >${title}</span>${$inPage.html()}
              </div>
            </div>
          </nav>`);

    const $navBarCurrent = jQuery('.inpage-nav__current', $navBar);
    const $navBarList = jQuery('.inpage-nav__list', $navBar);

    $navBarList.addClass('nav inpage-nav__list--navbar');
    jQuery('body').append($navBar);

    enquire.register('screen and (min-width: 992px)', {
      // Desktop.
      match: () => {
        // Adding function that is calculating and adding inpage-nav block
        // width. This is due to usage of position: fixed on the inpage-nav
        // element.
        $inPageBlock.css({ width: `${$inPageBlockParent.width()}px` });

        // Remove class that adds overflow: hidden to body.
        jQuery('body').removeClass('is-inpage-nav-open');
        $inPageBlock.affix('checkPosition');
      },

      setup: () => {
        // Hide if clicked outside.
        jQuery('.inpage-nav__navbar', $navBar).click(() => {
          jQuery('#inpage-navigation-list').collapse('hide');
        });

        // Page navigation scroll spy.
        jQuery('body').scrollspy({ target: '.is-scrollspy-target' });

        $navBar.on('show.bs.collapse', () => {
          $navBar.addClass('is-collapsing');
        });

        $navBar.on('shown.bs.collapse', () => {
          $navBar.addClass('is-collapsed');
          $navBar.removeClass('is-collapsing');
        });

        $navBar.on('hide.bs.collapse', () => {
          $navBar.removeClass('is-collapsed');
          jQuery('body').removeClass('is-inpage-nav-open');
        });

        $navBar.on('activate.bs.scrollspy', () => {
          // Set title to current;.
          currentTitle($navBar, $navBarCurrent);
        });

        // Affix.
        $inPageBlock.affix({
          offset: {
            top: () => Math.floor($inPageBlock.parent().offset().top) - 30,
            bottom: () => jQuery('.footer').outerHeight(true) + jQuery('.footer-top').outerHeight(true) + 20
          },
        });

        jQuery(window).scroll(() => {
          const $window = jQuery(this);
          // Set title to current;.
          currentTitle($navBar, $navBarCurrent);

          // Show navbar if scroll is under the block.
          const docViewTop = $window.scrollTop();
          const inPageBottom = inPageBlockTop + inPageBlockHeight - 5;

          if (inPageBottom <= docViewTop) {
            $navBar.addClass('is-active');
          } else {
            $navBar.removeClass('is-active');
            jQuery('#inpage-navigation-list').collapse('hide');
          }
        });
      },

      // Mobile.
      unmatch: () => {
        // Collapse navbar on changing to mobile behavior.
        if (jQuery('.inpage-nav__navbar-wrapper').hasClass('is-collapsed')) {
          jQuery('#inpage-navigation-list').collapse('hide');
        }

        $navBar.on('show.bs.collapse', () => {
          jQuery('body').addClass('is-inpage-nav-open');
        });

        $navBar.on('hide.bs.collapse', () => {
          jQuery('body').removeClass('is-inpage-nav-open');
        });
      },
    });
  });
}
