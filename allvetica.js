// allvetica.js

chrome.extension.sendRequest(
    { data: 'options' },
    function (response) {
        var options = response.options;
        
        var fonts = [];
        if (options.replaceArial)       fonts.push("Arial");
        if (options.replaceComicSans)   fonts.push("Comic\\s*Sans\\s*(MS|2010)?");
        if (options.replaceMarkerFelt)  fonts.push("Marker\\s*Felt");
        if (options.replacePapyrus)     fonts.push("Papyrus");
        
        var replacement = options.replacement;
        
        if (!replacement && options.replacementCustomValid) {
            replacement = options.replacementCustom;
        }
        
        if (replacement && fonts.length) {
            fixInvalidStyles(fonts, replacement);
            replaceFont(fonts, replacement);
        }
        
        if (options.optimizeLegibility)
            jQuery('body').css('text-rendering', 'optimizeLegibility');
    }
);


// Attempt to fix and reinject invalid CSS for more robust font replacement
function fixInvalidStyles (fonts, replacement) {
    var allStyles = '';
    
    jQuery('head style').each( function (i, e) {
        var style = jQuery(this).html();
        var invalidContent = new RegExp( '<!--|-->|<\\w[^>]*>', 'g' );
        
        if (style.match( invalidContent )) {
            var toReplace = new RegExp("[\\'\\\"\\s]*(" + fonts.join('|') + ")[\\'\\\"\\s]*(?=,|)", "gi");
        
            style = style.replace( invalidContent, '' );
            allStyles += style.replace( toReplace, "'" + replacement + "'");
        }
    } );
    
    jQuery('head').append('<style type="text/css">' + allStyles + '</style>');
}


function replaceFont (fonts, replacement) {

    var fontSearch = "[\\'\\\"\\s]*(" + fonts.join('|') + ")[\\'\\\"\\s]*(?=,|$)";
    var toReplace = new RegExp(fontSearch, "gi");

    // Adjust style sheets
    if (document.styleSheets) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var styleSheet = document.styleSheets[i];
            
            if (styleSheet.cssRules) {
                for (var j = 0; j < styleSheet.cssRules.length; j++) {
                    var cssRule = styleSheet.cssRules[j];
                    
                    // Replace in font-family attribute
                    if (cssRule.style.fontFamily.match(toReplace))
                        cssRule.style.fontFamily = cssRule.style.fontFamily.replace(toReplace, replacement);
        
                    // Replace in font attribute
                    if (cssRule.style.font.match(toReplace))
                        cssRule.style.font = cssRule.style.font.replace(toReplace, replacement);
                }
            }
        }
    }
    
    // Adjust inline styles
    jQuery('body').find('*').each(
        function (i) {
            if (jQuery(this).css('font-family').match(toReplace))
                jQuery(this).css('font-family', jQuery(this).css('font-family').replace(toReplace, replacement));
            
            if (jQuery(this).css('font').match(toReplace))
                jQuery(this).css('font', jQuery(this).css('font').replace(toReplace, replacement));
        }
    );

    // Adjust font tag properties
    jQuery('body').find('font').each(
        function (i) {
            if (jQuery(this).attr('face').match(toReplace))
                jQuery(this).attr('face', jQuery(this).attr('face').replace(toReplace, replacement));
        }
    );
    
}
