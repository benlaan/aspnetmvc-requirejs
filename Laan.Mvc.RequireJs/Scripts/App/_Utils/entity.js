define(["moment", "underscore", "logging", "jquery", "string"], function (moment, _, log, $) {

    function Entity() { };

    _.extend(Entity.prototype, {

        trackDirty: true,
        isDirty: false,
        rootSelector: null,

        getSelector: function (selector) {

            if (this.rootSelector)
                return $(this.rootSelector).find(selector);

            return $(selector);
        },

        getSelectorField: function (fieldName) {
            return "_" + fieldName.toJavaCase();
        },

        calculateIsDirty: function () {

            if (!this.trackDirty)
                return;

            var entity = this;

            var initialValues = this.fields.map(function (f) {
                return entity[entity.getSelectorField(f)].data('initial-value');
            });

            var currentValues = this.fields.map(function (f) {
                return entity[f]();
            });

            entity.isDirty = _
                .zip(initialValues, currentValues)
                .filter(function (p) { return p[0] != p[1]; })
                .length > 0;

            entity
                .getSelector(".dirty")
                .toggle(entity.isDirty);
        },

        registerProperty: function (fieldName) {

            var self = this;
            var selector = ":input[name='" + fieldName + "']";
            var selectorField = this.getSelectorField(fieldName);

            // store the selector
            var field = this.getSelector(selector);
            this[selectorField] = field;

            // define a setter
            this[fieldName] = function () {

                if (!field)
                    return undefined;

                if (arguments != null && arguments.length > 0) {

                    field.val(arguments[0]).change();
                    log.debug(["set" + fieldName, "<=", arguments[0]]);
                }
                else {

                    var value = field.val();
                    log.debug(["get" + fieldName, "=>", value]);

                    return value;
                }
            };

            // setup initial values as data-* attributes
            var initialValue = field.val();
            field.data('initial-value', initialValue);
            field.data('last-value', initialValue);

            // hook the change event to the 'update' method
            $(selector).change(function (event) {

                log.debug(["change", selector]);

                if (self.update) {

                    var value = self[fieldName]();
                    log.debug(fieldName + " changed", value);

                    if (self.update(fieldName, value))
                        field.data('last-value', field.val());
                    else
                        field.val(field.data('last-value'))
                }

                self.calculateIsDirty();
            });
        },

        findFields: function () {

            var inputs = this
                .getSelector(":input")
                .not(':input[type=button], :input[type=submit], :input[type=reset]');

            return _(inputs)
                .map(function (s) { return s.name; })
                .filter(function (s) { return s != ""; });
        },

        initialise: function (selector) {

            var entity = this;

            if (selector)
                entity.rootSelector = $(selector);

            // if there is a fields property, then use it, otherwise find them 
            // within the root selector
            if (this.fields != undefined)
                entity.fields = this.fields;
            else
                entity.fields = this.findFields();

            // register the selector for each field (prefixed with an underscore)
            _.each(this.fields, function (property) {

                entity.registerProperty(property.toCamelCase());
            });
        }
    });

    return {

        createDescendantFor: function (DescendantType, selector) {

            var descendant = _.extend(DescendantType.prototype, Entity.prototype);
            descendant.initialise(selector);
            return descendant;
        }
    };
});