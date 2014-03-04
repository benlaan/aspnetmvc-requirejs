define(["jquery"], function ($) {

    var Http = function () {

        this.get = function (url, data, success, dataType) {

            return $.get(url, data, success, dataType);
        }

        this.getJson = function (url, data, success, dataType) {

            return $.getJSON(url, data, success, dataType);
        }

        this.post = function (url, data) {

            $.post(url, data);
        }

        this.postJson = function (url, data, success) {

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                contentType: "application/json;charset=utf-8",
                success: success
            });
        }
    };

    return new Http();
});