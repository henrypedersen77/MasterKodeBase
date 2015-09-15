(function () {
    angular.module('Login', [])
    .controller('LoginCtrl', ['$http', '$window', function ($http, $window) {
        var self = this;
        self.login = function () {
            $http.post('/api/login', { login: self.user, password: self.password }).then(function (result) {
                $window.location.href = '/Pages/Index.html';
            }, function (errResponse) {
                self.errorMsg = errResponse.data;
            });
        }
    }]);
})(); 