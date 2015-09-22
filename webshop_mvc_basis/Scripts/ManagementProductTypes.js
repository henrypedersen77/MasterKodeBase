(function () {
    var ManagementProductTypes_Module = angular.module('ManagementProductTypes_Module', [])

    ManagementProductTypes_Module.controller('ManagementProductTypes_Controller', ['$http', '$location', function ($http, $location) {
                var self = this;
                self.statusmessage = "";

                var geturl = '/api/producttype/' + $location.search().id;
                if ($location.search().id >= 0) {
                    $http.get(geturl).then(function (response) {
                        self.producttype = response.data;
                    }, function (errResponse) {
                        console.error('Error while fetching products');
                    });
                }

                self.Submit = function () {
                    var requestdata = {
                        ID: $location.search().id,
                        Name: self.producttype.Name,
                    };
                    $http.post('/api/producttype', requestdata).
                        success(function (data) { self.result = "Producttype created/updated!"; }).
                        error(function (data) { self.result = "Error while creating/updating producttype"; });
                };

    }]);
})();



