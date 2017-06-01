angular.module('catClicker', ['ui.router'/*, 'ngMockE2E'*/]);

angular.module('catClicker')
    .config(function ($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "./templates/catsList.tpl.html"
            }).state("newCat", {
                url: "/newCat",
                templateUrl: "./templates/newCat.tpl.html"
            });
    });