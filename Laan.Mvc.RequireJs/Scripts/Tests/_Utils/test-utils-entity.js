define(["qunit", "underscore", "jquery", "entity"], function (qunit, _, $, entity) {

    qunit.module("Utils/Entity", {

        setup: function () {

            var el = $(
                '<form action="/Book/Submit" method="post" class="book">' +
                '	<input type="text" name="Title" value="A Book To Remember" />' +
                '   <div class="metadata">' +
                '	    <input type="text" name="Author" value="Ben Laan" />' +
                '	    <input type="text" name="PublishDate" value="31/12/2001" />' +
                '   </div>' +
                '	<button type="submit" name="Save">Save</button>' +
                '	<button>Print</button>' +
                '</form>'
            );

            el.appendTo('#qunit-fixture');
        },

        teardown: function () {

        }
    });

    var getPropertyCount = function (entity) {

        return _(Object.keys(entity))
            .filter(function (p) { return p[0] == '_'; })
            .length;
    }

    qunit.test("Can auto-create properties from selector", function () {

        // Arrange
        var Book = function () { };

        // Act
        var book = entity.createDescendantFor(Book, "form.book");

        // Assert
        assert.equal(getPropertyCount(book), 3);
        assert.equal(book.Title(), "A Book To Remember");
        assert.equal(book.PublishDate(), "31/12/2001");
        assert.equal(book.Author(), "Ben Laan");
    });

    qunit.test("Can auto-create subset of properties from a selector of metadata only", function () {

        // Arrange
        var Book = function () { };

        // Act
        var book = entity.createDescendantFor(Book, ".metadata");

        // Assert
        assert.equal(getPropertyCount(book), 2);
        assert.equal(book.PublishDate(), "31/12/2001");
        assert.equal(book.Author(), "Ben Laan");
    });

    qunit.test("Can create properties from a pre-defined field listing", function () {

        // Arrange - adds 'fields' property to the book entity
        var Book = function () { };
        _.extend(Book.prototype, { fields: ["title"] });

        // Act
        var book = entity.createDescendantFor(Book, "form.book");

        // Assert
        assert.equal(getPropertyCount(book), 1);
        assert.equal(book.Title(), "A Book To Remember");
    });

    qunit.test("Dirty checks returns false for newly created entity", function () {

        var Book = function () { };

        // Act
        var book = entity.createDescendantFor(Book, "form.book");

        // Assert
        assert.equal(book.isDirty, false);
    });

    qunit.test("Dirty checks returns true for entity with modified field", function () {

        // Arrange
        var Book = function () { };
        var book = entity.createDescendantFor(Book, "form.book");

        // Act
        book.Title("Changed");

        // Assert
        assert.equal(book.isDirty, true);
    });

    qunit.test("Dirty checks returns false for entity with modified and reverted field", function () {

        // Arrange
        var Book = function () { };
        var book = entity.createDescendantFor(Book, "form.book");

        // Act
        book.Title("Changed");
        book.Title("A Book To Remember");

        // Assert
        assert.equal(book.isDirty, false);
    });

    qunit.test("Dirty checks returns false for entity with modification reverted due to a failed update", function () {

        // Arrange
        var Book = function () { };
        var book = entity.createDescendantFor(Book, "form.book");
        book.update = function () {
            return false;
        };

        // Act
        book.Title("Changed");

        // Assert
        assert.equal(book.isDirty, false);
    });
});