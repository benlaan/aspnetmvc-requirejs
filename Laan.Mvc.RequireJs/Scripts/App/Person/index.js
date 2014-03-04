define(["logging", "knockout", "http"], function (log, ko, http) {

    return new function () {

        log.debug("Person.Index!");

        http.getJson("/api/Person", function (people) {

            ko.applyBindings({ People: people });
        });
    };
});
