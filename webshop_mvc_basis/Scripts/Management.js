(function () {
    var Management_Module = angular.module('Management_Module', [])

    Management_Module.controller('Management_Controller', ['$http', '$window', function ($http, $window) {
                var self = this;
                self.statusmessage = "";
                self.products = [];
                self.producttypes = [];

                $http.get('/api/product').then(function (response) {
                    self.products = response.data;
                }, function (errResponse) {
                    console.error('Error while fetching products');
                });

                $http.get('/api/producttype').then(function (response) {
                    self.producttypes = response.data;
                }, function (errResponse) {
                    console.error('Error while fetching producttypes');
                });

    
    self.DeleteProduct = function (id) {
        $http.delete('/api/product/' + id).
        success(function () {
            $http.get('/api/product').then(function (response) {
                self.products = response.data;
            }, function (errResponse) {
                console.error('Error while fetching products');
            });
        }).
        error(function () { self.statusmessage = "Error in deleting produt"; });
    };

    self.AddNewProduct = function()
    {
        $window.location.href = "/Pages/Management/ManageProducts.html";
    };

    self.EditProduct = function(id)
    {
        $window.location.href = "/Pages/Management/ManageProducts.html#/?id="+id;
    };

    self.DeleteProductType= function (id) {
        $http.delete('/api/producttype/' + id).
        success(function () {
            $http.get('/api/producttype').then(function (response) {
                self.producttypes = response.data;
            }, function (errResponse) {
                console.error('Error while fetching products');
            });
        }).
        error(function () { self.statusmessage = "Error in deleting produt"; });
    };

    self.AddNewProductType = function () {
        $window.location.href = "/Pages/Management/ManageProductTypes.html";
    };

    self.EditProducttype = function (id) {
        $window.location.href = "/Pages/Management/ManageProductTypes.html#/?id=" + id;
    };
    }]);
})();



