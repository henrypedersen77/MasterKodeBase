/// <reference path="C:\master_proj\bped_backbone\webshop_mvc_basis\Pages/Management/ManageProducts.html" />
/// <reference path="C:\master_proj\bped_backbone\webshop_mvc_basis\Pages/Management/ManageProducts.html" />
var app = app || {};
var product;
var productlist;
var productview;
var producttype;
var producttypelist;
var producttypeview;

app.Product = Backbone.Model.extend({
    url: '/api/product',
});

app.Productlist = Backbone.Collection.extend({
    url: '/api/product',
    model: app.Product,
});

app.ProductView = Backbone.View.extend({
    el: '#content',
    template: _.template($('#product-tmpl').html()),

    events: {
        "click #btnAddNewProduct": "addnewproductHandler",
        "click #btnDeleteProduct": "deleteproductHandler",
        "click #btnEditProduct": "editproductHandler",
    },
    addnewproductHandler: function (event) {
        window.location.replace('ManageProducts.html');
    },
    editproductHandler: function (event) {
        window.location.replace('ManageProducts.html#id=' + $(event.currentTarget).data("id"));
    },
    deleteproductHandler: function (event) {
        var product = new app.Product({ id: $(event.currentTarget).data("id") });
        product.destroy({
            success: function (model, respose, options) {
                productlist.fetch({
                    success: function (model, response) {
                        productview.render();
                    }
                });
            },
            error: function (model, error) {
                console.log("Something went wrong while deleting the model");
            }
        });

    },

    render: function (eventName) {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);

        return this;
    }
});

app.ProductType = Backbone.Model.extend({
    url: '/api/producttype',
});

app.ProductTypelist = Backbone.Collection.extend({
    url: '/api/producttype',
    model: app.ProductType,
});

app.ProductTypeView = Backbone.View.extend({
    el: '#content2',
    template: _.template($('#producttype-tmpl').html()),

    events: {
        "click #btnAddNewProductType": "addnewproducttypeHandler",
        "click #btnDeleteProductType": "deleteproducttypeHandler",
        "click #btnEditProductType": "editproducttypeHandler",
    },
    addnewproducttypeHandler: function (event) {
        window.location.replace('ManageProductTypes.html');
    },
    editproducttypeHandler: function (event) {
        window.location.replace('ManageProductTypes.html#id=' + $(event.currentTarget).data("id"));
    },
    deleteproducttypeHandler: function (event) {
        var producttype = new app.ProductType({ id: $(event.currentTarget).data("id") });
        producttype.destroy({
            success: function (model, respose, options) {
                producttypelist.fetch({
                    success: function (model, response) {
                        producttypeview.render();
                    }
                });
            },
            error: function (model, error) {
                console.log("Something went wrong while deleting the model");
            }
        });

    },

    render: function (eventName) {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);

        return this;
    }
});

$(function () {
    productlist = new app.Productlist();
    productview = new app.ProductView({ model: productlist });
    productlist.fetch({
        success: function () {
            productview.render();
        }
    });
    producttypelist = new app.ProductTypelist();
    producttypeview = new app.ProductTypeView({ model: producttypelist });
    producttypelist.fetch({
        success: function () {
            producttypeview.render();
        }
    });
});

