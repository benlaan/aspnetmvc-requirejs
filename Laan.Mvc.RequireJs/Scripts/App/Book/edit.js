define(["logging", "widget", "app/book/model"], function (log, widget, Book) {

    return new function () {

        log.info("Book.Edit");

        // initialise model
        var book = new Book("form.book");

        // initialise widgets
        widget.datepicker();
        widget.button("print", book);
    };
});