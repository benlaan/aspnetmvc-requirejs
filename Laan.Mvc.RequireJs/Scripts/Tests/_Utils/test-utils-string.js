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

    qunit.test("string templating correctly replaces tokens from argument", function () {

        // Arrange
        var text = "My name is {{Name}}. I am {{Age}} years old";
        var tokens = { Name: "Ben", Age: 38 };

        // Act
        var result = text.template(tokens);

        // Assert
        assert.equal(result, "My name is Ben. I am 38 years old");
    });

    qunit.test("string formatting correctly replaces indexed numbers from array", function () {

        // Arrange

        // Act
        var result = "My name is {0}. I am {1} years old".format(["Ben", "38"]);

        // Assert
        assert.equal(result, "My name is Ben. I am 38 years old");
    });
});