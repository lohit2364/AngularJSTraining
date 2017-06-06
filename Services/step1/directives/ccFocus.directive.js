(function () {

    angular.module('catClicker').directive('ccFocus', ccFocus);

    function ccFocus() {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                elem[0].focus();
            }
        }
    }
})();