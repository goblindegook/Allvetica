$('*').each(
    function (i) {
        if ($(this).css('font-family')) {
            var fontFamily = $(this).css('font-family');
            fontFamily = fontFamily.replace(/Arial/i, 'Helvetica');
            $(this).css('font-family', fontFamily);
        }
    }
);