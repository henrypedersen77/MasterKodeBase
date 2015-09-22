(function () {
    var Register_Module = angular.module('Register_Module', [])

    Register_Module.controller('Register_Controller', ['$http', '$window', function ($http, $window) {
            var self = this;
            self.result = "";

            self.add_user = function (user) {
                var requestdata = {
                    login:  user.UserName,
                    password: user.Password,
                    user: {
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        Address: user.Address,
                        PostalCode: user.PostalCode
                    }
                };

//            var request = $http({
//                method: "post",
//                url: "/api/register",
//                data: requestdata
//            });

                $http.post('/api/register', requestdata).
                success(function (data) { $window.location.href = "../Index.html"; }).
                error(function (data) { self.result = "Error in creating user";});
        };
    }]);

})();

