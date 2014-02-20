define(["jquery", "jquery-ui"], function ($) {

    var Http = function () {

        this.datepicker = function (selector) {

            $(selector || "input.date").datepicker();
        };

        this.select = function (selector) {

            return $(selector);
        };

        this.button = function (selector, entity, arguments) {

            $("#" + selector).click(function (e) {

                e.preventDefault();
                entity[selector](arguments);
            });
        };
    };

    return new Http();
});