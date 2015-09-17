(function () {
    angular.module('Product', [])
    .controller('ProductCtrl', ['$http', '$location', function ($http, $location) {
        var self = this;
        
        var id = $location.search().Id;

        $http.get('/api/product/' + id).then(function (result) {
            self.product = result.data;
        });

        self.getImageLink = function (p) {
            return '../Content/Images/Products/' + p;
        };

        self.buy = function () {
            var dato = new Date();

            $http.get('/api/login').then(function (result) {
                self.ClientID = result.data.user.Guid;

                $http.post('/api/cart', { ClientID: self.ClientID, ProductID: self.product.ID, Amount: self.product.amount, DatePurchased: dato, IsInCart: true }).then(function (result) {
                    self.message = 'Order was succesfully inserted';
                }, function (errResponse) {
                    self.message = 'Please log in to order items';
                });
            }, function (errResponse) {
                self.message = 'Please log in to order items';
            });
        };
    }]);
})();