if (document.styleSheets) {
    var toReplace = /Arial/i;
    var replacement = 'Helvetica';

    for (var i = 0; i < document.styleSheets.length; i++) {
        var styleSheet = document.styleSheets[i];
        
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