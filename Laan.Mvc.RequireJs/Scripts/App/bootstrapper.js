require.config({

    baseUrl: "/Scripts/",

    paths: {
        "jquery": "Libs/jquery/jquery-1.7.1.min",
        "underscore": "Libs/Underscore/underscore.min",
        "moment": "Libs/moment/moment.min",
        "knockout": "Libs/knockout/knockout-3.0.0",

        // common libs only - don't add everything.. just the well-used libs
        "logging": "App/Common/logging",
        "http": "App/Common/http"
    },

    shim: {
        "underscore": {
            exports: "_"
        }
    }
});

require(["App/app"], function (app) {
    app.init();
});
