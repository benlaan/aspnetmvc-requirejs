define(["moment", "underscore", "logging", "jquery", "string"], function (moment, _, log, $) {

    function Entity() {

    };

    _.extend(Entity.prototype, {

        fields: null,
        rootSelector: null,

        getSelector: function (selector) {

            if (this.rootSelector) 
                return $(this.rootSelector).find(selector);
            
            return $(selector);
        },
        
        registerProperty: function (fieldName) {

            var self = this;
            var selector = ":input[name='" + fieldName + "']";
            var selectorField = "_" + fieldName.toJavaCase();

            // store the selector
            this[selectorField] = this.getSelector(selector);

            // define a setter
            this[fieldName] = function () {

                if (arguments != null && arguments.length > 0) {

                    self[selectorField].val(arguments[0]);
                    log.debug(["set" + fieldName, "<=", arguments[0]]);
                }
                else {

                    var value = self[selectorField].val();
                    log.debug(["get" + fieldName, "=>", value]);

                    return value;
                }
            };

            // hook the change event to the 'update' method
            $(selector).change(function (event) {

                log.debug(["change", selector]);

                if (self.update) {

                    var value = self[fieldName]();
                    log.debug(field + " changed", value);
                    self.update(fieldName, value);
                }
            });
        },

        findFields: function() {
    
            var inputs = this
                .getSelector(":input")
                .not(':input[type=button], :input[type=submit], :input[type=reset]');

            return _(inputs)
                .map(function (s) { return s.name; })
                .filter(function (s) { return s != ""; });
        },

        initialise: function (selector) {

            var entity = this;

            if(selector)
                entity.rootSelector = $(selector);

            // if there is a fields property, then use it, otherwise find them 
            // within the root selector
            if (this.fields != null)
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