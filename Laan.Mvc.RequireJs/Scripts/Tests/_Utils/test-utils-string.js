define(["qunit", "string"], function (qunit) {

    qunit.module("Utils/String", {

        setup: function () {

        },

        teardown: function () {

        }
    });

    qunit.test("string to camel ensures first letter is upper case", function () {

        // Arrange

        // Act
        var result = "benLaan".toCamelCase();

        // Assert
        assert.equal(result, "BenLaan");
    });

    qunit.test("string to java ensures first letter is upper case", function () {

        // Arrange

        // Act
        var result = "BenLaan".toJavaCase();

        // Assert
        assert.equal(result, "benLaan");
    });

    qunit.test("string formatting correctly replaces tokens from argument", function () {

        // Arrange
        var text = "My name is {{Name}}. I am {{Age}} years old";
        var arguments = { Name: "Ben", Age: 38 };

        // Act
        var result = text.format(arguments);

        // Assert
        assert.equal(result, "My name is Ben. I am 38 years old");
    });
});