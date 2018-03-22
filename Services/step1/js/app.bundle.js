webpackJsonp([0],{

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53);
__webpack_require__(54);
__webpack_require__(55);
__webpack_require__(56);
__webpack_require__(57);
__webpack_require__(58);
__webpack_require__(59);
__webpack_require__(60);
__webpack_require__(61);
__webpack_require__(62);
__webpack_require__(63);
__webpack_require__(64);
__webpack_require__(65);
module.exports = __webpack_require__(66);


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 54:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 55:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

(function () {

    allowEnter.$inject = ['$document'];
    angular.module('catClicker').directive('allowEnter', allowEnter);

    function allowEnter($document) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $document.on('keyup', function (e) {
                    if (e.keyCode === 13) {
                        element[0].click();
                    }
                });
            }
        }
    }
})();

/***/ }),

/***/ 57:
/***/ (function(module, exports) {

(function () {

    angular.module('catClicker').directive('ccFocus', ccFocus);

    function ccFocus() {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                elem[0].focus();
            }
        }
    }
})();

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

(function () {

    function imagePreviewController() {
        var vm = this;
    }

    angular.module('catClicker')
        .controller('imagePreviewController', imagePreviewController);

})();

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

(function () {
    angular.module('catClicker').directive('imagePreview', imagePreview);
    
    function imagePreview() {
        return {
            restrict: 'E',
            scope: {
                url: '='
            },
            templateUrl: './app/directives/imagePreview/imagePreview.tpl.html',
            controller: 'imagePreviewController',
            controllerAs: 'ip',
            bindToController: true
        }
    };
})();

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

(function () {

    validateCatUrl.$inject = ['utilityService', '$q'];

    function validateCatUrl(utilityService, $q) {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, mCtrl) {

                mCtrl.$asyncValidators.invalidUrl = function (modelValue, viewValue) {
                    var url = modelValue || viewValue;
                    return utilityService.isImage(url)
                            .then(function (isValid) {
                                if (!isValid) {
                                    return $q.reject('Invalid URL')
                                }
                                return true;
                            });
                }
            }
        };
    }

    angular.module('catClicker')
        .directive('validateCatUrl', validateCatUrl);

})()

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

(function () {

    validateUpvote.$inject = ['$cookies', 'mockCatApi'];

    angular.module('catClicker').directive('validateUpvote', validateUpvote);

    function validateUpvote($cookies, mockCatApi) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, modelCtrl) {
                function myValidation() {
                    var catId = scope.$eval(attr.validateUpvote);
                    var prevValue = $cookies.get(catId);
                    var catObject = mockCatApi.allCats.find(function (catObj) {
                        return catObj.id == catId;
                    });

                    if (prevValue) {
                        catObject.votes = parseInt(prevValue, 10);
                        modelCtrl.$setViewValue(prevValue);
                    } else {
                        catObject.votes = parseInt(modelCtrl.$viewValue, 10);
                        $cookies.put(catId, parseInt(modelCtrl.$viewValue, 10));
                    }
                    modelCtrl.$render();
                }
                modelCtrl.$parsers.push(myValidation);
            }
        }
    }

})();

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

(function () {

    function voteSpinnerController() {
        var vm = this;
    }

    angular.module('catClicker')
        .controller('voteSpinnerController', voteSpinnerController);

})();

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

(function () {
    angular.module('catClicker').directive('voteSpinner', voteSpinner);
    
    function voteSpinner() {
        return {
            restrict: 'E',
            scope: {
                cat: '='
            },
            templateUrl: './app/directives/voteSpinner/voteSpinner.tpl.html',
            controller: 'voteSpinnerController',
            controllerAs: 'vs',
            bindToController: true
        }
    };
})();

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

(function () {

    mockCatApi.$inject = ['$q', '$httpBackend'];

    angular.module('catClicker')
        .factory('mockCatApi', mockCatApi);

    function mockCatApi($q, $httpBackend) {
        allCats = [{
            id: 1,
            name: 'cat 1',
            url: './assets/images/cat1.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 2,
            name: 'cat 2',
            url: './assets/images/cat2.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 3,
            name: 'cat 3',
            url: './assets/images/cat3.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 4,
            name: 'cat 4',
            url: './assets/images/cat4.jpg',
            isVisited: false,
            voteCount: 0
        }, {
            id: 5,
            name: 'cat 5',
            url: './assets/images/cat5.jpg',
            isVisited: false,
            voteCount: 0
        }];

        // get all cats
        $httpBackend.whenGET('/cats').respond(allCats);

        // adds a new cat to the cats array
        $httpBackend.whenPOST('/cat').respond(function (method, url, data) {
            var cat = angular.fromJson(data);
            angular.extend(cat, {
                id: allCats.length + 1,
                isVisited: false,
                voteCount: 0
            });
            allCats.push(cat);
            return [200, cat, {}];
        });

        return {
            allCats: allCats
        };
    }
})();

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

(function () {

    catService.$inject = ['$q', '$http', 'mockCatApi'];

    angular.module('catClicker')
        .factory('catService', catService);

    function catService($q, $http, mockCatApi) {

        return {
            getAllCats: getAllCats,
            getCatDetails: getCatDetails,
            addCatDetails: addCatDetails,
            updateCatDetails: updateCatDetails,
            deleteCat: deleteCat
        };

        function getAllCats() {
            return $http({
                url: '/cats',
                method: 'GET'
            }).then(function (response) {
                return response.data;
            });
        }

        function getCatDetails(catId) {
            return $q.resolve(mockCatApi.allCats.find(function (cat) { return cat.id === Number(catId)}))
        }

        function addCatDetails(catDetails) {
            return $http({
                url: '/cat',
                method: 'POST',
                data: catDetails
            });
        }

        function updateCatDetails(catToUpdate) {
            var index = mockCatApi.allCats.findIndex(function (cat) { return cat.id === catToUpdate.id});
            allCats[index] = catToUpdate;
            return $q.resolve();
        }

        function deleteCat(catId) {
            var index = mockCatApi.allCats.findIndex(function (cat) { return cat.id === catId});
            allCats.splice(index, 1);
            return $q.resolve();
        }
    }

})();

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

(function () {

    utilityService.$inject = ['$q'];

    function utilityService($q) {
        return {
            isImage: isImage
        }

        function isImage(src) {
            var deferred = $q.defer();
            var image = new Image();
            image.onerror = function() {
                deferred.resolve(false);
            };
            image.onload = function() {
                deferred.resolve(true);
            };
            image.src = src;
            return deferred.promise;
        }
    }

    angular.module('catClicker')
        .service('utilityService', utilityService);

})();

/***/ })

},[52]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcC9jb250cm9sbGVycy9jYXREZXRhaWxzQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29udHJvbGxlcnMvY2F0c0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RpcmVjdGl2ZXMvYWxsb3dFbnRlci5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RpcmVjdGl2ZXMvY2NGb2N1cy5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RpcmVjdGl2ZXMvaW1hZ2VQcmV2aWV3L2ltYWdlUHJldmlldy5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL2ltYWdlUHJldmlldy9pbWFnZVByZXZpZXcuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL3ZhbGlkYXRlQ2F0VXJsLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZGlyZWN0aXZlcy92YWxpZGF0ZVVwdm90ZS5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RpcmVjdGl2ZXMvdm90ZVNwaW5uZXIvdm90ZVNwaW5uZXIuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZGlyZWN0aXZlcy92b3RlU3Bpbm5lci92b3RlU3Bpbm5lci5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21vY2tzL21vY2tDYXRBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzL2NhdHNTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy91dGlsaXR5U2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFD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LHlCQUF5QjtBQUM5RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEk7Ozs7Ozs7QUNuREQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDLEkiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJywgWyd1aS5yb3V0ZXInLCAnbmdNb2NrRTJFJywgJ25nQ29va2llcyddKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJylcclxuICAgIC5jb25maWcoYXBwQ29uZmlnKVxyXG4gICAgLnJ1bihhcHBSdW4pO1xyXG5cclxuYXBwQ29uZmlnLiRpbmplY3QgPSBbJyR1cmxSb3V0ZXJQcm92aWRlcicsICckc3RhdGVQcm92aWRlciddO1xyXG5cclxuZnVuY3Rpb24gYXBwQ29uZmlnKCR1cmxSb3V0ZXJQcm92aWRlciwgJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcblxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoXCJob21lXCIsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi9hcHAvdGVtcGxhdGVzL2NhdHNMaXN0LnRwbC5odG1sXCJcclxuICAgICAgICB9KS5zdGF0ZShcImNhdERldGFpbHNcIiwge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NhdERldGFpbHMvOmlkXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi4vYXBwL3RlbXBsYXRlcy9jYXREZXRhaWxzLnRwbC5odG1sXCJcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuYXBwUnVuLiRpbmplY3QgPSBbJyRodHRwQmFja2VuZCddO1xyXG5mdW5jdGlvbiBhcHBSdW4oJGh0dHBCYWNrZW5kKSB7XHJcbiAgICAkaHR0cEJhY2tlbmQud2hlbkdFVChuZXcgUmVnRXhwKCcuaHRtbCcpKS5wYXNzVGhyb3VnaCgpOyAgXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgY2F0RGV0YWlsc0NvbnRyb2xsZXIuJGluamVjdCA9IFsndXRpbGl0eVNlcnZpY2UnLCAnY2F0U2VydmljZScsICckc3RhdGUnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYXREZXRhaWxzQ29udHJvbGxlcih1dGlsaXR5U2VydmljZSwgY2F0U2VydmljZSwgJHN0YXRlKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcyxcclxuICAgICAgICAgICAgaXNFZGl0ID0gJHN0YXRlLnBhcmFtcy5pZCAhPT0gJ25ldyc7XHJcblxyXG4gICAgICAgIHZtLnNhdmVDYXREZXRhaWxzID0gc2F2ZUNhdERldGFpbHM7XHJcblxyXG4gICAgICAgIGlmIChpc0VkaXQpIHtcclxuICAgICAgICAgICAgY2F0U2VydmljZS5nZXRDYXREZXRhaWxzKCRzdGF0ZS5wYXJhbXMuaWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY2F0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uY2F0ID0gY2F0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzYXZlQ2F0RGV0YWlscyhjYXQpIHtcclxuICAgICAgICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgY2F0U2VydmljZS51cGRhdGVDYXREZXRhaWxzKGNhdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXRTZXJ2aWNlLmFkZENhdERldGFpbHMoY2F0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJylcclxuICAgICAgICAuY29udHJvbGxlcignY2F0RGV0YWlsc0NvbnRyb2xsZXInLCBjYXREZXRhaWxzQ29udHJvbGxlcik7XHJcblxyXG59KSgpO1xyXG5cclxuLy8gaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9pbWFnZXMvdzNzY2hvb2xzX2dyZWVuLmpwZ1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbnRyb2xsZXJzL2NhdERldGFpbHNDb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNhdHNDb250cm9sbGVyLiRpbmplY3QgPSBbXHJcbiAgICAgICAgJyRmaWx0ZXInLFxyXG4gICAgICAgICdjYXRTZXJ2aWNlJ1xyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYXRzQ29udHJvbGxlcihcclxuICAgICAgICAkZmlsdGVyLFxyXG4gICAgICAgIGNhdFNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXMsXHJcbiAgICAgICAgICAgIGFsbENhdHM7XHJcbiAgICAgICAgdm0uc2VsZWN0ZWRDYXQgPSBudWxsO1xyXG4gICAgICAgIHZtLnNlbGVjdGVkT3JkZXIgPSAnbmFtZSc7XHJcblxyXG4gICAgICAgIGdldEFsbENhdHMoKTtcclxuXHJcbiAgICAgICAgdm0uc2VsZWN0Q2F0ID0gZnVuY3Rpb24gKGNhdCkge1xyXG4gICAgICAgICAgICBjYXQuaXNWaXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdm0uc2VsZWN0ZWRDYXQgPSBjYXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB2bS5zZWFyY2hDYXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB2bS5zZWFyY2hJbnB1dDtcclxuICAgICAgICAgICAgdm0uY2F0cyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKGFsbENhdHMsIHsgbmFtZTogbW9kZWwgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uZGVsZXRlQ2F0ID0gZnVuY3Rpb24gKCRldmVudCwgY2F0SWQpIHtcclxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjYXRTZXJ2aWNlLmRlbGV0ZUNhdChjYXRJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldEFsbENhdHMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRBbGxDYXRzKCkge1xyXG4gICAgICAgICAgICBjYXRTZXJ2aWNlLmdldEFsbENhdHMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGNhdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5jYXRzID0gY2F0cztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2NhdHNDb250cm9sbGVyJywgY2F0c0NvbnRyb2xsZXIpO1xyXG5cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb250cm9sbGVycy9jYXRzQ29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBhbGxvd0VudGVyLiRpbmplY3QgPSBbJyRkb2N1bWVudCddO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2NhdENsaWNrZXInKS5kaXJlY3RpdmUoJ2FsbG93RW50ZXInLCBhbGxvd0VudGVyKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhbGxvd0VudGVyKCRkb2N1bWVudCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbMF0uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL2FsbG93RW50ZXIuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJykuZGlyZWN0aXZlKCdjY0ZvY3VzJywgY2NGb2N1cyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2NGb2N1cygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIGVsZW1bMF0uZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL2NjRm9jdXMuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGltYWdlUHJldmlld0NvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2ltYWdlUHJldmlld0NvbnRyb2xsZXInLCBpbWFnZVByZXZpZXdDb250cm9sbGVyKTtcclxuXHJcbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcy9pbWFnZVByZXZpZXcvaW1hZ2VQcmV2aWV3LmNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpLmRpcmVjdGl2ZSgnaW1hZ2VQcmV2aWV3JywgaW1hZ2VQcmV2aWV3KTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gaW1hZ2VQcmV2aWV3KCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vYXBwL2RpcmVjdGl2ZXMvaW1hZ2VQcmV2aWV3L2ltYWdlUHJldmlldy50cGwuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdpbWFnZVByZXZpZXdDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnaXAnLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL2ltYWdlUHJldmlldy9pbWFnZVByZXZpZXcuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhbGlkYXRlQ2F0VXJsLiRpbmplY3QgPSBbJ3V0aWxpdHlTZXJ2aWNlJywgJyRxJ107XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVDYXRVcmwodXRpbGl0eVNlcnZpY2UsICRxKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIsIG1DdHJsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbUN0cmwuJGFzeW5jVmFsaWRhdG9ycy5pbnZhbGlkVXJsID0gZnVuY3Rpb24gKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB1cmwgPSBtb2RlbFZhbHVlIHx8IHZpZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXRpbGl0eVNlcnZpY2UuaXNJbWFnZSh1cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KCdJbnZhbGlkIFVSTCcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJylcclxuICAgICAgICAuZGlyZWN0aXZlKCd2YWxpZGF0ZUNhdFVybCcsIHZhbGlkYXRlQ2F0VXJsKTtcclxuXHJcbn0pKClcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL3ZhbGlkYXRlQ2F0VXJsLmRpcmVjdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YWxpZGF0ZVVwdm90ZS4kaW5qZWN0ID0gWyckY29va2llcycsICdtb2NrQ2F0QXBpJ107XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2NhdENsaWNrZXInKS5kaXJlY3RpdmUoJ3ZhbGlkYXRlVXB2b3RlJywgdmFsaWRhdGVVcHZvdGUpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlVXB2b3RlKCRjb29raWVzLCBtb2NrQ2F0QXBpKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHIsIG1vZGVsQ3RybCkge1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbXlWYWxpZGF0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRJZCA9IHNjb3BlLiRldmFsKGF0dHIudmFsaWRhdGVVcHZvdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2VmFsdWUgPSAkY29va2llcy5nZXQoY2F0SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRPYmplY3QgPSBtb2NrQ2F0QXBpLmFsbENhdHMuZmluZChmdW5jdGlvbiAoY2F0T2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYXRPYmouaWQgPT0gY2F0SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0T2JqZWN0LnZvdGVzID0gcGFyc2VJbnQocHJldlZhbHVlLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsQ3RybC4kc2V0Vmlld1ZhbHVlKHByZXZWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0T2JqZWN0LnZvdGVzID0gcGFyc2VJbnQobW9kZWxDdHJsLiR2aWV3VmFsdWUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJGNvb2tpZXMucHV0KGNhdElkLCBwYXJzZUludChtb2RlbEN0cmwuJHZpZXdWYWx1ZSwgMTApKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxDdHJsLiRyZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG1vZGVsQ3RybC4kcGFyc2Vycy5wdXNoKG15VmFsaWRhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RpcmVjdGl2ZXMvdmFsaWRhdGVVcHZvdGUuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHZvdGVTcGlubmVyQ29udHJvbGxlcigpIHtcclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJylcclxuICAgICAgICAuY29udHJvbGxlcigndm90ZVNwaW5uZXJDb250cm9sbGVyJywgdm90ZVNwaW5uZXJDb250cm9sbGVyKTtcclxuXHJcbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcy92b3RlU3Bpbm5lci92b3RlU3Bpbm5lci5jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2NhdENsaWNrZXInKS5kaXJlY3RpdmUoJ3ZvdGVTcGlubmVyJywgdm90ZVNwaW5uZXIpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiB2b3RlU3Bpbm5lcigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgY2F0OiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL2FwcC9kaXJlY3RpdmVzL3ZvdGVTcGlubmVyL3ZvdGVTcGlubmVyLnRwbC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3ZvdGVTcGlubmVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZzJyxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcy92b3RlU3Bpbm5lci92b3RlU3Bpbm5lci5kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgbW9ja0NhdEFwaS4kaW5qZWN0ID0gWyckcScsICckaHR0cEJhY2tlbmQnXTtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpXHJcbiAgICAgICAgLmZhY3RvcnkoJ21vY2tDYXRBcGknLCBtb2NrQ2F0QXBpKTtcclxuXHJcbiAgICBmdW5jdGlvbiBtb2NrQ2F0QXBpKCRxLCAkaHR0cEJhY2tlbmQpIHtcclxuICAgICAgICBhbGxDYXRzID0gW3tcclxuICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgIG5hbWU6ICdjYXQgMScsXHJcbiAgICAgICAgICAgIHVybDogJy4vYXNzZXRzL2ltYWdlcy9jYXQxLmpwZycsXHJcbiAgICAgICAgICAgIGlzVmlzaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvdGVDb3VudDogMFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgIG5hbWU6ICdjYXQgMicsXHJcbiAgICAgICAgICAgIHVybDogJy4vYXNzZXRzL2ltYWdlcy9jYXQyLmpwZycsXHJcbiAgICAgICAgICAgIGlzVmlzaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvdGVDb3VudDogMFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgICAgIG5hbWU6ICdjYXQgMycsXHJcbiAgICAgICAgICAgIHVybDogJy4vYXNzZXRzL2ltYWdlcy9jYXQzLmpwZycsXHJcbiAgICAgICAgICAgIGlzVmlzaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvdGVDb3VudDogMFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgICAgIG5hbWU6ICdjYXQgNCcsXHJcbiAgICAgICAgICAgIHVybDogJy4vYXNzZXRzL2ltYWdlcy9jYXQ0LmpwZycsXHJcbiAgICAgICAgICAgIGlzVmlzaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvdGVDb3VudDogMFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgaWQ6IDUsXHJcbiAgICAgICAgICAgIG5hbWU6ICdjYXQgNScsXHJcbiAgICAgICAgICAgIHVybDogJy4vYXNzZXRzL2ltYWdlcy9jYXQ1LmpwZycsXHJcbiAgICAgICAgICAgIGlzVmlzaXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvdGVDb3VudDogMFxyXG4gICAgICAgIH1dO1xyXG5cclxuICAgICAgICAvLyBnZXQgYWxsIGNhdHNcclxuICAgICAgICAkaHR0cEJhY2tlbmQud2hlbkdFVCgnL2NhdHMnKS5yZXNwb25kKGFsbENhdHMpO1xyXG5cclxuICAgICAgICAvLyBhZGRzIGEgbmV3IGNhdCB0byB0aGUgY2F0cyBhcnJheVxyXG4gICAgICAgICRodHRwQmFja2VuZC53aGVuUE9TVCgnL2NhdCcpLnJlc3BvbmQoZnVuY3Rpb24gKG1ldGhvZCwgdXJsLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBjYXQgPSBhbmd1bGFyLmZyb21Kc29uKGRhdGEpO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZChjYXQsIHtcclxuICAgICAgICAgICAgICAgIGlkOiBhbGxDYXRzLmxlbmd0aCArIDEsXHJcbiAgICAgICAgICAgICAgICBpc1Zpc2l0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdm90ZUNvdW50OiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhbGxDYXRzLnB1c2goY2F0KTtcclxuICAgICAgICAgICAgcmV0dXJuIFsyMDAsIGNhdCwge31dO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxDYXRzOiBhbGxDYXRzXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9tb2Nrcy9tb2NrQ2F0QXBpLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNhdFNlcnZpY2UuJGluamVjdCA9IFsnJHEnLCAnJGh0dHAnLCAnbW9ja0NhdEFwaSddO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJylcclxuICAgICAgICAuZmFjdG9yeSgnY2F0U2VydmljZScsIGNhdFNlcnZpY2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhdFNlcnZpY2UoJHEsICRodHRwLCBtb2NrQ2F0QXBpKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldEFsbENhdHM6IGdldEFsbENhdHMsXHJcbiAgICAgICAgICAgIGdldENhdERldGFpbHM6IGdldENhdERldGFpbHMsXHJcbiAgICAgICAgICAgIGFkZENhdERldGFpbHM6IGFkZENhdERldGFpbHMsXHJcbiAgICAgICAgICAgIHVwZGF0ZUNhdERldGFpbHM6IHVwZGF0ZUNhdERldGFpbHMsXHJcbiAgICAgICAgICAgIGRlbGV0ZUNhdDogZGVsZXRlQ2F0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWxsQ2F0cygpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9jYXRzJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldENhdERldGFpbHMoY2F0SWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRxLnJlc29sdmUobW9ja0NhdEFwaS5hbGxDYXRzLmZpbmQoZnVuY3Rpb24gKGNhdCkgeyByZXR1cm4gY2F0LmlkID09PSBOdW1iZXIoY2F0SWQpfSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBhZGRDYXREZXRhaWxzKGNhdERldGFpbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9jYXQnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBjYXREZXRhaWxzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ2F0RGV0YWlscyhjYXRUb1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBtb2NrQ2F0QXBpLmFsbENhdHMuZmluZEluZGV4KGZ1bmN0aW9uIChjYXQpIHsgcmV0dXJuIGNhdC5pZCA9PT0gY2F0VG9VcGRhdGUuaWR9KTtcclxuICAgICAgICAgICAgYWxsQ2F0c1tpbmRleF0gPSBjYXRUb1VwZGF0ZTtcclxuICAgICAgICAgICAgcmV0dXJuICRxLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRlbGV0ZUNhdChjYXRJZCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBtb2NrQ2F0QXBpLmFsbENhdHMuZmluZEluZGV4KGZ1bmN0aW9uIChjYXQpIHsgcmV0dXJuIGNhdC5pZCA9PT0gY2F0SWR9KTtcclxuICAgICAgICAgICAgYWxsQ2F0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICByZXR1cm4gJHEucmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvY2F0c1NlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdXRpbGl0eVNlcnZpY2UuJGluamVjdCA9IFsnJHEnXTtcclxuXHJcbiAgICBmdW5jdGlvbiB1dGlsaXR5U2VydmljZSgkcSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlzSW1hZ2U6IGlzSW1hZ2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzSW1hZ2Uoc3JjKSB7XHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBzcmM7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpXHJcbiAgICAgICAgLnNlcnZpY2UoJ3V0aWxpdHlTZXJ2aWNlJywgdXRpbGl0eVNlcnZpY2UpO1xyXG5cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy91dGlsaXR5U2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==