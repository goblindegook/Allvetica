// allvetica.js

var toReplace = /Arial/i;
var replacement = 'Helvetica';

// Replace font on the DOM CSS

if (document.styleSheets) {
    for (var i = 0; i < document.styleSheets.length; i++) {
        var styleSheet = document.styleSheets[i];
        
        if (styleSheet.cssRules) {
            for (var j = 0; j < styleSheet.cssRules.length; j++) {
                var cssRule = styleSheet.cssRules[j];
                
                // Replace in font-family attribute
                if (cssRule.style.fontFamily.match( toReplace )) {
                    cssRule.style.fontFamily
                        = cssRule.style.fontFamily.replace( toReplace, replacement );
                }
    
                // Replace in font attribute
                if (cssRule.style.font.match( toReplace )) {
                    cssRule.style.font
                        = cssRule.style.font.replace( toReplace, replacement );
                }
            }
        }
    }
}

$('body').find('*').each(
    function (i) {
        if ($(this).css('font-family').match( toReplace )) {
            $(this).css('font-family',
                $(this).css('font-family').replace( toReplace, replacement ));
        }
        if ($(this).css('font').match( toReplace )) {
            $(this).css('font',
                $(this).css('font').replace( toReplace, replacement ));
        }
    }
);
