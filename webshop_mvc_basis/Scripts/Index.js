var app = app || {};
app.Products = Backbone.Collection.extend({
    url: '/api/Product',
    reset: true
});
var allProducts;
app.AppView = Backbone.View.extend({
    el: '#ContentPlaceHolder1_pnlProducts',
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
});
$(function () {
    new app.AppView();
});