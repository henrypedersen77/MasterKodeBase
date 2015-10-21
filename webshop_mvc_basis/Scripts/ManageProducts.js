ManageProduct_application = Ember.Application.create({});

ManageProduct_application.IndexRoute = Ember.Route.extend({

    model: function () {
        var id = null;
        return Ember.RSVP.hash({
            product: ManageProduct_application.Product.get(id),
            producttypes: ManageProduct_application.ProductTypes.get(),
            images: ManageProduct_application.Images.get(),
        })
    }
});

ManageProduct_application.IndexController = Ember.Controller.extend({
    actions: {
        submit: function (id) {
            return Em.$.ajax('/api/product', {
                "type": 'POST', // HTTP method
                "dataType": 'JSON', // type of data expected from the API response
                "data": { // Begin data payload
                    "ID": this.model.product.ID,
                    "TypeID": this.model.product.TypeID,
                    "Name": this.model.product.Name,
                    "Price": this.model.product.Price,
                    "Description": this.model.product.Description,
                    "Image": this.model.product.Image,
                }, // End data payload
                "success": function (data, textStatus, jqXHR) {
                    window.console.log(jqXHR);
                    //                            window.location.replace('../Index.html');
                },
                "error": function (jqXHR, textStatus, errorThrown) {
                    window.console.log(jqXHR);
                }
            });
        }
    }
});

ManageProduct_application.Product = Ember.Object.extend();

ManageProduct_application.Product.reopenClass({
    get: function (id) {
        if (id) {
            return $.getJSON("/api/product/" + id).then(function (response) {
                var product = ManageProduct_application.Product.create();
                product.set('ID', response.ID);
                product.set('TypeID', response.TypeID);
                product.set('Name', response.Name);
                product.set('Price', response.Price);
                product.set('Description', response.Description);
                product.set('Image', response.Image);
                return product;
            });
        }
        else {
            var product = ManageProduct_application.Product.create();
            product.set('ID', null);
            product.set('Name', null);
            product.set('Price', null);
            product.set('Description', null);
            product.set('Image', null);
            return product;
        }
    }
});

ManageProduct_application.ProductTypes = Ember.Object.extend();

ManageProduct_application.ProductTypes.reopenClass({
    get: function () {
        return $.getJSON("/api/producttype").then(function (response) {
            var items = [];
            response.forEach(function (record) {
                var producttype = ManageProduct_application.ProductTypes.create();
                producttype.set('ID', record.ID);
                producttype.set('Name', record.Name);
                items.push(producttype)
            });
            return items;
        });
    }
});

ManageProduct_application.Images = Ember.Object.extend();

ManageProduct_application.Images.reopenClass({
    get: function () {
        return $.getJSON("/api/image").then(function (response) {
            var items = [];
            response.forEach(function (record) {
                var image= ManageProduct_application.Images.create();
                image.set('Name', record);
                items.push(image)
            });
            return items;
        });
    }
});
