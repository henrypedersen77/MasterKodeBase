var app = app || {};

app.Products = Backbone.Collection.extend({
    url: '/api/Product',
    reset: true
});

var allProducts;

//app.Router = Backbone.Router.extend({
//    routes: {
//        "Pages/Product.html/:id": "viewProduct"
//    },
//    viewProduct: function(id){
//        this.navigate("Pages/Product.html/ + id", { trigger: true });
//    }
//});

app.AppView = Backbone.View.extend({
    el: '#ContentPlaceHolder1_pnlProducts',
    //events: {'click': 'handleClick'},
    indexTemplate: _.template($('#index-template').html()),
    render: function () {
        var self = this;
        allProducts = new app.Products();
        allProducts.fetch();
        allProducts.on('all', function (data) {
            self.$el.html(self.indexTemplate(allProducts.toJSON()));
        });
        return this;
    },
    initialize: function () {
        this.render();
    },
    //handleClick: function (e) {
    //    e.preventDefault(); 
    //    var id = $(e.target).data("id");
    //    //"redirect" til /pages/product.html?id=x
    //    var redirect = new app.Router();
    //    redirect.viewProduct(id);
    //}
});

$(function () {
    new app.AppView();
});