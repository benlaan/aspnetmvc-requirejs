define(["jquery", "jquery-ui"], function ($, widget) {

    var Http = function () {

        this.datePicker = function (selector) {

            $(selector || ".date").datePicker();
        }

        this.select = function (selector) {

            return $(selector);
        }

    };

    return new Http();
});