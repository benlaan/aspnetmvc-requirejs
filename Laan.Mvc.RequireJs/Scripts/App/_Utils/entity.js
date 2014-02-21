define(["moment", "underscore", "logging", "jquery", "string"], function (moment, _, log, $) {

    function Entity() {

    };

    _.extend(Entity.prototype, {

        fields: null,
        rootSelector: null,

        getSelector : function(selector)
        {
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
                if (self.update)
                    self.update(fieldName, self["get" + fieldName]());
            });
        },

        findFields: function() {
    
            var allfieldInputs = this
                .getSelector(":input")
                .not(':input[type=button], :input[type=submit], :input[type=reset]');

            return _
                .map(allfieldInputs, function (s) { return s.name; })
                .filter(function (s) { return s != ""; });
        },

        initialise: function (selector) {

            var entity = this;
            if(selector)
                entity.rootSelector = $(selector);

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
            descendant.self = descendant;
            descendant.initialise(selector);
            return descendant;
        }
    };
});