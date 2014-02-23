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

    getPropertyCount = function (entity) {

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
        _.extend(Book.prototype, { fields : [ "title" ] });

        // Act
        var book = entity.createDescendantFor(Book, "form.book");

        // Assert
        assert.equal(getPropertyCount(book), 1);
        assert.equal(book.Title(), "A Book To Remember");
    });
});