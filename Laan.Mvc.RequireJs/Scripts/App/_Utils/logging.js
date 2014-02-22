define(["underscore"], function (_) {

    var Logging = function () {

        this.infoEnabled = true;
        this.debugEnabled = false;

        var write = function (enabled, message) {

            if (!enabled)
                return;

            if (!_.isArray(message))
                message = [message];

            console.log(_.head(message), _.tail(message).join(" "));
        };

        this.info = function (message) {

            write(this.infoEnabled, message);
        };

        this.debug = function (message) {

            write(this.debugEnabled, message);
        };

        this.error = function (message) {

            write(true, _.flatten([["ERROR"], message]));
        }
    };

    return new Logging();
});
