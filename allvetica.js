// allvetica.js

chrome.extension.sendRequest(
    { data: 'options' },
    function (response) {
        var options = response.options;
        
        var helvetica = (options.useNeueHelvetica)
            ? '\'Helvetica Neue\''
            : 'Helvetica';
        
        if (options.replaceComicSans)
            replaceFont(/[\'\"]?(Arial|Comic Sans( MS)?)[\'\"]?/gi, helvetica);
        else
            replaceFont(/[\'\"]?Arial[\'\"]?/i, helvetica);
    }
);

// Replace font on the DOM CSS

function replaceFont (toReplace, replacement) {

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
    
    // Adjust tag styles and attributes
    $('body').find('*').each(
        function (i) {            
            if ($(this).css('font-family').match(toReplace))
                $(this).css('font-family', $(this).css('font-family').replace(toReplace, replacement));
            
            if ($(this).css('font').match(toReplace))
                $(this).css('font', $(this).css('font').replace(toReplace, replacement));
            
            if (this.tagName == 'FONT' && $(this).attr('face').match(toReplace))
                $(this).attr('face', $(this).attr('face').replace(toReplace, replacement));
        }
    );
    
}
