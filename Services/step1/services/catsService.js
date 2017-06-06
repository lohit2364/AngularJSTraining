(function () {

    catService.$inject = ['$q', '$http', 'mockCatApi'];

    angular.module('catClicker')
        .factory('catService', catService);

    function catService($q, $http, mockCatApi) {

        return {
            getAllCats: getAllCats,
            getCatDetails: getCatDetails,
            addCatDetails: addCatDetails,
            updateCatDetails: updateCatDetails,
            deleteCat: deleteCat
        };

        function getAllCats() {
            return $http({
                url: '/cats',
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }

        function getCatDetails(catId) {
            return $q.resolve(mockCatApi.allCats.find(function (cat) { return cat.id === Number(catId)}))
        }

        function addCatDetails(catDetails) {
            return $http({
                url: '/cat',
                method: 'POST',
                data: catDetails
            });
        }

        function updateCatDetails(catToUpdate) {
            var index = mockCatApi.allCats.findIndex(function (cat) { return cat.id === catToUpdate.id});
            allCats[index] = catToUpdate;
            return $q.resolve();
        }

        function deleteCat(catId) {
            var index = mockCatApi.allCats.findIndex(function (cat) { return cat.id === catId});
            allCats.splice(index, 1);
            return $q.resolve();
        }
    }

})();