// allvetica.js

chrome.extension.sendRequest(
    { data: 'options' },
    function (response) {
        var options = response.options;
        
        var fonts = [];
        if (options.replaceArial)       fonts.push("Arial");
        if (options.replaceComicSans)   fonts.push("Comic Sans( MS| 2010)?");
        if (options.replaceMarkerFelt)  fonts.push("Marker Felt");
        if (options.replacePapyrus)     fonts.push("Papyrus");
        
        var replacement = options.replacement;
        
        if (!replacement && options.replacement_custom_valid) {
            replacement = options.replacement_custom;
        }
        
        if (replacement && fonts.length) {
            var fontSearch = "[\\'\\\"]?(" + fonts.join('|') + ")[\\'\\\"]?";
            replaceFont(new RegExp(fontSearch, "gi"), replacement);
        }
        
        if (options.optimizeLegibility)
            $('body').css('text-rendering', 'optimizeLegibility');
    }
);


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
    
    // Adjust inline styles
    $('body').find('*').each(
        function (i) {
            if ($(this).css('font-family').match(toReplace))
                $(this).css('font-family', $(this).css('font-family').replace(toReplace, replacement));
            
            if ($(this).css('font').match(toReplace))
                $(this).css('font', $(this).css('font').replace(toReplace, replacement));
        }
    );

    // Adjust font tag properties
    $('body').find('font').each(
        function (i) {
            if ($(this).attr('face').match(toReplace))
                $(this).attr('face', $(this).attr('face').replace(toReplace, replacement));
        }
    );
    
}
