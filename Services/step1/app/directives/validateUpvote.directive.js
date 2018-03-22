(function () {

    validateUpvote.$inject = ['$cookies', 'mockCatApi'];

    angular.module('catClicker').directive('validateUpvote', validateUpvote);

    function validateUpvote($cookies, mockCatApi) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, modelCtrl) {
                function myValidation() {
                    var catId = scope.$eval(attr.validateUpvote);
                    var prevValue = $cookies.get(catId);
                    var catObject = mockCatApi.allCats.find(function (catObj) {
                        return catObj.id == catId;
                    });

                    if (prevValue) {
                        catObject.votes = parseInt(prevValue, 10);
                        modelCtrl.$setViewValue(prevValue);
                    } else {
                        catObject.votes = parseInt(modelCtrl.$viewValue, 10);
                        $cookies.put(catId, parseInt(modelCtrl.$viewValue, 10));
                    }
                    modelCtrl.$render();
                }
                modelCtrl.$parsers.push(myValidation);
            }
        }
    }

})();