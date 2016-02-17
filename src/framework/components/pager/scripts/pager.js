/**
 * Pager related behaviors.
 */

export function pager(pageText) {
  let options = '';
  jQuery('ul.pager').once('pager', () => {
    jQuery('li.select', this).once('pagerselect', () => {
      const $link = jQuery('a', this);
      let value;
      let title;
      let selected;

      if ($link.length > 0) {
        value = $link.attr('href');
        title = `${pageText}  ${$link.html()}`;
        selected = '';
      } else {
        value = '';
        title = `${pageText}  ${jQuery(this).html()}`;
        selected = ' selected="selected"';
      }

      options += `<option value="${value}"${selected}>${title}</option>`;
      jQuery(this).hide();
    });

    if (options !== '') {
      const select = jQuery(`
        <span class="pager__combo-upper">
          <select class="pager__combo-dropdown">
            ${options}
          </select>
        </span>`);

      select.children().data('activation', 'activated').on({
        keydown: (event) => {
          if (event.which === 13) {
            if (jQuery(this).data('activation') === 'paused') {
              jQuery(this).data('activation', 'activated');
              jQuery(this).trigger('change');
            }
          } else {
            jQuery(this).data('activation', 'paused');
          }
        },
        click: () => {
          if (jQuery(this).data('activation') === 'paused') {
            jQuery(this).data('activation', 'activated');
            jQuery(this).trigger('change');
          }
        },
        change: () => {
          if (jQuery(this).data('activation') === 'activated') {
            const optionHref = jQuery(this).val();
            const $pagerItem = jQuery('.pager__item:hidden');
            $pagerItem.children(`a[href="${optionHref}"]`).click();
          }
        },
      });
      jQuery('.pager__combo-container', this).before(select);
    }
  });
}
