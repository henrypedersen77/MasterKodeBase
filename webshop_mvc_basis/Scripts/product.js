app = Ember.Application.create({ 
    rootElement: "#ember-app" 
});
app.CartAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api',
    headers: {
        'Content-Type': 'Application/Json'
    }
});
app.Cart = DS.Model.extend({
    ClientID : DS.attr('string'),
    ProductID : DS.attr('number'),
    Amount : DS.attr('number'),
    DatePurchased : DS.attr('date'),
    IsInCart : DS.attr('boolean')
});
app.ProductAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api'
});
app.Product = DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    image: DS.attr('string'),
    price: DS.attr('number'),
    type_id: DS.attr('number')
});
app.LoginAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api'
});
app.Login = DS.Model.extend({
    login: DS.attr('string'),
    guid: DS.attr('string')
});
var inflector = Ember.Inflector.inflector;
inflector.irregular('cart', 'cart');
inflector.irregular('product', 'product');
inflector.irregular('login', 'login');
app.IndexController = Ember.Controller.extend({
    actions: {
        addProduct: function () {
            var self = this;
            this.store.findRecord('login', 1).then(function(data) {
                var id = window.location.search.substring(1); //id=x
                id = id.substring(3, id.length); 
                var post = self.store.createRecord('cart', {
                    ClientID : data.get('guid'),
                    ProductID : id,
                    Amount : Ember.$('#ddlAmount').val(),
                    DatePurchased : new Date(),
                    IsInCart : true
                });
                post.save().then(function () {
                    self.set('statusmessage', "The order has been added to the shoppingcart");
                }).catch(function (error) {
                    self.set('statusmessage', "Error trying to add order to system");
                });
            }).catch(function (error) {
                self.set('statusmessage', "You must login, before you can order products!");
            });
        }
    }
});
app.IndexRoute = Ember.Route.extend({
    model: function() {
        var id = window.location.search.substring(1); //id=x
        id = id.substring(3, id.length); //x     
        return this.store.findRecord('product', id);
    }
});
app.CartSerializer = DS.JSONSerializer.extend({
    serialize:function(snapshot, options) {
        var json = this._super(...arguments);
        return json;
    }
});
app.ProductSerializer = DS.JSONSerializer.extend({
    normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
        var product = new Object();
        product.type = "product";
        product.id = payload.ID;
        product.name = payload.Name;
        product.description = payload.Description;
        product.image = "../Content/Images/Products/" + payload.Image;
        product.price = payload.Price;
        product.type_id = payload.TypeID;
        payload = product;
        return this._super(...arguments);
    }
});
app.LoginSerializer = DS.JSONSerializer.extend({
    normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
        var login = new Object();
        login.type = "login";
        login.id = 1;
        login.login = payload.login;
        login.guid = payload.user.Guid;    
        payload = login;
        return this._super(...arguments);
    },
    normalizeArrayResponse: function(store, primaryModelClass, payload, id, requestType)  
    {   
        var data = new Array;
        payload.id = 1;
        data.push(payload);
        payload = data;
        return this._super(...arguments);
    }
});