define(["underscore", "logging"], function (_, log) {

    var App = function () { };

    _.extend(App.prototype, {

        init: function () {

            log.debug("App.Init");
        }
    });

    return new App();
});