define(["logging"], function (log) {

    var App = function () { };

    App.prototype.init = function () {

        log.debug("App.Init");
    }

    return new App();
});