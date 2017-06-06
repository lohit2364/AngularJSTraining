(function () {
    angular.module('catClicker').directive('voteSpinner', voteSpinner);
    
    function voteSpinner() {
        return {
            restrict: 'E',
            scope: {
                cat: '='
            },
            templateUrl: './directives/voteSpinner/voteSpinner.tpl.html',
            controller: 'voteSpinnerController',
            controllerAs: 'vs',
            bindToController: true
        }
    };
})();