// options.js

function saveOptions () {
    var options = {};
    
    options.replaceComicSans
        = $('#replace_comic_sans:checked').val() != null;
    
    localStorage.allvetica = JSON.stringify( options );
}

function loadOptions () {
    var options = JSON.parse( localStorage.allvetica );
    
    $('#replace_comic_sans').attr('checked', options.replaceComicSans);
}

