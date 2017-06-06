(function () {

    mockCatApi.$inject = ['$q', '$httpBackend'];

    angular.module('catClicker')
        .factory('mockCatApi', mockCatApi);

    function mockCatApi($q, $httpBackend) {
        allCats = [{
            id: 1,
            name: 'cat 1',
            url: './assets/images/cat1.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 2,
            name: 'cat 2',
            url: './assets/images/cat2.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 3,
            name: 'cat 3',
            url: './assets/images/cat3.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 4,
            name: 'cat 4',
            url: './assets/images/cat4.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 5,
            name: 'cat 5',
            url: './assets/images/cat5.jpg',
            isVisited: false,
            voteCount: 0
        }];

        // get all cats
        $httpBackend.whenGET('/cats').respond(allCats);

        // adds a new cat to the cats array
        $httpBackend.whenPOST('/cat').respond(function (method, url, data) {
            var cat = angular.fromJson(data);
            angular.extend(cat, {
                id: allCats.length + 1,
                isVisited: false,
                voteCount: 0
            });
            allCats.push(cat);
            return [200, cat, {}];
        });

        return {
            allCats: allCats
        };
    }
})();