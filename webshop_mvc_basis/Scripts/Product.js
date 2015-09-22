(function () {

    var Product_Module = angular.module('Product_Module', [])
    Product_Module.controller('Product_Controller', ['$http', '$location', '$window', '$scope', function ($http, $location, $window, $scope) {
        var self = this;
        var today = new Date();
        var id = $location.search().id;
        var geturl = '/api/product/' + id;
        self.result = "test";
        self.user = '';
        $http.get(geturl).then(function (response) {
            self.item = response.data;
        }, function (errResponse) {
            console.error('Error while fetching products');
        });
        $http.get('/api/login').then(function (response) {
            self.user = response.data;
        }, function (errResponse) {
            console.error('Error while fetching products');
        });

        self.getImageUrl = function (p) {
            return '../Content/Images/Products/' + p;
        };

        $scope.add_product = function (ID, Quantity) {
            if (self.user.login) 
            {
                var requestdata = {
                    ClientID:  self.user.user.Guid,
                    ProductID: ID,
                    Amount: Quantity,
                    DatePurchased: today,
                    IsInCart: true
                };
                $http.post('/api/cart', requestdata).
                success(function (data) { $window.location.href = "Index.html"; }).
                error(function (data) { self.result = "Error in add product to cart"; });
            }
            else
            {
                self.result = 'Please log in to order items';
            };
        };
    }]);

})();

