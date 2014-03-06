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
            var fields = _.filter(this.fields, function (f) {
                return f.indexOf("[") == -1;
            });

            var initialValues = fields.map(function (f) {
                return entity[entity.getSelectorField(f)].data('initial-value');
            });

            var currentValues = fields.map(function (f) {
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

        addListItem: function (fieldPartName, field, templateData, selector) {

            var selector = selector || ("." + fieldPartName.toLowerCase());
            var length = this.lists[fieldPartName].length;
            var name = "{{field}}[{{index}}]".template({ field: fieldPartName, index: length + 1 });

            var data = _.extend(templateData, { name: name });

            var template = $(selector + " .template")
                .html()
                .template(data);

            var newField = $(template);
            newField.appendTo(selector);

            this.lists[fieldPartName][length] = newField;
        },

        removeListItem: function (fieldPartName, templateData, selector) {

            var selector = selector || ("." + fieldPartName.toLowerCase());

            var list = this.lists[fieldPartName];

            var removedElement = $(selector)
                .find(":input[value=" + templateData.value + "]");

            var removedName = removedElement.attr("name");
            var index = new RegExp(/(.*)\[(\d)\]/).exec(removedName);

            removedElement.remove();
            var name = "{{field}}[{{index}}]".template({ field: fieldPartName, index: index[2] });

            list = _.filter(list, function (f) {
                return f.attr("name") != name;
            });

            _.each(list, function (e, i) {

                var name = "{{field}}[{{index}}]".template({ field: fieldPartName, index: i });
                e.attr("name", name);
            });

            this.lists[fieldPartName] = list;
        },

        registerListItem: function (field, matches) {

            var self = this;
            var fieldPartName = matches[1];
            var index = matches[2];

            if (!this.lists.hasOwnProperty(fieldPartName)) {

                this.lists[fieldPartName] = [];

                this["add" + fieldPartName] = function (templateData, selector) {

                    self.addListItem(fieldPartName, field, templateData, selector);
                }

                this["remove" + fieldPartName] = function (templateData, selector) {

                    self.removeListItem(fieldPartName, templateData, selector);
                }
            }

            this.lists[fieldPartName][index] = field;

            return fieldPartName;
        },

        registerProperty: function (name) {

            var self = this;
            var fieldName = name;
            var selector = ":input[name='" + fieldName + "']";
            var selectorField = this.getSelectorField(fieldName);

            // store the selector
            var field = this.getSelector(selector);

            var matches = new RegExp(/(.*)\[(\d)\]/).exec(fieldName);
            if (matches) {

                fieldName = self.registerListItem(field, matches);
            }
            else {

                this[selectorField] = field;

                // setup initial values as data-* attributes
                var initialValue = field.val();
                field.data('initial-value', initialValue);
                field.data('last-value', initialValue);
            }

            // define a setter
            this[fieldName] = function () {

                if (!field)
                    return undefined;

                if (arguments != null && arguments.length > 0) {

                    if (self.lists.hasOwnProperty(fieldName))
                        throw "can't set a list property";

                    field.val(arguments[0]).change();
                    log.debug(["set" + fieldName, "<=", arguments[0]]);
                }
                else {

                    var value = undefined;
                    if (self.lists.hasOwnProperty(fieldName))
                        value = self.lists[fieldName].map(function (f) { return f.val(); });
                    else
                        value = field.val();

                    log.debug(["get" + fieldName, "=>", value]);

                    return value;
                }
            };

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
            entity.lists = {};

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