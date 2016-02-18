export function timeline(showTimelineText) {
  const $timelineSelector = jQuery('.timeline');

  jQuery($timelineSelector).once('timeline', () => {
    const timelineItemSelector = '.timeline__item';
    const timelineItemsCount = jQuery(timelineItemSelector).length;
    const timeLineButton = `
      <div class="timeline__footer">
        <button class="btn btn-time-line">${showTimelineText}</button>
      </div>`;

    if (timelineItemsCount > 4) {
      $timelineSelector.append(timeLineButton);
      jQuery(timelineItemSelector).each((index, element) => {
        if (index >= 4) {
          jQuery(element).addClass('hidden');
        }
      });

      jQuery('.btn-time-line').click((event) => {
        event.preventDefault();
        jQuery(event.target).hide();
        jQuery(timelineItemSelector).removeClass('hidden');
        // Refreshing scrollspy to recalculate the offset.
        jQuery('body').scrollspy('refresh');
      });
    }
  });
}
