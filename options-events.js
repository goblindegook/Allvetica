// options-events.js: configuration panel event handlers

$(document).ready(function() {
    initOptions();
    
    $('.setting')
        .change(function() { saveOptions(); });
        
    $('#replacement_custom')
        .keyup(function() { checkFont(); });
    
});
