(function () {

    catDetailsController.$inject = ['utilityService', 'catService', '$state'];

    function catDetailsController(utilityService, catService, $state) {
        var vm = this,
            isEdit = $state.params.id !== 'new';

        vm.saveCatDetails = saveCatDetails;

        if (isEdit) {
            catService.getCatDetails($state.params.id)
                .then(function (cat) {
                    vm.cat = cat;
                });
        }

        function saveCatDetails(cat) {
            if (isEdit) {
                catService.updateCatDetails(cat);
            } else {
                catService.addCatDetails(cat);
            }
            $state.go('home');
        }

    }

    angular.module('catClicker')
        .controller('catDetailsController', catDetailsController);

})();

// https://www.w3schools.com/images/w3schools_green.jpg