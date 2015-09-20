(function () {
    angular.module('ManageProductTypes', [])
    .controller('ManageProductTypesCtrl', ['$http', '$location', function ($http, $location) {
        var self = this;
        var id = $location.search().Id;
        if (id != 'undefined') {
            $http.get('/api/producttype/' + id).then(function (result) {
                self.producttype = result.data;
            });
        }
        self.saveproducttype = function () {
            $http.post('/api/producttype', { ID: self.producttype.ID, Name: self.producttype.Name }).then(
            function (result) {
                self.message = 'the producttype have been saved!';
            }, function (result) {
                self.message = 'error: ' + result.data;
            });
        };
    }]);
})();