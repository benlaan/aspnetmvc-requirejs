define(["moment", "underscore", "logging", "entity", "widget"], function (moment, _, log, entity, widget) {

    function Book() { };

    _.extend(Book.prototype, {

        fields: ["title", "publishDate", "author"],

        update: function (field, value) {

            log.debug(field, value);

            switch (field) {

                case "PublishDate":
                    if (new moment(value) > moment(Date.now)) {

                        log.debug("invalid change to publish date!");
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

            alert("Printing " + this.getTitle());
        }
    });

    return new function () {

        log.debug("Book.Edit");

        // initialise model
        var book = entity.createDescendantOf(Book);

        // initialise widgets
        widget.datepicker();
        widget.button("print", book);

        // appply custom business rules to the entity itself
        var title = book.getTitle();
        var publishDate = book.getPublishDate();
        var author = book.getAuthor();

    };
});