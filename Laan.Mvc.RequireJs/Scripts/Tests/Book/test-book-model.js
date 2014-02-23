define(["qunit", "underscore", "jquery", "App/book/model"], function (qunit, _, $, Book) {

    // Define the QUnit module and lifecycle.
    qunit.module("Book/Edit", {

        setup: function () {

            var el = $(
                '<form action="/Book/Submit" method="post" class="book">' + 
                '	<input type="text" name="Title" value="A Book Title" />' + 
                '	<input type="text" name="PublishDate" />' + 
                '	<input type="text" name="Author" />' + 
                '	<button type="submit" name="Save">Save</button>' + 
                '	<button id="print">Print</button>' + 
                '</form>'
            );
            
            el.appendTo('#qunit-fixture');

        },
        teardown: function () {

        }
    });

    // define helpful extension method for testing
    _.extend(Book.prototype, {

        getPropertyCount: function () {

            return _(Object.keys(this))
                .filter(function (p) { return p[0] == '_'; })
                .length;
        }
    });

    qunit.test("Can create a book instance, using the default selector argument", function () {

        // Arrange

        // Act
        var book = new Book();

        // Assert
        assert.equal(book.getPropertyCount(), 3);
        assert.equal(book.Title(), "A Book Title");
        assert.equal(book.PublishDate(), "");
        assert.equal(book.Author(), "");
    });

    qunit.test("Can create a book instance, given a selector argument", function () {

        // Arrange

        // Act
        var book = new Book("form.book");

        // Assert
        assert.equal(book.getPropertyCount(), 3);
        assert.equal(book.Title(), "A Book Title");
        assert.equal(book.PublishDate(), "");
        assert.equal(book.Author(), "");
    });

    qunit.test("Can set properties on a book and re-read them", function () {

        // Arrange
        var book = new Book("form.book");

        // Act
        book.Title("A Great Read, Guaranteed");
        book.Author("Ben Laan");
        book.PublishDate("22/11/2000");

        // Assert

        assert.equal(book.getPropertyCount(), 3);
        assert.equal(book.Title(), "A Great Read, Guaranteed");
        assert.equal(book.PublishDate(), "22/11/2000");
        assert.equal(book.Author(), "Ben Laan");
    });

    qunit.test("Setting title to empty does not change the value, but triggers an alert", function () {

        var alertMessages = [];
        window.alert = function (message) {

            alertMessages.push(message);
        };

        // Arrange
        var book = new Book("form.book");

        // Act
        book.Title("");

        // Assert
        assert.equal(book.Title(), "A Book Title");
        assert.equal(alertMessages.length, 1);
        assert.equal(alertMessages[0], "invalid title - can't be blank");
    });

});