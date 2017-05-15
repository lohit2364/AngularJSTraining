(function () {

    validateCatUrl.$inject = ['utilityService', '$q'];

    function validateCatUrl(utilityService, $q) {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, mCtrl) {

                mCtrl.$asyncValidators.invalidUrl = function (modelValue, viewValue) {
                    var url = modelValue || viewValue;
                    return utilityService.isImage(url)
                            .then(function (isValid) {
                                if (!isValid) {
                                    return $q.reject('Invalid URL')
                                }
                                return true;
                            });
                }
            }
        };
    }

    angular.module('catClicker')
        .directive('validateCatUrl', validateCatUrl);

})()