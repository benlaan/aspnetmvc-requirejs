define([], function () {

    String.prototype.toCamelCase = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.toJavaCase = function () {
        return this.charAt(0).toLowerCase() + this.slice(1);
    };

});
