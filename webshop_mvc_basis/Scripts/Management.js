(function () {
    angular.module('Management', [])
    .controller('ManagementCtrl', ['$http', '$window', function ($http, $window) {
        var self = this;
        self.products = [];
        self.producttypes = [];
        self.getproducts = function () {
            $http.get('/api/product').then(function (result) {
                self.products = result.data;
            });
        };
        self.getproducts();
        self.getproducttypes = function () {
            $http.get('/api/producttype').then(function (result) {
                self.producttypes = result.data;
            });
        };
        self.getproducttypes();
        self.deleteproduct = function (productid) {
            $http.delete('/api/product/' + productid).then(function () {
                self.getproducts();
            });
        };
        self.deleteproducttype = function (producttypeid) {
            $http.delete('/api/producttype/' + producttypeid).then(function () {
                self.getproducts();
            });
        };
        self.editproduct = function (productid) {
            $window.location.href = '/Pages/Management/ManageProducts.html#?Id=' + productid;
        };
        self.editproducttype = function (producttypeid) {
            $window.location.href = '/Pages/Management/ManageProductTypes.html#?Id=' + producttypeid;
        };
        self.createproduct = function () {
            $window.location.href = '/Pages/Management/ManageProducts.html';
        };
        self.createproducttype = function () {
            $window.location.href = '/Pages/Management/ManageProductTypes.html';
        };
    }]);
})();