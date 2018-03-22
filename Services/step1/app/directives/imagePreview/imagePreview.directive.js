(function () {
    angular.module('catClicker').directive('imagePreview', imagePreview);
    
    function imagePreview() {
        return {
            restrict: 'E',
            scope: {
                url: '='
            },
            templateUrl: './directives/imagePreview/imagePreview.tpl.html',
            controller: 'imagePreviewController',
            controllerAs: 'ip',
            bindToController: true
        }
    };
})();