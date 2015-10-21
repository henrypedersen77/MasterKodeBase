Index_application = Ember.Application.create({});

Index_application.IndexRoute = Ember.Route.extend({
    model: function () {
                return Index_application.Product.all();
            }
    });


Index_application.IndexController = Ember.Controller.extend({

    id: '',

    actions:{
        redirct: function (id) {
            var url = '/pages/product.html?id=' + id;
            window.location.replace(url);
        }
    }
});

Index_application.Product = Ember.Object.extend();

Index_application.Product.reopenClass({
    all: function () {
        return $.getJSON("/api/product").then(function (response) {
            var items = [];

            response.forEach(function (record) {
                var product = Index_application.Product.create();
                product.set('ID', record.ID);
                product.set('TypeID', record.TypeID);
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
