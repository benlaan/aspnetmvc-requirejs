define(["underscore", "App/Common/Logging"], function (_, logging) {
    var App = function () { };

    _.extend(App.prototype, {

        init: function () {

            logging.write("Init...");
        }
    });

    return new App();
});