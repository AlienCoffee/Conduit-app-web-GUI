
var __page_context = {};

var loadContext = function (filenames, callback) {
    for (var i = 0; i < filenames.length; i++) {
        filenames [i] = "resources/ts/" + filenames [i];
    }

    requirejs (filenames, function () { 
        for (var i = 0; i < arguments.length; i++) {
        	if (!arguments [i]) { continue; }
        	
            var keys = Object.keys (arguments [i]);
            for (var j = 0; j < keys.length; j++) {
                __page_context [keys [j]] = arguments [i][keys [j]];
            }
        }

        if (!callback) { return; }
        
        if (typeof callback === "string") {
            __page_context [callback] ();
        }

        if (typeof callback === "function") {
            callback ();
        } 
    });
}