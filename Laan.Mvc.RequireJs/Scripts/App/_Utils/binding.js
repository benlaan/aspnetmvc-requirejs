define(["logging", "knockout", "ko-mapping", "underscore", "jquery"], function (log, ko, mapping, _, $) {

    ko.bindingHandlers.auto = {

        init: function (element, valueAccessor, allBindingsAccessor, data) {

            var property = element.name;
            var value = element.value;

            //create the observable, if it doesn't exist 
            if (!ko.isWriteableObservable(data[property])) {
                data[property] = ko.observable();
            }

            data[property](value);

            ko.applyBindingsToNode(element, { value: data[property] });
        }
    };

    return {

        fromJson: function (entity, json) {

            var mappedEntity = mapping.fromJS(json);
            _.extend(this, mappedEntity);
        },

        toJson: function(entity) {

            return mapping.toJSON(entity);
        },

        observable: function (value) {

            return ko.observable(value);
        },

        init: function (entity, selector) {

            var $selector = undefined;
            if (selector) {

                $selector = $(selector);
                if ($selector.length != 1)
                    throw "Invalid selector - must return one element: " + selector;
            }

            ko.applyBindings(entity, $selector[0]);
        }

    };
});