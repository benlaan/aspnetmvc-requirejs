define(["underscore", "logging", "knockout", "http"], function (_, log, ko, http) {

    return new function () {

        log.write("Home.Index!");

        // fun with underscore.js!
        var x = _.filter([1, 2, 3, 4, 5, 6], function (n) { return n % 2 == 0; });
        _.each(x, function (n) { log.write(n); });

        http.getJson("/home/GetFibonacci?number=10", function (series) {

            ko.applyBindings({ Series: series });
        });
    };
});
