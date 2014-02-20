define(["moment", "underscore", "logging", "widget"], function (moment, _, log, widget) {

    function Book()
    {
        this._name;

        // register the selector for each 'field', once
        this.init = function () {
            _name = _.memoise(widget.select("name"), "book_name");
        }

        this.getName = function () {
            return _name.val()
        };

        this.setName = function (value) {
            _name.val(value);
        }

        // 'business rules are all here!
        this.changed = function (field, value) {

            if (field == "publishDate") {
                if (new moment(value) > moment.now)
                    return false;
            };

            return true;
        }

        return {

            getName: this.getName,
            setName: this.setName,
            changed: this.changed
        }
    }

    return new function () {

        log.write("Book.Edit");

        widget.datepicker();

        var book = new Book();

        widget.onchange("publishDate", function (v) { book.changed("publishDate", v); });

    };
});