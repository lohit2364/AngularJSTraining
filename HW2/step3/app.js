angular.module('catClicker', ['ngRoute']);

angular.module('catClicker')
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "./templates/catsList.tpl.html"
            })
            .when("/newCat", {
                templateUrl: "./templates/newCat.tpl.html"
            })
    });