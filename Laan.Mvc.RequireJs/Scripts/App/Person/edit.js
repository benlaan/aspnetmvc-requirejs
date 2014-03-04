define(["underscore", "logging", "knockout", "http", "widget", "app/person/model"], function (_, log, ko, http, widget, Person) {

    return new function () {

        var id = _.last(window.location.pathname.split("/"));

        log.debug("Person.Edit." + id);

        widget.datepicker();

        http.getJson("/api/Person/" + id, function (data) {

            var person = new Person(data);
            ko.applyBindings(person);
        });
    };
});