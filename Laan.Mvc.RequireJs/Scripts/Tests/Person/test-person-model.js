define(["qunit", "jquery", "App/person/model", "binding"], function (qunit, $, Person, binding) {

    // Define the QUnit module and lifecycle.
    qunit.module("Person/Edit", {

        setup: function () {

            var el = $(
                '<form action="/Person/Submit" method="post" class="person">' +
                '    <input type="text" name="FirstName" value="Ben" data-bind="auto: true, value: FirstName" />' +
                '    <input type="text" name="LastName" data-bind="auto: true, value: LastName" />' +
                '    <input type="text" name="BirthDate" data-bind="auto: true, value: BirthDate" />' +
                '    <button type="submit" name="Save">Save</button>' +
                '    <button id="print">Print</button>' +
                '</form>'
            );

            el.appendTo('#qunit-fixture');

        },
        teardown: function () {

        }
    });

    qunit.test("Can auto-bind the initial value from the form's input's value", function () {

        // Arrange
        var person = new Person();

        // Act
        binding.init(person, "form.person");

        // Assert
        assert.equal(person.FirstName(), "Ben");
        assert.equal(person.LastName(), "");
        assert.equal(person.BirthDate(), "");
    });

    qunit.test("Can auto-bind then update via the form's input's value", function () {

        // Arrange
        var person = new Person();

        // Act
        binding.init(person, "form.person");

        assert.equal(person.LastName(), "");

        // NOTE: the .change() is required since jQuery doesn't trigger a change without it
        //       KnockoutJs requires the change trigger!
        $("input[name=LastName]")
            .val("Laan")
            .change();

        // Assert
        assert.equal(person.FirstName(), "Ben");
        assert.equal(person.LastName(), "Laan");
        assert.equal(person.BirthDate(), "");
    });
});