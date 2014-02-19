define(["jquery"], function ($) {

    var Http = function () {

        this.get = function (url, data, success, dataType) {

            return $.get(url, data, success, dataType);
        }

        this.getJson = function (url, data, success, dataType) {

            return $.getJSON(url, data, success, dataType);
        }

        this.post = function (url, data, success, dataType) {

            return $.post(url, data, success, dataType);
        }
    };

    return new Http();
});