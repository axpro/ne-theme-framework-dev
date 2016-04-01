export function collapse(showText, hideText) {
  jQuery('button[data-toggle=collapse]').each(() => {
    const dependentId = jQuery(this).attr('data-target');
    let toggler = jQuery(dependentId).hasClass('in') ? hideText : showText;
    const arrow = jQuery('.icon', jQuery(this));
    const fillMe = jQuery('.toggling-text', jQuery(this));
    fillMe.text(toggler);

    jQuery(this).click(() => {
      const up = 'icon--up';
      const down = 'icon--down';
      const add = arrow.hasClass(down) ? up : down;
      const rem = arrow.hasClass(down) ? down : up;
      toggler = fillMe.text() === hideText ? showText : hideText;
      fillMe.text(toggler);
      arrow.addClass(add).removeClass(rem);
    });
  });
}
