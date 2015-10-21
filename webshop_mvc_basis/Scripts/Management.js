/// <reference path="C:\master_proj\bped_ember\webshop_mvc_basis\Pages/Management/ManageProducts.html" />
/// <reference path="C:\master_proj\bped_ember\webshop_mvc_basis\Pages/Management/ManageProducts.html" />
Management_application = Ember.Application.create({});

Management_application.IndexRoute = Ember.Route.extend({

    model: function () {
        var id = 13;

        if (id) {
            return Ember.RSVP.hash({
                product: Management_application.Product.get(),
                producttype: Management_application.ProductType.get(),
            })
        }
    }
});


Management_application.IndexController = Ember.Controller.extend({
    actions: {
        deleteproduct: function (id) {
            return Em.$.ajax('/api/product/'+id, {
                "type": 'DELETE', // HTTP method
                "dataType": 'JSON', // type of data expected from the API response
                "success": function (data, textStatus, jqXHR) {
                    window.location.replace('Management.html');
                },
                "error": function (jqXHR, textStatus, errorThrown) {
                    statusmessage, 'Error adding product to cart';
                }
            });
        },
        addproduct: function () {
            window.location.replace('ManageProducts.html');
        },
        editproduct: function (id) {
            window.location.replace('ManageProducts.html?id=' + id);
        },
        deleteproducttype: function (id) {
            return Em.$.ajax('/api/producttype/'+id, {
                "type": 'DELETE', // HTTP method
                "dataType": 'JSON', // type of data expected from the API response
                "success": function (data, textStatus, jqXHR) {
                    window.location.replace('Management.html');
                },
                "error": function (jqXHR, textStatus, errorThrown) {
                }
            });
        },
        addproducttype: function () {
            window.location.replace('ManageProductTypes.html');
        },
        editproducttype: function (id) {
            window.location.replace('ManageProductTypes.html?id=' + id);
        }
    }
});

Management_application.Product = Ember.Object.extend();

Management_application.Product.reopenClass({
    get: function () {
        return $.getJSON("/api/product").then(function (response) {
            var items = [];
            response.forEach(function (record) {
                var product = Management_application.Product.create();
                product.set('ID', record.ID);
                product.set('Name', record.Name);
                product.set('Price', record.Price);
                product.set('Description', record.Description);
                product.set('Image', record.Image);
                product.set('ImageUrl', '../Content/Images/Products/' + record.Image);
                product.set('ProductUrl', '/pages/product.html?id=' + record.ID);
                items.push(product)
            });
            return items;
        });
    }
});

Management_application.ProductType = Ember.Object.extend();

Management_application.ProductType.reopenClass({
    get: function () {
        return $.getJSON("/api/producttype").then(function (response) {
            var items = [];

            response.forEach(function (record) {
                var producttype = Management_application.ProductType.create();
                producttype.set('ID', record.ID);
                producttype.set('Name', record.Name);
                items.push(producttype)
            });
            return items;
        });
    }
});
