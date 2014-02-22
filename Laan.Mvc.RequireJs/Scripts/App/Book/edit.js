define(["moment", "underscore", "logging", "entity", "widget"], function (moment, _, log, entity, widget) {

    function Book() { };

    _.extend(Book.prototype, {

        update: function (field, value) {

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

            alert("Printing " + this.Title());
        }
    });

    return new function () {

        log.info("Book.Edit");

        log.debugEnabled = true;

        // initialise model
        var book = entity.createDescendantFor(Book, "form.book");

        // initialise widgets
        widget.datepicker();
        widget.button("print", book);

        // apply custom business rules to the entity itself
        var title = book.Title();
        var publishDate = book.PublishDate();
        var author = book.Author();

        // wait a while then change the title..
        _.delay(
            function () { book.Title(title.toUpperCase()); },
            2000
        );

    };
});