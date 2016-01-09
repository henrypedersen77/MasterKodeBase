(function () {
    angular.module('Shoppingcart', [])
    .controller('ShoppingcartCtrl', ['$http', '$window', function ($http, $window) {
        var self = this;
        self.carts = [];
        self.total = 0;
        self.vat = 0;
        self.shipping = 15;
        self.totalamount = 0;
        $http.get('/api/login').then(function (result) {
            self.ClientID = result.data.user.Guid;
            $http.get('/api/cart/' + self.ClientID + '/orders').then(function (result) {
                self.carts = result.data;
                self.updatetotals();
            });
        });
        self.updatetotals = function () {
            for (index = 0; index < self.carts.length; ++index) {
                self.total = self.total + (self.carts[index].Product.Price * self.carts[index].Amount);
            }
            self.vat = self.total * 0.21;
            self.totalamount = self.total + self.vat + self.shipping;
        };
        self.changeamount = function (cart) {
            $http.post('/api/cart/' + cart.ID + '/amount', cart.Amount).then(function () {
                $http.get('/api/cart/' + self.ClientID + '/orders').then(function (result) {
                    self.carts = result.data;
                    self.updatetotals();
                });
            });
        };
        self.deleteorder = function (cart) {
            $http.delete('/api/cart/' + cart.ID).then(function () {
                $http.get('/api/cart/' + self.ClientID + '/orders').then(function (result) {
                    self.carts = result.data;
                    self.updatetotals();
                });
            });
        };
        self.checkout = function () {
            $http.post('/api/cart/paid', self.carts).then(function(){
                $window.location.href = '../Pages/Success.html';
            });
        };
        self.getImageLink = function (p) {
            return '../Content/Images/Products/' + p;
        };
    }]);
})();