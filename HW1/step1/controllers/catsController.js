(function () {

    catsController.$inject = [];

    function catsController() {
        var vm = this;
        vm.count = 0;
        vm.incrementCount = function () {
            vm.count++;
        };
    }

    angular.module('catClicker')
        .controller('catsController', catsController);
    
})();