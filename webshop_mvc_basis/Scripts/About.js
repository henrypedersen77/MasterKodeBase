(function () {
    angular.module('About', [])
    .controller('AboutCtrl', [function () {
        this.qoute = "We know what we are, but not what we may be .";
        this.author = "Abraham Lincoln";
        console.log('MainCtrl has been created');
    }]);
})();