// options.js

var allveticaStorage = 'net.goblindegook.allvetica';

// Saves options to localStorage

function set_options (options) {
    localStorage[allveticaStorage] = JSON.stringify( options );
}

// Restores options from localStorage

function get_options () {
    var optionsJSON = localStorage[allveticaStorage];
    var options     = JSON.parse( optionsJSON );
    return options;
}

function save_options () {
    var options = {};
    
    options['replace_comic_sans']
        = $('#replace_comic_sans:checked').val() != null;
    
    set_options( options );
}

function load_options () {
    var options = get_options();
    
    $('#replace_comic_sans').attr('checked', options['replace_comic_sans']);
}