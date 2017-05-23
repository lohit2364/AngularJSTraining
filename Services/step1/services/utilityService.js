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