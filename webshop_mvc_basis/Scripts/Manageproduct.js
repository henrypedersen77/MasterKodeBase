var app = app || {};
var producttypelist;
var imagelist;

app.Product= Backbone.Model.extend({
    urlRoot: '/api/product',
    reset: true,
});

app.ProductType = Backbone.Model.extend({
    url: '/api/producttype',
});

app.ProductTypelist = Backbone.Collection.extend({
    url: '/api/producttype',
    model: app.ProductType,
});

app.Image = Backbone.Model.extend({
    url: '/api/image',
});

app.Imagelist = Backbone.Collection.extend({
    url: '/api/image',
    model: app.Image,
});

app.ProductView = Backbone.View.extend({
    el: '#content',
    template: _.template($('#product-tmpl').html()),

    events: {
        "click #btnSubmit": "AddProductButtonHandler",
    },
    AddProductButtonHandler: function (event) {
        var product = new app.Product();

        product.save({
            ID: $(event.currentTarget).data("id"),
            TypeID: ddlType.value,
            Name: txtName.value,
            Price: txtPrice.value,
            Description: txtDescription.value,
            Image: "Cylinder Heads.jpg"
        },
        {
            wait: true,
            success: function (model, response) {
                $('#lblResult').html('Product added/updated');
            },
            error: function (model, error) {
                $('#lblResult').html(error.statusText);
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
            ":id": "ProductId",
            "": "ProductIdNull"
        },
         ProductId: function (id) {
            var productid = id.substring(3,id.length);
            var product = new app.Product({ id: productid });
            var productview = new app.ProductView({ model: product});
            product.fetch({
                success: function () {
                    product.producttypelist= this.producttypelist;
                    product.imagelist = this.imagelist;
                    productview.render();
                },
                error: function (model, error) {
                    $('#lblResult').html(error.statusText);
                }
            });
        }, 
         ProductIdNull: function () {
            var product = new app.Product({ ID: null, TypeID:1, Name: '', Description: '', Price: 0, Image: '' });
            var productview = new app.ProductView({ model: product });
            product.producttypelist = this.producttypelist;
            product.imagelist = this.imagelist;
            productview.render();
    }
}); 


$(function () {
        producttypelist = new app.ProductTypelist();
        producttypelist.fetch({
            success: function () {
                imagelist = new app.Imagelist();
                imagelist.fetch({
                    success: function () {
                        var productroute = new ProductRoute;
                        Backbone.history.start();
                    },
                    error: function (model, error) {
                        $('#lblResult').html(error.statusText);
                    }
                });
            },
            error: function (model, error) {
                $('#lblResult').html(error.statusText);
            }
        });
});

