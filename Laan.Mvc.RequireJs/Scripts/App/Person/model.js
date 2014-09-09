/// <reference path="../../Libs/require/require.js" />
/// <reference path="../_Utils/http.js" />

define(["binding", "http"], function (binding, http) {

    // define the constructor function
    function Person(json) {

        var self = this;

        // define the properties when we are creating a new entity
        // These will be replaced by the mapping component below..
        this.FirstName = binding.observable();
        this.LastName = binding.observable();
        this.BirthDate = binding.observable();

        if (json) {

            binding.fromJson(this, json);
        }

        this.print = function (e) {

            alert("Printing for " + self.FirstName() + " " + self.LastName());
        };

        this.save = function () {

            http.postJson("/api/Person", binding.toJson(self), function () {

                window.location = "/Person";
            });
        };

        this.cancel = function () {

            window.location = "/Person";
        };
    }

    return Person;
});