/// <reference path="C:\master_proj\hped_ember\webshop_mvc_basis\Pages/Product.html" />
app = Ember.Application.create({ rootElement: "#ember-app" });

app.ProductAdapter = DS.JSONAPIAdapter.extend({
        namespace: 'api'
});

app.Product = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    image: DS.attr('string'),
    price: DS.attr('number'),
    type_id: DS.attr('number')
    }
);

var inflector = Ember.Inflector.inflector;
inflector.irregular('product', 'product');

app.ProductSerializer = DS.JSONSerializer.extend({
    normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
        var data = new Array;
        for (var j = 0; j < payload.length; j++){
            var product = new Object();
            product.type = "product";
            product.id = payload[j].ID;
            product.name = payload[j].Name;
            product.description = payload[j].Description;
            product.image = "../Content/Images/Products/" + payload[j].Image;
            product.price = payload[j].Price;
            product.type_id = payload[j].TypeID;
            data.push(product);
        }
        payload = data;
        return this._super(...arguments);
    }
});


app.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('product');
    }
});

app.IndexController = Ember.Controller.extend({
    actions: {
        productView: function(id) {
            window.location.replace("/Pages/Product.html/" + id); //Da denne web-side ikke er en SPA, så mistes browser historiken her.
        }
    }
});
