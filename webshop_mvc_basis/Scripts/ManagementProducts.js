(function () {
    var ManagementProducts_Module = angular.module('ManagementProducts_Module', [])

    ManagementProducts_Module.controller('ManagementProducts_Controller', ['$http', '$window', '$location', function ($http, $window, $location) {
                var self = this;
                self.statusmessage = "";
                self.producttype_name = '';

                if ($location.search().id >= 0) {
                    $http.get('/api/product/' + $location.search().id).then(function (response) {
                        self.product = response.data;
                    }, function (errResponse) {
                        console.error('Error while fetching products');
                    });
                }

                $http.get('/api/producttype').then(function (response) {
                    self.producttypes = response.data;            
                    }, function (errResponse) {
                        console.error('Error while fetching producttypes');
                });

                $http.get('/api/image').then(function (response) {
                    self.images = response.data;
                }, function (errResponse) {
                    console.error('Error while fetching producttypes');
                });

                self.Submit = function () {
                    var requestdata = {
                        ID: $location.search().id,
                        Name: self.product.Name,
                        Price: self.product.Price,
                        Description: self.product.Description,
                        Image: self.product.Image,
                        TypeID: self.product.TypeID,
                    };

                    $http.post('/api/product', requestdata).
                        success(function (data) { self.result = "Product created/updated"; }).
                        error(function (data) { self.result = "Error while creating/updating product"; });
                };

    }]);
})();



