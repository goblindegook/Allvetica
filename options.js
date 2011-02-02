// options.js

function initOptions () {
    jQuery('#replacement option').each( function (i) {
        var fontName = jQuery(this).val();
        if (!jQuery(this).hasClass('embeddable')
            && !jQuery(this).hasClass('custom')
            && !isFontInstalled( fontName )) {
            jQuery(this).attr('disabled', 'disabled');
            jQuery('#warnings')
                .html('Some font options may be unavailable in your system.')
                .show();
            // jQuery(this).remove();
        }
    } );
    
    var options = JSON.parse( localStorage.allvetica );
    
    jQuery('#replacement option').filter('[value="' + options.replacement + '"]').attr('selected', true);

    jQuery('#replace_arial')
        .attr('checked', options.replaceArial);
        
    jQuery('#replace_comic_sans')
        .attr('checked', options.replaceComicSans);
        
    jQuery('#replace_marker_felt')
        .attr('checked', options.replaceMarkerFelt);
        
    jQuery('#replace_papyrus')
        .attr('checked', options.replacePapyrus);
    
    jQuery('#optimize_legibility')
        .attr('checked', options.optimizeLegibility);

    jQuery('#replacement_custom').val(options.replacementCustom);
    
    if (jQuery('#replacement option:selected').hasClass('custom')) {
        jQuery('#preview').show();
        jQuery('#replacement-advanced').show();
        checkFont(true);
    } else {
        jQuery('#preview').hide();
        jQuery('#replacement-advanced').hide();
    }
}

function saveOptions () {
    var options = {};
    
    // custom replacement font
    var customReplacementFont = jQuery('#replacement_custom').val();
    var customFontInstalled = isFontInstalled( customReplacementFont, false );
    
    if (jQuery('#replacement option:selected').hasClass('custom')) {
        jQuery('#replacement-advanced').slideDown('fast');
        checkFont(true);
    } else {
        jQuery('#replacement-advanced').slideUp('fast');
        jQuery('#preview').slideUp('fast');
        jQuery('#warnings').slideUp('fast');
    }
    
    if (customReplacementFont && customFontInstalled) {
        options.replacementCustom = customReplacementFont;
        options.replacementCustomValid = true;
        
    } else if (customReplacementFont) {
        // Invalid
        var previous = JSON.parse( localStorage.allvetica );
        options.replacementCustom = previous.replacementCustom;
        options.replacementCustomValid = true;

    } else {
        options.replacementCustom = '';
        options.replacementCustomValid = false;
    }

    options.replaceArial
        = jQuery('#replace_arial:checked').val() != null;
    
    options.replaceComicSans
        = jQuery('#replace_comic_sans:checked').val() != null;

    options.replaceMarkerFelt
        = jQuery('#replace_marker_felt:checked').val() != null;

    options.replacePapyrus
        = jQuery('#replace_papyrus:checked').val() != null;
    
    options.replacement
        = jQuery('#replacement option:selected').val();
    
    options.optimizeLegibility
        = jQuery('#optimize_legibility:checked').val() != null;
    
    localStorage.allvetica = JSON.stringify( options );
}

function checkFont (saving) {
    var fontName = jQuery('#replacement_custom').val();
    
    var customFontInstalled = (fontName) ? isFontInstalled( fontName, false ) : false;
    
    if (customFontInstalled) {
        jQuery('#replacement_custom').removeClass('notfound');
        if (saving) {
            jQuery('#warnings').slideUp('fast');
            jQuery('#custom-font-sample').css('font-family', fontName);
            jQuery('#preview').slideDown('fast');
        }
        
    } else {
        jQuery('#replacement_custom').addClass('notfound');
        if (saving) {
            var warningMsg = (fontName)
                ? 'The custom font you specified is not available.'
                : 'You must specify a custom font.';
            jQuery('#warnings').html(warningMsg).slideDown('fast');
            jQuery('#preview').slideUp('fast');
        }
    }
}

function isFontInstalled (font, monospace) {
    var targetString = '~mwMW';
    var targetFamily = (monospace) ? 'sans-serif' : 'monospace, monospace';
    // Why monospace twice? It's a bug in the rendering engine:
    // http://www.undermyhat.org/blog/2009/09/css-font-family-monospace-renders-inconsistently-in-firefox-and-chrome/
    
    jQuery('body').append('<div id="fontTest"></div>');

    jQuery('#fontTest').append('<span id="ftTarget">' + targetString + '</div>');
    jQuery('#fontTest').append('<span id="ftMatch">' + targetString + '</div>');
    
    jQuery('#ftTarget').css('font-family', targetFamily);
    jQuery('#ftMatch').css('font-family', font + ',' + targetFamily);

    var targetW = jQuery('#ftTarget').width();
    var targetH = jQuery('#ftTarget').height();
    
    var matchW  = jQuery('#ftMatch').width();
    var matchH  = jQuery('#ftMatch').height();
    
    jQuery('#fontTest').remove();

    return (targetW != matchW || targetH != matchH);
}


