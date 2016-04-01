
export function tab() {
  jQuery('.nav-tabs--with-content').once('nav-tabs', () => {
    const $this = jQuery(this);
    if (typeof enquire !== 'undefined') {
      // Runs on device width change.
      enquire.register('screen and (max-width: 479px)', {
        // Setup.
        setup: () => {
          $this.siblings('.tab-content').children().addClass('tab-pane');
        },
        // Mobile.
        match: () => {
          $this.siblings('.tab-content').children().removeClass('tab-pane');
        },
        // Desktop.
        unmatch: () => {
          $this.siblings('.tab-content').children().addClass('tab-pane');
        },
      });
    }
  });
}
