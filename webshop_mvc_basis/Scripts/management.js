app = Ember.Application.create({ rootElement: "#ember-app" });

app.ProductAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api'
});

app.ProducttypeAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api'
});

app.Product = DS.Model.extend({
        name: DS.attr('string'),
        description: DS.attr('string'),
        image: DS.attr('string'),
        price: DS.attr('number'),
        typeid: DS.attr('number')
    }
);

app.Producttype = DS.Model.extend({
        name: DS.attr('string')
    }
);

var inflector = Ember.Inflector.inflector;
inflector.irregular('product', 'product');
inflector.irregular('producttype', 'producttype');

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
            product.typeid = payload[j].TypeID;
            data.push(product);
        }
        payload = data;
        return this._super(...arguments);
    }
});

app.ProducttypeSerializer = DS.JSONSerializer.extend({
    normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
        var data = new Array;
        for (var j = 0; j < payload.length; j++){
            var producttype = new Object();
            producttype.type = "producttype";
            producttype.id = payload[j].ID;
            producttype.name = payload[j].Name;
            data.push(producttype);
        }
        payload = data;
        return this._super(...arguments);
    }
});

app.IndexRoute = Ember.Route.extend({
    model: function() {
        return {products: this.store.findAll('product'),
            producttypes: this.store.findAll('producttype')}
    }
});

app.IndexController = Ember.Controller.extend({
    self:this,
    actions: {
        deleteProduct: function(id){
            this.store.findRecord('product', id).then(function(data) {
                data.destroyRecord(); // => DELETE to /api/product/{id}
            });
        },
        deleteProducttype: function(id){
            this.store.findRecord('producttype', id).then(function(data) {
                data.destroyRecord(); // => DELETE to /api/producttype/{id}
            });
        },
        editProduct: function(id){
            window.location.replace("/Pages/Management/ManageProducts.html?id=" + id);
        },
        editProducttype: function(id){
            window.location.replace("/Pages/Management/ManageProductTypes.html?id=" + id);
        },
        addProduct: function(){
            window.location.replace("/Pages/Management/ManageProducts.html");
        },
        addProducttype: function(){
            window.location.replace("/Pages/Management/ManageProductTypes.html");
        }
    }
});