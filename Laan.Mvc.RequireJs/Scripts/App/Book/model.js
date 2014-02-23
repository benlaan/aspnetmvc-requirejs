define(["moment", "underscore", "logging", "entity"], function (moment, _, log, entity) {

    var Book = function (selector) {

        return entity.createDescendantFor(Book, selector || "form.book");
    }

    _.extend(Book.prototype, {

        update: function (field, value) {

            switch (field) {

                case "PublishDate":
                    if (new moment(value) > moment(Date.now)) {

                        alert("invalid change to publish date!");
                        return false;
                    }
                    break;

                case "Title":
                    if (value === "") {

                        alert("invalid title - can't be blank");
                        return false;
                    }
                    break;
            }

            return true;
        },

        print: function () {

            alert("Printing " + this.Title());
        }
    });

    return Book
});