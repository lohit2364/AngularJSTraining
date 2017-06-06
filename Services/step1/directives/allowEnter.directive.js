(function () {

    allowEnter.$inject = ['$document'];
    angular.module('catClicker').directive('allowEnter', allowEnter);

    function allowEnter($document) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $document.on('keyup', function (e) {
                    if (e.keyCode === 13) {
                        element[0].click();
                    }
                });
            }
        }
    }
})();