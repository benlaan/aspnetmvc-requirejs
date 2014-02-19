define([], function () {

    var Logging = function () {

        this.enabled = true;

        this.write = function (message) {

            if (this.enabled)
                console.log(message);
        }
    };

    return new Logging();
});
