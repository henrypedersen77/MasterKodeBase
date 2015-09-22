(function () {
    var Index_Module = angular.module('Index_Module', [])

    Index_Module.controller('Index_Controller', ['$http', '$window', function ($http, $window) {
        var self = this;
        self.items = [];
        $http.get('/api/product').then(function (response) {
            self.items = response.data;
            }, function (errResponse) {
                console.error('Error while fetching products');
            });

        self.getImageUrl = function(p)
        {
            return '../Content/Images/Products/' + p;
        }

        self.url_redirect = function (p) {
                $window.location.href  = "Product.html#/?id=" + p;
        }

        }]);
    })();

