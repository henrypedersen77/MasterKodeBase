(function () {
    var Shoppingcart_Module = angular.module('Shoppingcart_Module', [])

    Shoppingcart_Module.controller('Shoppingcart_Controller', ['$http', '$window', function ($http, $window) {
                var self = this;
                self.statusmessage = "";
                self.user = '';
                self.items = [];
                self.products = [];
                self.linetotal = 0;
                self.vat = 0;
                self.cartamount= 0;

                    $http.get('/api/login').then(function (response) {
                        self.user = response.data;
                        $http.get('/api/cart/' + self.user.user.Guid + '/orders').then(function (response) {
                            self.items = response.data;
                            CalcAmounts();
                        }, function (errResponse) {
                            console.error('Error while fetching products');
                        });
                    }, function (errResponse) {
                        console.error('Error while fetching shoppingcart(s)');
    });

    self.getImageUrl = function (image) {
        return '../Content/Images/Products/' + image;
        };

    CalcAmounts = function () {
        self.linetotal = 0;
        for (i = 0; i < self.items.length ; i++) {
            self.linetotal += self.items[i].Amount * self.items[i].Product.Price
        }
        self.vat = self.linetotal * 0.21;
        self.cartamount = self.linetotal + self.vat + 15;
    };
    
    self.updateItem = function (cartline) {
        $http.post('/api/cart/' + cartline.ID + '/amount', cartline.Amount).
        success(function () { CalcAmounts() }).
        error(function () { self.statusmessage = "Error in updating product in cart"; });
    };

    self.deleteItem = function (cartline) {
        $http.delete('/api/cart/' + cartline.ID).
        success(function () {
            $window.location.href = "Shoppingcart.html";
        }).
        error(function () { self.statusmessage = "Error in updating product in cart"; });
    };

    self.checkout = function () {
        $window.location.href = "Success.html";
    };

    }]);

})();



