﻿define(["moment", "underscore", "logging", "widget", "book/model"], function (moment, _, log, widget, Book) {

    var Book = function () { };

    _.extend(Book.prototype, {

        update: function (field, value) {

            switch (field) {

                case "PublishDate":
                    if (new moment(value) > moment(Date.now)) {

                        alert("invalid change to publish date!");
                        return;
                    }
                    break;

                case "Title":
                    if (value === "") {

                        alert("invalid title - can't be blank");
                        return;
                    }
                    break;
            }
        },

        print: function () {

            alert("Printing " + this.Title());
        }
    });

    return new function () {

        log.info("Book.Edit");
        log.debugEnabled = true;

        // initialise model
        var book = new Book("form.book");

        // initialise widgets
        widget.datepicker();
        widget.button("print", book);
    }
});