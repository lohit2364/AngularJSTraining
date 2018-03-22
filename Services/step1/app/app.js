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
            templateUrl: "./app/templates/catsList.tpl.html"
        }).state("catDetails", {
            url: "/catDetails/:id",
            templateUrl: "./app/templates/catDetails.tpl.html"
        });
}

appRun.$inject = ['$httpBackend'];
function appRun($httpBackend) {
    $httpBackend.whenGET(new RegExp('.html')).passThrough();  
}