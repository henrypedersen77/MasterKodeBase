(function () {
    angular.module('Index', [])
    .controller('IndexCtrl', ['$http', '$window', function ($http, $window) {
        var self = this;
        self.products = [];
        $http.get('/api/product').then(function (result) {
            self.products = result.data;
        });

        self.getImageLink = function (p) {
            return '../Content/Images/Products/' + p;           
        }

        self.rederect = function (p) {
            
                $window.location.href = '../Pages/Product.html#?Id=' + p;
            
        }
    }]);
})();