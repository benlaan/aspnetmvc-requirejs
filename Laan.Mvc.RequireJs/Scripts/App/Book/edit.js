define(["moment", "underscore", "logging", "widget", "string"], function (moment, _, log, widget) {

    function Book() {

        // fields
        this._title = null;
        this._publishDate = null;
        this._author = null;

        // instance reference
        var self = this;

        this.getSelector = function (fieldName) {

            return "input[name='" + fieldName + "']";
        };

        this.registerProperty = function (fieldName) {

            var selector = self.getSelector(fieldName);
            var selectorField = "_" + fieldName.toJavaCase();
            self[selectorField] = widget.select(selector);

            self["get" + fieldName] = function () {

                var value = self[selectorField].val();
                log.write(["get" + fieldName, "=>", value]);
                return value;
            };

            self["set" + fieldName] = function (value) {

                log.write(["set" + fieldName, "<=", value]);
                self[selectorField].val(value);
            };

            widget.onchange(selector, function (value) {

                log.write(["onChange", selector]);
                self.update(fieldName, self["get" + fieldName]());
            });
        };

        // 'business rules are all here!
        this.update = function (field, value) {

            log.write(field, value);

            switch (field) {

                case "PublishDate":
                    if (new moment(value) > moment(Date.now)) {

                        log.write("invalid change to publish date!");
                        return;
                    }

                    break;

                case "Title":
                    if (value === "") {

                        log.write("invalid title - can't be blank");
                        return;
                    }

                    break;
            }
        }

        this.print = function () {

            alert("Printing " + self.getTitle());

        };

        // register the selector for each field (prefixed with an underscore)
        for (var property in self) {

            if (this.hasOwnProperty(property) && property[0] == "_")
                self.registerProperty(property.slice(1).toCamelCase());
        }
    }

    return new function () {

        log.write("Book.Edit");

        // initialise model
        var book = new Book();

        // initialise widgets
        widget.datepicker();
        widget.button("print", book);

        // custom business rules..
        var title = book.getTitle();
        var publishDate = book.getPublishDate();
        var author = book.getAuthor();

    };
});