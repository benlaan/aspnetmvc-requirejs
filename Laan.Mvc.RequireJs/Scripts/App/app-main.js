﻿require.config({

    baseUrl: "/Scripts/",

    urlArgs: "version=" + document.__applicationVersion,

    paths: {
        "jquery": "Libs/jquery/jquery-1.7.1.min",
        "jquery-ui": "Libs/jquery/jquery-ui-1.8.20.min",
        "underscore": "Libs/Underscore/underscore.min",
        "moment": "Libs/moment/moment.min",
        "knockout": "Libs/knockout/knockout-3.0.0",

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
        }
    }
});

// only used to get to configure the above urlArgs
delete document.__applicationVersion;

require(["App/app", "underscore"], function (app, _) {

    app.init();

    findMainScript = function () {

        var scripts = document.getElementsByTagName('script');

        return _.find(scripts, function (s) {
            return s.getAttribute('data-main');
        });
    };

    // attempt to find the 'data-main' script tag
    // this script tag will also have a data-start tag which will
    // then be loaded by requirejs - i.e. for the page's actual
    // script block
    var mainJs = findMainScript();
    if (!mainJs)
        return;

    var start = mainJs.getAttribute('data-start');
    if (start)
        require([start]);
});