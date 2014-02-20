define(["underscore"], function (_) {

    var Logging = function () {

        this.enabled = true;

        var write = function (message) {

            if (this.enabled) {

                if (!_.isArray(message))
                    message = [message];

                console.log(_.head(message), _.tail(message).join(" "));
            }
        };

        this.debug = function (message) {

            if (this.enabled) {
                write(message);
            }
        };

        this.error = function (message) {

            write(_.flatten([["ERROR"], message]));
        }
    };

    return new Logging();
});
