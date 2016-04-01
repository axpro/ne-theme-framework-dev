function fixBlockHeights($block) {
  $block.each(() => {
    const $wrapper = jQuery(this);
    const $blocks = [];

    // Columns and rows.
    if ($wrapper.hasClass('listing__wrapper--two-columns')
      || $wrapper.hasClass('listing__wrapper--row-two')) {
      const selector = '.listing__item-link > :first-child';
      // Two column listing blocks.
      let $firstColumn;
      let $lastColumn;

      if ($wrapper.hasClass('listing__wrapper--two-columns')) {
        $firstColumn = $wrapper.find('.listing:first-child .listing__item');
        $lastColumn = $wrapper.find('.listing:last-child .listing__item');
      } else if ($wrapper.hasClass('listing__wrapper--row-two')) {
        // Row with two items.
        $firstColumn = $wrapper.find('.listing .listing__item:nth-child(odd)');
        $lastColumn = $wrapper.find('.listing .listing__item:nth-child(even)');
      }

      // First column always contains more items if not equal.
      $firstColumn.each((index, item) => {
        // Only applicable if there's an item in the other column at index.
        if (!$lastColumn.eq(index)) {
          return;
        }
        const $row = jQuery(item).find(selector).add($lastColumn.eq(index).find(selector));
        $blocks.push($row);
      });
    } else {
      // Simple listing blocks.
      $blocks.push($wrapper.find('.listing__item-link > :first-child'));
    }

    for (let i = 0, max = $blocks.length; i < max; i++) {
      $blocks[i].matchHeight();
    }
  });
}

export function equalHeight(breakpoints) {
  jQuery('.equal-height').once('equal-height-blocks', () => {
    const $equalHeightBlock = jQuery(this);
    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register(breakpoints.small, {
        // Desktop.
        match: () => fixBlockHeights($equalHeightBlock, false),
        // Mobile.
        unmatch: () => fixBlockHeights($equalHeightBlock, true),
      });
    }
  });
}
