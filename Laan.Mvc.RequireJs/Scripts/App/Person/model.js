define(["ko-mapping", "underscore", "http"], function (mapping, _, http) {

    // define the constructor function
    function Person(data) {

        var self = this;

        this.print = function (e) {

            alert("Printing for " + self.FirstName() + " " + self.LastName());
        };

        this.save = function () {

            http.postJson("/api/Person", mapping.toJSON(self), function () {
                window.location = "/Person";
            });
        };

        this.cancel = function () {

            window.location = "/Person";
        };

        var map = mapping.fromJS(data);
        _.extend(this, map);
    }

    return Person;
});