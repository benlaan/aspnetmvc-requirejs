define(["qunit", "underscore", "jquery", "entity"], function (qunit, _, $, entity) {

    qunit.module("Utils/Entity", {

        setup: function () {

            var el = $(

                '<form action="/Book/Submit" method="post" class="book">' +
                '	<input type="text" name="Title" value="New Testament" />' +
                '   <div class="authors">' +
                '     <script class="template" type="text/x-jQuery-tmpl">' +
                '       <input type="text" name="{{name}}" value="{{value}}" />' +
                '     </script>' +
                '	  <input type="text" name="Authors[0]" value="Matthew" />' +
                '	  <input type="text" name="Authors[1]" value="Luke" />' +
                '	  <input type="text" name="Authors[2]" value="Paul" />' +
                '   </div>' +
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

    qunit.test("Can auto-create properties with an input list", function () {

        // Arrange
        var Book = function () { };

        // Act
        var book = entity.createDescendantFor(Book, "form.book");

        // Assert
        assert.equal(getPropertyCount(book), 1);
        assert.equal(book.Title(), "New Testament");

        var actualAuthorNames = book.Authors();
        assert.ok(_.isArray(actualAuthorNames));
        assert.deepEqual(actualAuthorNames, ["Matthew", "Luke", "Paul"]);
    });

    qunit.test("Can add a new item to a list property", function () {

        // Arrange
        var Book = function () { };
        var book = entity.createDescendantFor(Book, "form.book");

        // Act
        book.addAuthors({ value: "Ben" }, ".authors");

        // Assert
        var actualAuthorNames = book.Authors();
        assert.ok(_.isArray(actualAuthorNames));
        assert.deepEqual(actualAuthorNames, ["Matthew", "Luke", "Paul", "Ben"]);
    });

    qunit.test("Can add a new item to a list property with default selector", function () {

        // Arrange
        var Book = function () { };
        var book = entity.createDescendantFor(Book, "form.book");

        // Act
        book.addAuthors({ value: "Ben" });

        // Assert
        var actualAuthorNames = book.Authors();
        assert.ok(_.isArray(actualAuthorNames));
        assert.deepEqual(actualAuthorNames, ["Matthew", "Luke", "Paul", "Ben"]);
    });

    qunit.test("Can remove the last item from a list property", function () {

        // Arrange
        var Book = function () { };
        var book = entity.createDescendantFor(Book, "form.book");

        // Act
        book.removeAuthors({ value: "Paul" });

        // Assert
        var actualAuthorNames = book.Authors();
        assert.ok(_.isArray(actualAuthorNames));
        assert.deepEqual(actualAuthorNames, ["Matthew", "Luke"]);
    });

    qunit.test("Can remove a middle item from a list property", function () {

        // Arrange
        var Book = function () { };
        var book = entity.createDescendantFor(Book, "form.book");

        // Act
        book.removeAuthors({ value: "Luke" });

        // Assert
        var actualAuthorNames = book.Authors();
        assert.ok(_.isArray(actualAuthorNames));
        assert.deepEqual(actualAuthorNames, ["Matthew", "Paul"]);

        $("")
    });
});