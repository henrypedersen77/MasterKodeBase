var app = app || {};

app.Router = Backbone.Router.extend({
    routes: {
        ":id": "viewProduct"
    },
    viewProduct: function(id){
        var test = id;
    }
});

$(function () {
    new app.Router();
    Backbone.history.start();
});