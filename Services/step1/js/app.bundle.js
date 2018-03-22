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
            templateUrl: './directives/imagePreview/imagePreview.tpl.html',
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
            templateUrl: './directives/voteSpinner/voteSpinner.tpl.html',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvYXBwLmpzIiwid2VicGFjazovLy8uL2FwcC9jb250cm9sbGVycy9jYXREZXRhaWxzQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29udHJvbGxlcnMvY2F0c0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RpcmVjdGl2ZXMvYWxsb3dFbnRlci5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RpcmVjdGl2ZXMvY2NGb2N1cy5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RpcmVjdGl2ZXMvaW1hZ2VQcmV2aWV3L2ltYWdlUHJldmlldy5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL2ltYWdlUHJldmlldy9pbWFnZVByZXZpZXcuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL3ZhbGlkYXRlQ2F0VXJsLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZGlyZWN0aXZlcy92YWxpZGF0ZVVwdm90ZS5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2RpcmVjdGl2ZXMvdm90ZVNwaW5uZXIvdm90ZVNwaW5uZXIuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZGlyZWN0aXZlcy92b3RlU3Bpbm5lci92b3RlU3Bpbm5lci5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL21vY2tzL21vY2tDYXRBcGkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzL2NhdHNTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy91dGlsaXR5U2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFD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LHlCQUF5QjtBQUM5RjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDLEk7Ozs7Ozs7QUNuREQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDLEkiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJywgWyd1aS5yb3V0ZXInLCAnbmdNb2NrRTJFJywgJ25nQ29va2llcyddKTtcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJylcclxuICAgIC5jb25maWcoYXBwQ29uZmlnKVxyXG4gICAgLnJ1bihhcHBSdW4pO1xyXG5cclxuYXBwQ29uZmlnLiRpbmplY3QgPSBbJyR1cmxSb3V0ZXJQcm92aWRlcicsICckc3RhdGVQcm92aWRlciddO1xyXG5cclxuZnVuY3Rpb24gYXBwQ29uZmlnKCR1cmxSb3V0ZXJQcm92aWRlciwgJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XHJcblxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoXCJob21lXCIsIHtcclxuICAgICAgICAgICAgdXJsOiBcIi9cIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi9hcHAvdGVtcGxhdGVzL2NhdHNMaXN0LnRwbC5odG1sXCJcclxuICAgICAgICB9KS5zdGF0ZShcImNhdERldGFpbHNcIiwge1xyXG4gICAgICAgICAgICB1cmw6IFwiL2NhdERldGFpbHMvOmlkXCIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi4vYXBwL3RlbXBsYXRlcy9jYXREZXRhaWxzLnRwbC5odG1sXCJcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuYXBwUnVuLiRpbmplY3QgPSBbJyRodHRwQmFja2VuZCddO1xyXG5mdW5jdGlvbiBhcHBSdW4oJGh0dHBCYWNrZW5kKSB7XHJcbiAgICAkaHR0cEJhY2tlbmQud2hlbkdFVChuZXcgUmVnRXhwKCcuaHRtbCcpKS5wYXNzVGhyb3VnaCgpOyAgXHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgY2F0RGV0YWlsc0NvbnRyb2xsZXIuJGluamVjdCA9IFsndXRpbGl0eVNlcnZpY2UnLCAnY2F0U2VydmljZScsICckc3RhdGUnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYXREZXRhaWxzQ29udHJvbGxlcih1dGlsaXR5U2VydmljZSwgY2F0U2VydmljZSwgJHN0YXRlKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcyxcclxuICAgICAgICAgICAgaXNFZGl0ID0gJHN0YXRlLnBhcmFtcy5pZCAhPT0gJ25ldyc7XHJcblxyXG4gICAgICAgIHZtLnNhdmVDYXREZXRhaWxzID0gc2F2ZUNhdERldGFpbHM7XHJcblxyXG4gICAgICAgIGlmIChpc0VkaXQpIHtcclxuICAgICAgICAgICAgY2F0U2VydmljZS5nZXRDYXREZXRhaWxzKCRzdGF0ZS5wYXJhbXMuaWQpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY2F0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uY2F0ID0gY2F0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzYXZlQ2F0RGV0YWlscyhjYXQpIHtcclxuICAgICAgICAgICAgaWYgKGlzRWRpdCkge1xyXG4gICAgICAgICAgICAgICAgY2F0U2VydmljZS51cGRhdGVDYXREZXRhaWxzKGNhdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjYXRTZXJ2aWNlLmFkZENhdERldGFpbHMoY2F0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2hvbWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJylcclxuICAgICAgICAuY29udHJvbGxlcignY2F0RGV0YWlsc0NvbnRyb2xsZXInLCBjYXREZXRhaWxzQ29udHJvbGxlcik7XHJcblxyXG59KSgpO1xyXG5cclxuLy8gaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9pbWFnZXMvdzNzY2hvb2xzX2dyZWVuLmpwZ1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbnRyb2xsZXJzL2NhdERldGFpbHNDb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNhdHNDb250cm9sbGVyLiRpbmplY3QgPSBbXHJcbiAgICAgICAgJyRmaWx0ZXInLFxyXG4gICAgICAgICdjYXRTZXJ2aWNlJ1xyXG4gICAgXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYXRzQ29udHJvbGxlcihcclxuICAgICAgICAkZmlsdGVyLFxyXG4gICAgICAgIGNhdFNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXMsXHJcbiAgICAgICAgICAgIGFsbENhdHM7XHJcbiAgICAgICAgdm0uc2VsZWN0ZWRDYXQgPSBudWxsO1xyXG4gICAgICAgIHZtLnNlbGVjdGVkT3JkZXIgPSAnbmFtZSc7XHJcblxyXG4gICAgICAgIGdldEFsbENhdHMoKTtcclxuXHJcbiAgICAgICAgdm0uc2VsZWN0Q2F0ID0gZnVuY3Rpb24gKGNhdCkge1xyXG4gICAgICAgICAgICBjYXQuaXNWaXNpdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdm0uc2VsZWN0ZWRDYXQgPSBjYXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICB2bS5zZWFyY2hDYXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSB2bS5zZWFyY2hJbnB1dDtcclxuICAgICAgICAgICAgdm0uY2F0cyA9ICRmaWx0ZXIoJ2ZpbHRlcicpKGFsbENhdHMsIHsgbmFtZTogbW9kZWwgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uZGVsZXRlQ2F0ID0gZnVuY3Rpb24gKCRldmVudCwgY2F0SWQpIHtcclxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjYXRTZXJ2aWNlLmRlbGV0ZUNhdChjYXRJZClcclxuICAgICAgICAgICAgICAgIC50aGVuKGdldEFsbENhdHMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRBbGxDYXRzKCkge1xyXG4gICAgICAgICAgICBjYXRTZXJ2aWNlLmdldEFsbENhdHMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGNhdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5jYXRzID0gY2F0cztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2NhdHNDb250cm9sbGVyJywgY2F0c0NvbnRyb2xsZXIpO1xyXG5cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb250cm9sbGVycy9jYXRzQ29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBhbGxvd0VudGVyLiRpbmplY3QgPSBbJyRkb2N1bWVudCddO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2NhdENsaWNrZXInKS5kaXJlY3RpdmUoJ2FsbG93RW50ZXInLCBhbGxvd0VudGVyKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhbGxvd0VudGVyKCRkb2N1bWVudCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgICAgICRkb2N1bWVudC5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbMF0uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL2FsbG93RW50ZXIuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdjYXRDbGlja2VyJykuZGlyZWN0aXZlKCdjY0ZvY3VzJywgY2NGb2N1cyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2NGb2N1cygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW0pIHtcclxuICAgICAgICAgICAgICAgIGVsZW1bMF0uZm9jdXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL2NjRm9jdXMuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGltYWdlUHJldmlld0NvbnRyb2xsZXIoKSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2ltYWdlUHJldmlld0NvbnRyb2xsZXInLCBpbWFnZVByZXZpZXdDb250cm9sbGVyKTtcclxuXHJcbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcy9pbWFnZVByZXZpZXcvaW1hZ2VQcmV2aWV3LmNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpLmRpcmVjdGl2ZSgnaW1hZ2VQcmV2aWV3JywgaW1hZ2VQcmV2aWV3KTtcclxuICAgIFxyXG4gICAgZnVuY3Rpb24gaW1hZ2VQcmV2aWV3KCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vZGlyZWN0aXZlcy9pbWFnZVByZXZpZXcvaW1hZ2VQcmV2aWV3LnRwbC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2ltYWdlUHJldmlld0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdpcCcsXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RpcmVjdGl2ZXMvaW1hZ2VQcmV2aWV3L2ltYWdlUHJldmlldy5kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFsaWRhdGVDYXRVcmwuJGluamVjdCA9IFsndXRpbGl0eVNlcnZpY2UnLCAnJHEnXTtcclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUNhdFVybCh1dGlsaXR5U2VydmljZSwgJHEpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0ciwgbUN0cmwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtQ3RybC4kYXN5bmNWYWxpZGF0b3JzLmludmFsaWRVcmwgPSBmdW5jdGlvbiAobW9kZWxWYWx1ZSwgdmlld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVybCA9IG1vZGVsVmFsdWUgfHwgdmlld1ZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1dGlsaXR5U2VydmljZS5pc0ltYWdlKHVybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoJ0ludmFsaWQgVVJMJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2NhdENsaWNrZXInKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3ZhbGlkYXRlQ2F0VXJsJywgdmFsaWRhdGVDYXRVcmwpO1xyXG5cclxufSkoKVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RpcmVjdGl2ZXMvdmFsaWRhdGVDYXRVcmwuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhbGlkYXRlVXB2b3RlLiRpbmplY3QgPSBbJyRjb29raWVzJywgJ21vY2tDYXRBcGknXTtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpLmRpcmVjdGl2ZSgndmFsaWRhdGVVcHZvdGUnLCB2YWxpZGF0ZVVwdm90ZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVVcHZvdGUoJGNvb2tpZXMsIG1vY2tDYXRBcGkpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0ciwgbW9kZWxDdHJsKSB7XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBteVZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhdElkID0gc2NvcGUuJGV2YWwoYXR0ci52YWxpZGF0ZVVwdm90ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZWYWx1ZSA9ICRjb29raWVzLmdldChjYXRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhdE9iamVjdCA9IG1vY2tDYXRBcGkuYWxsQ2F0cy5maW5kKGZ1bmN0aW9uIChjYXRPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhdE9iai5pZCA9PSBjYXRJZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRPYmplY3Qudm90ZXMgPSBwYXJzZUludChwcmV2VmFsdWUsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxDdHJsLiRzZXRWaWV3VmFsdWUocHJldlZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRPYmplY3Qudm90ZXMgPSBwYXJzZUludChtb2RlbEN0cmwuJHZpZXdWYWx1ZSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkY29va2llcy5wdXQoY2F0SWQsIHBhcnNlSW50KG1vZGVsQ3RybC4kdmlld1ZhbHVlLCAxMCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtb2RlbEN0cmwuJHJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbW9kZWxDdHJsLiRwYXJzZXJzLnB1c2gobXlWYWxpZGF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcy92YWxpZGF0ZVVwdm90ZS5kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gdm90ZVNwaW5uZXJDb250cm9sbGVyKCkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2NhdENsaWNrZXInKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCd2b3RlU3Bpbm5lckNvbnRyb2xsZXInLCB2b3RlU3Bpbm5lckNvbnRyb2xsZXIpO1xyXG5cclxufSkoKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL3ZvdGVTcGlubmVyL3ZvdGVTcGlubmVyLmNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpLmRpcmVjdGl2ZSgndm90ZVNwaW5uZXInLCB2b3RlU3Bpbm5lcik7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIHZvdGVTcGlubmVyKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBjYXQ6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy4vZGlyZWN0aXZlcy92b3RlU3Bpbm5lci92b3RlU3Bpbm5lci50cGwuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICd2b3RlU3Bpbm5lckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2cycsXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59KSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RpcmVjdGl2ZXMvdm90ZVNwaW5uZXIvdm90ZVNwaW5uZXIuZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIG1vY2tDYXRBcGkuJGluamVjdCA9IFsnJHEnLCAnJGh0dHBCYWNrZW5kJ107XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2NhdENsaWNrZXInKVxyXG4gICAgICAgIC5mYWN0b3J5KCdtb2NrQ2F0QXBpJywgbW9ja0NhdEFwaSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbW9ja0NhdEFwaSgkcSwgJGh0dHBCYWNrZW5kKSB7XHJcbiAgICAgICAgYWxsQ2F0cyA9IFt7XHJcbiAgICAgICAgICAgIGlkOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAnY2F0IDEnLFxyXG4gICAgICAgICAgICB1cmw6ICcuL2Fzc2V0cy9pbWFnZXMvY2F0MS5qcGcnLFxyXG4gICAgICAgICAgICBpc1Zpc2l0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b3RlQ291bnQ6IDBcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGlkOiAyLFxyXG4gICAgICAgICAgICBuYW1lOiAnY2F0IDInLFxyXG4gICAgICAgICAgICB1cmw6ICcuL2Fzc2V0cy9pbWFnZXMvY2F0Mi5qcGcnLFxyXG4gICAgICAgICAgICBpc1Zpc2l0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b3RlQ291bnQ6IDBcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICBuYW1lOiAnY2F0IDMnLFxyXG4gICAgICAgICAgICB1cmw6ICcuL2Fzc2V0cy9pbWFnZXMvY2F0My5qcGcnLFxyXG4gICAgICAgICAgICBpc1Zpc2l0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b3RlQ291bnQ6IDBcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGlkOiA0LFxyXG4gICAgICAgICAgICBuYW1lOiAnY2F0IDQnLFxyXG4gICAgICAgICAgICB1cmw6ICcuL2Fzc2V0cy9pbWFnZXMvY2F0NC5qcGcnLFxyXG4gICAgICAgICAgICBpc1Zpc2l0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b3RlQ291bnQ6IDBcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGlkOiA1LFxyXG4gICAgICAgICAgICBuYW1lOiAnY2F0IDUnLFxyXG4gICAgICAgICAgICB1cmw6ICcuL2Fzc2V0cy9pbWFnZXMvY2F0NS5qcGcnLFxyXG4gICAgICAgICAgICBpc1Zpc2l0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b3RlQ291bnQ6IDBcclxuICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgLy8gZ2V0IGFsbCBjYXRzXHJcbiAgICAgICAgJGh0dHBCYWNrZW5kLndoZW5HRVQoJy9jYXRzJykucmVzcG9uZChhbGxDYXRzKTtcclxuXHJcbiAgICAgICAgLy8gYWRkcyBhIG5ldyBjYXQgdG8gdGhlIGNhdHMgYXJyYXlcclxuICAgICAgICAkaHR0cEJhY2tlbmQud2hlblBPU1QoJy9jYXQnKS5yZXNwb25kKGZ1bmN0aW9uIChtZXRob2QsIHVybCwgZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgY2F0ID0gYW5ndWxhci5mcm9tSnNvbihkYXRhKTtcclxuICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoY2F0LCB7XHJcbiAgICAgICAgICAgICAgICBpZDogYWxsQ2F0cy5sZW5ndGggKyAxLFxyXG4gICAgICAgICAgICAgICAgaXNWaXNpdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZvdGVDb3VudDogMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYWxsQ2F0cy5wdXNoKGNhdCk7XHJcbiAgICAgICAgICAgIHJldHVybiBbMjAwLCBjYXQsIHt9XTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsQ2F0czogYWxsQ2F0c1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvbW9ja3MvbW9ja0NhdEFwaS5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBjYXRTZXJ2aWNlLiRpbmplY3QgPSBbJyRxJywgJyRodHRwJywgJ21vY2tDYXRBcGknXTtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnY2F0Q2xpY2tlcicpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2NhdFNlcnZpY2UnLCBjYXRTZXJ2aWNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYXRTZXJ2aWNlKCRxLCAkaHR0cCwgbW9ja0NhdEFwaSkge1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXRBbGxDYXRzOiBnZXRBbGxDYXRzLFxyXG4gICAgICAgICAgICBnZXRDYXREZXRhaWxzOiBnZXRDYXREZXRhaWxzLFxyXG4gICAgICAgICAgICBhZGRDYXREZXRhaWxzOiBhZGRDYXREZXRhaWxzLFxyXG4gICAgICAgICAgICB1cGRhdGVDYXREZXRhaWxzOiB1cGRhdGVDYXREZXRhaWxzLFxyXG4gICAgICAgICAgICBkZWxldGVDYXQ6IGRlbGV0ZUNhdFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFsbENhdHMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2F0cycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRDYXREZXRhaWxzKGNhdElkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkcS5yZXNvbHZlKG1vY2tDYXRBcGkuYWxsQ2F0cy5maW5kKGZ1bmN0aW9uIChjYXQpIHsgcmV0dXJuIGNhdC5pZCA9PT0gTnVtYmVyKGNhdElkKX0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWRkQ2F0RGV0YWlscyhjYXREZXRhaWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvY2F0JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogY2F0RGV0YWlsc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUNhdERldGFpbHMoY2F0VG9VcGRhdGUpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gbW9ja0NhdEFwaS5hbGxDYXRzLmZpbmRJbmRleChmdW5jdGlvbiAoY2F0KSB7IHJldHVybiBjYXQuaWQgPT09IGNhdFRvVXBkYXRlLmlkfSk7XHJcbiAgICAgICAgICAgIGFsbENhdHNbaW5kZXhdID0gY2F0VG9VcGRhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiAkcS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkZWxldGVDYXQoY2F0SWQpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gbW9ja0NhdEFwaS5hbGxDYXRzLmZpbmRJbmRleChmdW5jdGlvbiAoY2F0KSB7IHJldHVybiBjYXQuaWQgPT09IGNhdElkfSk7XHJcbiAgICAgICAgICAgIGFsbENhdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuICRxLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL2NhdHNTZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHV0aWxpdHlTZXJ2aWNlLiRpbmplY3QgPSBbJyRxJ107XHJcblxyXG4gICAgZnVuY3Rpb24gdXRpbGl0eVNlcnZpY2UoJHEpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc0ltYWdlOiBpc0ltYWdlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc0ltYWdlKHNyYykge1xyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2NhdENsaWNrZXInKVxyXG4gICAgICAgIC5zZXJ2aWNlKCd1dGlsaXR5U2VydmljZScsIHV0aWxpdHlTZXJ2aWNlKTtcclxuXHJcbn0pKCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvdXRpbGl0eVNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=