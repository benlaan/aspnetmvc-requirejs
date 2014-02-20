define(["underscore", "logging", "knockout"], function (_, log, ko) {

    function Person() {

        this.firstName = "Ben";
        this.lastName = "Laan";
    }

    return new function () {

        log.debug("Home.About!");

        ko.applyBindings(new Person());

    };
});