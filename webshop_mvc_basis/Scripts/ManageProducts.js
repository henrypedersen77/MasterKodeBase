(function () {
    angular.module('ManageProduct', [])
    .controller('ManageProductCtrl', ['$http', '$location', function ($http, $location) {
        var self = this;
        var id = $location.search().Id;
        if (id != 'undefined') {
            $http.get('/api/product/' + id).then(function (result) {
                self.product = result.data;
                getproducttype();
            });
        }
        self.saveproduct = function () {
            $http.post('/api/product', {
                ID: self.product.ID,
                Name: self.product.Name,
                TypeID: self.TypeID.ID,
                Price: self.product.Price,
                Description: self.product.Description,
                Image: self.product.Image
            }).then(
            function (result) {
                self.message = 'the product have been saved!';
            }, function (result) {
                self.message = 'error: ' + result.data;
            });
        };
        $http.get('/api/image').then(function (result) {
            self.productimages = result.data;
        });
        $http.get('/api/producttype').then(function (result) {
            self.producttypes = result.data;
        });
        getproducttype = function () {
            $http.get('/api/producttype').then(function (result) {
                self.producttypes = result.data;
                for (index = 0; index < self.producttypes.length; ++index) {
                    if (self.producttypes[index].ID === self.product.TypeID) {
                        self.TypeID = self.producttypes[index];
                    }
                }
            });
        };
    }]);
})();