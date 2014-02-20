define(["underscore"], function (_) {

    var Logging = function () {

        this.enabled = true;

        this.write = function (message) {

            if (this.enabled) {

                if (!_.isArray(message))
                    message = [message];

                console.log(_.head(message), _.tail(message).join(" "));
            }
        }
    };

    return new Logging();
});
