(function () {

    catsController.$inject = [];

    function catsController() {
        var vm = this;
        vm.count = 0;

        vm.cats = [{
            name: 'cat 1',
            imgSrc: './assets/images/cat1.jpg',
            clickCount: 0
        }, {
            name: 'cat 2',
            imgSrc: './assets/images/cat2.jpg',
            clickCount: 0
        }];

        vm.incrementCount = function (cat) {
            cat.clickCount++;
        };
    }

    angular.module('catClicker')
        .controller('catsController', catsController);
    
})();