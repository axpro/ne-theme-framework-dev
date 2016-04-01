/**
 * File component related behaviors.
 */

export function file() {
  const $button = jQuery('.file__translations-control');
  const $translations = jQuery('.file__translations-list');

  $button.click(() => {
    const self = this;
    $translations.collapse('toggle');
    jQuery(self).toggleClass('is-collapsed');
  });
}
