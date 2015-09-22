(function () {
    var Login_Module = angular.module('Login_Module', [])

    Login_Module.controller('Login_Controller', ['$http', '$window', function ($http, $window) {
            var self = this;
            self.statusmessage = "";

            self.login_user = function (user) {
                var requestdata = {
                    login:  user.UserName,
                    password: user.Password,
                };


//            var request = $http({
//                method: "post",
//                url: "/api/register",
//                data: requestdata
//            });

                $http.post('/api/login', requestdata).
                success(function (data) { $window.location.href = "../Index.html"; }).
                error(function (data) { self.statusmessage = "Error in logging in"; });
        };
    }]);

})();

