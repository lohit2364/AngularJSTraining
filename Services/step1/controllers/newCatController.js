(function () {

    newCatController.$inject = ['utilityService', 'catService', '$state'];

    function newCatController(utilityService, catService, $state) {
        var vm = this;
        vm.url = "";

        vm.saveNewCat = saveNewCat;

        function saveNewCat(cat) {
            catService.addNewCat(cat);
            $state.go('home');
        }

    }

    angular.module('catClicker')
        .controller('newCatController', newCatController);

})();

// https://www.w3schools.com/images/w3schools_green.jpg