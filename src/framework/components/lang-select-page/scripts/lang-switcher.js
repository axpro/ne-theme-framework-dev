/**
 * Page level language switcher.
 */

export function languageSwitcherPage(breakpoints) {
  const pageSwitcher = {
    wrapClass: '.lang-select-page',
    listClass: '.lang-select-page__list',
    itemClass: '.lang-select-page__option',
    iconClass: '.lang-select-page__icon',
    unavClass: '.lang-select-page__unavailable',
    wrapWidth: () => jQuery(pageSwitcher.wrapClass).outerWidth(),
    listWidth: () => jQuery(pageSwitcher.listClass).outerWidth(),
    iconWidth: () => jQuery(pageSwitcher.iconClass).outerWidth(),
    unavailableWidth: () => jQuery(pageSwitcher.unavClass).outerWidth(),
    itemsWidth: () => {
      let overallWidth = 0;
      jQuery(pageSwitcher.listClass).children(pageSwitcher.itemClass).each(() => {
        overallWidth += jQuery(this).outerWidth();
      });
      return overallWidth;
    },
    itemsOverflow: () => {
      const availableSpace =
        pageSwitcher.wrapWidth() - pageSwitcher.iconWidth() - pageSwitcher.unavailableWidth();

      return pageSwitcher.itemsWidth() > availableSpace - 20;
    },
  };

  jQuery('#block-language-selector-page-language-selector-page').once('lang-select-page', () => {
    const pageLanguageSelector = jQuery('.lang-select-page');
    pageLanguageSelector.selectify({
      listSelector: 'lang-select-page__list',
      item: 'lang-select-page__option',
      other: 'lang-select-page__other',
      unavailable: 'lang-select-page__unavailable',
      selected: 'is-selected',
    });

    const overflowToggle = () => {
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
        match: () => {
          jQuery(window).resize(() => {
            overflowToggle();
          });
        },
        // Mobile case.
        unmatch: () => {
          jQuery(window).off('resize');
        },
        setup: () => {
          overflowToggle();
        },
      });
    }
  });
}
