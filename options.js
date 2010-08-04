// options.js

function initOptions () {
    $('#replacement option').each( function (i) {
        var fontName = $(this).val();
        if (!$(this).hasClass('embeddable') && !isFontInstalled( fontName )) {
            $(this).attr('disabled', 'disabled');
            $('#warnings')
                .html('Some font options may be unavailable in your system.')
                .show();
            // $(this).remove();
        }
    } );
    
    var options = JSON.parse( localStorage.allvetica );
    $('#replacement option').filter('[value="' + options.replacement + '"]').attr('selected', true);    
    $('#replace_arial').attr('checked', options.replaceArial);
    $('#replace_comic_sans').attr('checked', options.replaceComicSans);
    $('#replace_marker_felt').attr('checked', options.replaceMarkerFelt);
    $('#replace_papyrus').attr('checked', options.replacePapyrus);
    $('#optimize_legibility').attr('checked', options.optimizeLegibility);
}

function saveOptions () {
    var options = {};

    options.replaceArial
        = $('#replace_arial:checked').val() != null;
    
    options.replaceComicSans
        = $('#replace_comic_sans:checked').val() != null;

    options.replaceMarkerFelt
        = $('#replace_marker_felt:checked').val() != null;

    options.replacePapyrus
        = $('#replace_papyrus:checked').val() != null;
        
    options.replacement
        = $('#replacement option:selected').val();
    
    options.optimizeLegibility
        = $('#optimize_legibility:checked').val() != null;
    
    localStorage.allvetica = JSON.stringify( options );
}

function isFontInstalled (font, monospace) {
    var targetString = '~mwMW';
    var targetFamily = (monospace) ? 'sans-serif' : 'monospace, monospace';
    // Why monospace twice? It's a bug in the rendering engine:
    // http://www.undermyhat.org/blog/2009/09/css-font-family-monospace-renders-inconsistently-in-firefox-and-chrome/

    $('body').append('<div id="fontTest"></div>');
    
    $('#fontTest').css('visibility', 'hidden');
    $('#fontTest').css('position', 'absolute');
    $('#fontTest').css('left', '-9999px');
    $('#fontTest').css('top', '0');
    $('#fontTest').css('font-weight', 'bold');
    $('#fontTest').css('font-size', '200px !important');
    
    $('#fontTest').append('<span id="ftTarget"></div>');
    $('#fontTest').append('<span id="ftMatch"></div>');
    
    $('#ftTarget').append(document.createTextNode(targetString));
    $('#ftMatch').append(document.createTextNode(targetString));
    
    $('#ftTarget').css('font-family', targetFamily);
    $('#ftMatch').css('font-family', font + ',' + targetFamily );

    var targetW = $('#ftTarget').width();
    var targetH = $('#ftTarget').height();
    
    var matchW  = $('#ftMatch').width();
    var matchH  = $('#ftMatch').height();
    
    $('#fontTest').remove();

    return (targetW != matchW || targetH != matchH);
}
