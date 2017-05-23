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

        catService.getAllCats()
            .then(function (cats) {
                vm.cats = cats;
            })

        vm.selectCat = function (cat) {
            cat.isVisited = true;
            vm.selectedCat = cat;
        };
        
        vm.searchCats = function () {
            var model = vm.searchInput;
            vm.cats = $filter('filter')(allCats, { name: model });
        };
    }

    angular.module('catClicker')
        .controller('catsController', catsController);

})();