define([], function () {

    String.prototype.toCamelCase = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.toJavaCase = function () {
        return this.charAt(0).toLowerCase() + this.slice(1);
    };

    String.prototype.format = function (replacements) {

        // Return all pattern matches with captured groups
        function execAll (regex, string) {
            var match = null;
            var matches = new Array();
            while (match = regex.exec(string)) {
                var matchArray = [];
                for (var i in match) {
                    if (parseInt(i) == i) {
                        matchArray.push(match[i]);
                    }
                }
                matches.push(matchArray);
            }
            return matches;
        }

        var result = this;
        var matches = execAll(new RegExp(/\{\{(.*?)\}\}/g), result);
        if (matches) {

            matches.forEach(function (token) {

                var key = token[1];
                var value = _.has(replacements, key) ? replacements[key] : "(null)";
                result = result.replace(token[0], value);
            });
        }
        return result;
    }
});
