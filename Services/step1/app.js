angular.module('catClicker', ['ui.router', 'ngMockE2E', 'ngCookies']);

angular.module('catClicker')
    .config(function ($urlRouterProvider, $stateProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "./templates/catsList.tpl.html"
            }).state("catDetails", {
                url: "/catDetails/:id",
                templateUrl: "./templates/catDetails.tpl.html"
            });
    })
    .run(function ($httpBackend) {
        $httpBackend.whenGET(new RegExp('.html')).passThrough();  
    });