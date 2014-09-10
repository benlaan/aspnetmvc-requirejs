require.config({

    baseUrl: document.__scriptsFolder,

    urlArgs: "version=" + document.__applicationVersion,

    enforceDefine: true,

    paths: {
        "jquery": "Libs/jquery/jquery-1.7.1.min",
        "jquery-ui": "Libs/jquery/jquery-ui-1.8.20.min",
        "underscore": "Libs/Underscore/underscore.min",
        "moment": "Libs/moment/moment.min",
        "knockout": "Libs/knockout/knockout-3.0.0",
        "ko-mapping": "Libs/knockout/knockout.mapping",

        // common libs only - don't add everything.. just the well-used libs
        "logging": "App/_Utils/logging",
        "http": "App/_Utils/http",
        "binding": "App/_Utils/binding",
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

require([document.__startPage]);