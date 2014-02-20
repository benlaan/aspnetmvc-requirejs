define(["underscore", "logging"], function (_, logging) {
    var App = function () { };

    _.extend(App.prototype, {

        init: function () {

            logging.write("What do you need to do on *every* page via javascript? - hopefully nothing!");
        }
    });

    return new App();
});