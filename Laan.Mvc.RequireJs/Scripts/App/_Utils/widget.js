define(["jquery", "jquery-ui"], function ($) {

    var Widget = function () {

        this.datepicker = function (selector) {

            $(selector || "input[type='datetime'], input[type='date']")
                .datepicker({ dateFormat: 'dd/mm/yy' });
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

    return new Widget();
});