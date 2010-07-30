// options.js

function saveOptions () {
    var options = {};
    
    options.replaceComicSans
        = $('#replace_comic_sans:checked').val() != null;

    options.replaceMarkerFelt
        = $('#replace_marker_felt:checked').val() != null;
            
    options.replacement
        = $('#replacement option:selected').val();
    
    options.optimizeLegibility
        = $('#optimize_legibility:checked').val() != null;
    
    localStorage.allvetica = JSON.stringify( options );
}

function loadOptions () {
    var options = JSON.parse( localStorage.allvetica );

    $('#replacement option').filter('[value="' + options.replacement + '"]').attr('selected', true);    
    $('#replace_comic_sans').attr('checked', options.replaceComicSans);
    $('#replace_marker_felt').attr('checked', options.replaceMarkerFelt);
    $('#optimize_legibility').attr('checked', options.optimizeLegibility);
}

