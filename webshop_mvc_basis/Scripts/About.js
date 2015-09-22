(function()
{
    var About_Module = angular.module('About_Module', [])
    About_Module .controller('About_Controller',[function() {
        this.Citat_Msg = '"We know what we are, but not what we may be ."';
        this.Author_Msg = ' Abraham Lincoln ';
    }]);
})();   
