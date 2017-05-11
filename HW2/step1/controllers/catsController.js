(function () {

    catsController.$inject = [];

    function catsController() {
        var vm = this;
        vm.selectedCat = null;

        vm.cats = [{
            id: 1,
            name: 'cat 1',
            imgSrc: './assets/images/cat1.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 2,
            name: 'cat 2',
            imgSrc: './assets/images/cat2.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 3,
            name: 'cat 3',
            imgSrc: './assets/images/cat3.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 4,
            name: 'cat 4',
            imgSrc: './assets/images/cat4.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 5,
            name: 'cat 5',
            imgSrc: './assets/images/cat5.jpg',
            isVisited: false,
            voteCount: 0
        }];

        vm.selectCat = function (cat) {
            cat.isVisited = true;
            vm.selectedCat = cat;
        }
    }

    angular.module('catClicker')
        .controller('catsController', catsController);
    
})();