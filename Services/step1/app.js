angular.module('catClicker', ['ui.router', 'ngMockE2E', 'ngCookies']);

angular.module('catClicker')
    .config(appConfig)
    .run(appRun);

appConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

function appConfig($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state("home", {
            url: "/",
            templateUrl: "./templates/catsList.tpl.html"
        }).state("catDetails", {
            url: "/catDetails/:id",
            templateUrl: "./templates/catDetails.tpl.html"
        });
}

appRun.$inject = ['$httpBackend'];
function appRun($httpBackend) {
    $httpBackend.whenGET(new RegExp('.html')).passThrough();  
}