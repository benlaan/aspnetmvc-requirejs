define(["underscore", "logging", "knockout"], function (_, log, ko) {

    function Person() {

        this.firstName = "Ben";
        this.lastName = "Laan";
    }

    return new function () {

        log.write("Home.About!");

        ko.applyBindings(new Person());

    };
});