var version = Date.now();

require.config({

    baseUrl: "../",

    //urlArgs: "version=" + version,

    paths: {
        "jquery": "Libs/jquery/jquery-1.7.1.min",
        "jquery-ui": "Libs/jquery/jquery-ui-1.8.20.min",
        "underscore": "Libs/Underscore/underscore.min",
        "moment": "Libs/moment/moment.min",
        "knockout": "Libs/knockout/knockout-3.0.0",
        "qunit": "Libs/qunit/qunit",

        // common libs only - don't add everything.. just the well-used libs
        "logging": "App/_Utils/logging",
        "http": "App/_Utils/http",
        "string": "App/_Utils/string",
        "entity": "App/_Utils/entity",
        "widget": "App/_Utils/widget"
    },

    shim: {
        "underscore": {
            exports: "_"
        },
        "qunit": {
            exports: "QUnit"
        }
}
});
    
// Resolve all testModules and then start the Test Runner.
require(["qunit", "underscore"], function(qunit, _){

    var tests = [
        "_Utils/test-utils-entity",
        "Book/test-book-model"
    ];

    // load all the tests
    _.each(tests, function (m) {
        require(["Tests/" + m]);
    });

    qunit.load();
    qunit.start();
});
