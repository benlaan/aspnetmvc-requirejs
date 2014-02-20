define(["moment", "underscore", "logging", "jquery", "string"], function (moment, _, log, $) {

    function Entity() {

    };

    _.extend(Entity.prototype, {

        registerProperty: function (fieldName) {

            var self = this;
            var selector = "input[name='" + fieldName + "']";
            var selectorField = "_" + fieldName.toJavaCase();

            // store the selector
            this[selectorField] = $(selector);

            // define a setter
            this["get" + fieldName] = function () {

                var value = self[selectorField].val();
                log.debug(["get" + fieldName, "=>", value]);
                return value;
            };

            // define a getter
            this["set" + fieldName] = function (value) {

                log.debug(["set" + fieldName, "<=", value]);
                self[selectorField].val(value);
            };

            // hook the change event to the 'update' method
            $(selector).change(function (value) {

                log.debug(["onChange", selector]);
                self.update(fieldName, self["get" + fieldName]());
            });
        },

        initialise: function () {

            var entity = this;

            // register the selector for each field (prefixed with an underscore)
            _.each(this.fields, function (property) {

                entity.registerProperty(property.toCamelCase());
            });
        }
    });

    return {

        createDescendantOf: function (DescendantType) {

            var descendant = _.extend(DescendantType.prototype, Entity.prototype);
            descendant.self = descendant;
            descendant.initialise();
            return descendant;
        }
    };
});