var app = app || {};
var cartlist;
var dropdownlist;
var cartview;
var totalamount = 0;
var vat = 0;
var total = 0;
var shipping = 15; 

app.Cart = Backbone.Model.extend({
    url: '/api/cart',
    reset: true
});

app.User = Backbone.Model.extend({
    urlRoot: '/api/login',
});

app.Dropdownitem = Backbone.Model.extend({
    item: null
});

app.Cartlist = Backbone.Collection.extend({
    url : function(){
        return '/api/cart/' + this.Guid + '/orders';
    },
    model: app.Cart,
});

app.Dropdownlist = Backbone.Collection.extend({
    initialize: function (model, options) {
    }
});

app.CartView = Backbone.View.extend({
    el: '#content',
    template: _.template($('#shoppingcart-tmpl').html()),

    events: {
        "click #btnDelete": "DeleteCartItemHandler",
        "change #Quantity": "QuantityChanged",
    },
    QuantityChanged: function (event) {
        $.ajax({
            url: "/api/cart/" + event.currentTarget.name + "/amount",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            data: JSON.stringify(event.currentTarget.value),
            success: function (msg) {
                cartlist.fetch({
                    success: function (model, response) {
                        cartview.render();
                    }
                });
            },
            error: function (model, error) {
            console.log("Something went wrong while updating the model");
        }

        });
    },
    AddCartButtonHandler: function (event) {
        var cart = new app.Cart({ id: $(event.currentTarget).data("id") });
        cart.destroy({
                success: function (model, respose, options) {
                    cartlist.fetch({
                        success: function (model, response) {
                            cartview.render();
                        }
                    });
                },
                error: function (model, error) {
                    console.log("Something went wrong while deleting the model");
                }
            });

    },

    render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);

        for (var i = 0; i < this.model.length; i++) { 
            this.totalamount = this.totalamount + (this.model.models[i].attributes.Amount * this.model.models[i].attributes.Product.price);
        } 
        this.vat = this.totalamount * 0.21;
        this.total = this.totalamount + vat + shipping;
        return this;
    },
});

$(function () {
    var user = new app.User();
    user.fetch({
        success: function () {
            var user_ = user.get('user');
            cartlist = new app.Cartlist();
            dropdownlist = new app.Dropdownlist();
            cartview = new app.CartView({ model: cartlist });
            cartlist.Guid = user_.Guid;

            dropdownlist.add(new app.Dropdownitem({ item: 0 }));
            dropdownlist.add(new app.Dropdownitem({ item: 1 }));
            dropdownlist.add(new app.Dropdownitem({ item: 2 }));
            dropdownlist.add(new app.Dropdownitem({ item: 3 }));
            dropdownlist.add(new app.Dropdownitem({ item: 4 }));
            dropdownlist.add(new app.Dropdownitem({ item: 5 }));
            dropdownlist.add(new app.Dropdownitem({ item: 6 }));
            dropdownlist.add(new app.Dropdownitem({ item: 7 }));
            dropdownlist.add(new app.Dropdownitem({ item: 8 }));
            dropdownlist.add(new app.Dropdownitem({ item: 9 }));

            cartlist.dropdownlist = this.dropdownlist;
            cartlist.fetch({
                success: function () {
                cartview.render();
                }
            });
        }
    });
});

function lineamount (quantity, price)
{
    return quantity * price;
}
