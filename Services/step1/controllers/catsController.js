(function () {

    catsController.$inject = [
        '$filter',
        'catService'
    ];

    function catsController(
        $filter,
        catService
    ) {
        var vm = this,
            allCats;
        vm.selectedCat = null;
        vm.selectedOrder = 'name';

        getAllCats();

        vm.selectCat = function (cat) {
            cat.isVisited = true;
            vm.selectedCat = cat;
        };
        
        vm.searchCats = function () {
            var model = vm.searchInput;
            vm.cats = $filter('filter')(allCats, { name: model });
        };

        vm.deleteCat = function ($event, catId) {
            $event.stopPropagation();
            catService.deleteCat(catId)
                .then(getAllCats)
        }

        function getAllCats() {
            catService.getAllCats()
                .then(function (cats) {
                    vm.cats = cats;
                });
        }
    }

    angular.module('catClicker')
        .controller('catsController', catsController);

})();