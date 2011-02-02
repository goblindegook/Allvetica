// options-events.js: configuration panel event handlers

jQuery(document).ready(function() {
    initOptions();
    
    jQuery('.setting')
        .change(function() { saveOptions(); });
        
    jQuery('#replacement_custom')
        .keyup(function() { checkFont(); });
    
});
