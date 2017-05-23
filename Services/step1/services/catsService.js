(function () {

    catService.$inject = ['$q'];

    angular.module('catClicker')
        .factory('catService', catService);

    function catService($q) {

        var allCats = [{
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

        return {
            getAllCats: getAllCats,
            addNewCat: addNewCat
        }

        function getAllCats() {
            return $q.resolve(allCats);
        }

        function addNewCat(newCat) {
            allCats.push(newCat);
            return $q.resolve();
        }
    }

})();