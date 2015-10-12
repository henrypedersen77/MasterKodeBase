var app = app || {};

app.Router = Backbone.Router.extend({
    routes: {
        ":id": "viewProduct"
    },
    viewProduct: function(id){
        var pid = id.substring(3,id.length); //fjerne id=
        var view = new app.AppView();
        view.render(pid);
    }
});

app.Product = Backbone.Model.extend({
    urlRoot: '/api/Product',
    reset: true
});

app.Login = Backbone.Model.extend({
    urlRoot: '/api/Login',
    reset: true
});

app.Cart = Backbone.Model.extend({
    urlRoot: '/api/Cart',
    reset: true
});

app.AppView = Backbone.View.extend({
    el: '#container',
    //events: {'click': 'handleClick'},
    productTemplate: _.template($('#product-template').html()),
    render: function (pid) {
        var self = this;
        var product = new app.Product();
        product.fetch({ data: $.param({ id: pid }) });
        product.on('all', function (data) {
            var string = product.toJSON();
            self.$el.html(self.productTemplate(product.toJSON()));
            new app.BtnView();
        });
        return this;
    }
});

app.BtnView = Backbone.View.extend({
    el: '#btnAdd',
    events: { 'click': 'handleClick' },
    handleClick: function (e) {
        var loginModel = new app.Login();
        loginModel.fetch().done(function (response) {
            var ClientID = response.user.Guid;
            var dato = new Date();
            var indkoeb = new app.Cart({
                ClientID: ClientID,
                ProductID: $('#lblItemNr').text(),
                Amount: $('#ddlAmount').val(),
                DatePurchased: dato,
                IsInCart: "true"});
            indkoeb.save().done(function (response) {
                $('#lblResult').html("Order was succesfully inserted");
            }).fail(function (response) {
                $('#lblResult').html("Error " + response.data);
            });
        }).fail(function (response) {
            $('#lblResult').html("You have to login to order products!");
        });
    }
});

$(function () {
    new app.Router();
    Backbone.history.start();
});