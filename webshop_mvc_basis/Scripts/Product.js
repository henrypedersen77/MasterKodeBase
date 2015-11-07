var app = app || {};

app.Products= Backbone.Model.extend({
    urlRoot: '/api/product',
    reset: true
});

app.User = Backbone.Model.extend({
    urlRoot: '/api/login',
    reset: true
});

app.Cart = Backbone.Model.extend({
    urlRoot: '/api/cart',
    reset: true
});

app.ProductsView = Backbone.View.extend({
    el: '#container',
    template: _.template($('#product-tmpl').html()),

    events: {
        "click .button": "AddCartButtonHandler",
    },
    AddCartButtonHandler: function (event) {
        var self = this;
        var user = new app.User();
        user.fetch({
            success: function () {
                var cart = new app.Cart();
                var user_ = user.get('user');
                var today = new Date();
                cart.save({
                    "ClientID": user_.Guid,
                    "ProductID": btnAdd.name,
                    "Amount": ddlAmount.value,
                    "DatePurchased": today,
                    "IsInCart": "true"
                },
                    {
                        wait: true,
                        success: function (model, response) {
                            $('#lblResult').html('Order was succesfully inserted');
                            
                        },
                        error: function (model, error) {
                            $('#lblResult').html(error.statusText);
                        }
                    });
            },
            error: function (response) {
                $('#lblResult').html('Please log in to order items');
            }

        });




    },
    render: function () {
        var self = this;
        var html = this.template(this.model.toJSON());
        self.$el.html(html);
        return self;    
    },
});

var ProductRoute = Backbone.Router.extend({
 routes: { 
        ":id": "ProductId" 
        }, 
    ProductId: function(id){ 
            var productid = id.substring(3,id.length);
            var product = new app.Products({ id: productid });
            var productview = new app.ProductsView({ model: product});
            product.fetch({
                success: function () {
                    productview.render();
                }
            });
        } 
}); 


$(function () {
    var producttroute = new ProductRoute;
    Backbone.history.start();
    //var productsview = new app.ProductsView({ model: product });
    //products.get({
    //    success: function () {
    //        productsview.render();
    //    }
    //});
});

