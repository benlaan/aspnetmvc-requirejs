define(["moment", "underscore", "logging", "entity", "jquery"], function (moment, _, log, entity, $) {

    // define the constructor function
    var Book = function (selector) {

        return entity.createDescendantFor(Book, selector || "form.book");
    }

    // add descendants members to the type
    _.extend(Book.prototype, {

        update: function (field, value) {

            switch (field) {

                case "PublishDate":
                    if (moment(value, "DD/MM/YYYY") > moment()) {

                        alert("cannot publish in the future");
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