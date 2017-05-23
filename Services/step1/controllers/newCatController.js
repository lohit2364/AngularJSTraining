(function () {

    newCatController.$inject = ['utilityService'];

    function newCatController(utilityService) {
        var vm = this;
        vm.imgSrc = "";

        vm.saveNewCat = saveNewCat;

        function saveNewCat(cat) {
            console.log(cat);
        }

    }

    angular.module('catClicker')
        .controller('newCatController', newCatController);

})();

// https://www.w3schools.com/images/w3schools_green.jpg