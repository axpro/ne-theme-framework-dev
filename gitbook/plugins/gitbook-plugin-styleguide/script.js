require(["gitbook"], function(gitbook) {
    gitbook.events.bind("page.change", function() {
        // Close dropdown menu on click
        $('.styleguide .dropdown-menu a').on('click', function (event) {
            $(this).parents('.dropdown').toggleClass('open');
        });

        // Handle iframes
        var iframes = $('iframe');
        iframes.attr('src', function() {
            var src = $(this).attr('data-src');
            $(this).removeAttr('data-src');
            return src;
        });
        iframes.on('load', function() {
            $(this).removeClass('lazy');
            $(this).iFrameResize({
              heightCalculationMethod: 'max',
              autoResize: false
            });
        });
    });
});
