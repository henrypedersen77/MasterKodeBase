(function () {
    angular.module('Register', [])
    .controller('RegisterCtrl', ['$http', '$window', function ($http, $window) {
        var self = this;
        self.message = '';
        self.username;
        self.password;
        self.confirmpassword;
        self.firstname;
        self.lastname;
        self.address;
        self.postalcode;
        self.register = function () {
            if (typeof self.password != 'undefined' && self.password === self.confirmpassword) {
                $http.post('/api/register', {
                    login: self.username,
                    password: self.password,
                    user: {
                        FirstName: self.firstname,
                        LastName: self.lastname,
                        Address: self.address,
                        PostalCode: self.postalcode
                    }
                }).then(function (result) {
                    $window.location.href = '/Pages/Index.html';
                }, function (errResponse) {
                    self.message = errResponse.data;
                });
            } else {
                self.message = 'The passwords do not match!';
            }
        };
    }]);
})();