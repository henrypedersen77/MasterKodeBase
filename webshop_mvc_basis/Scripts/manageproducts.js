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
        var product = new Object();
        product.type = "product";
        product.id = payload.ID;
        product.name = payload.Name;
        product.description = payload.Description;
        product.image = payload.Image;
        product.price = payload.Price;
        product.typeid = payload.TypeID;
        payload = product;
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
    model: function () {
        var self = this;
        return self.store.findAll('producttype').then(function(allproducttypes) {
            return Ember.$.getJSON("/api/image").then(function(imageArray){
                if(window.location.search != null && window.location.search.substring(1).length > 3){
                    var id = window.location.search.substring(1); //id=x
                    id = id.substring(3, id.length); //x       
                    return self.store.findRecord('product', id).then(function(data) {
                        return{
                            product: data,
                            images: imageArray,
                            producttypes: allproducttypes
                        }
                    });
                }else{
                    var obj = new Object();
                    obj.name = "";
                    obj.id = 0;
                    obj.description = "";
                    obj.image = "";
                    obj.price = 0;
                    obj.typeid = 1;
                    var overobj = new Object();
                    overobj.product = obj;
                    overobj.images = imageArray;
                    overobj.producttypes = allproducttypes
                    return overobj;
                }
            })
        }
    )}
});

app.IndexController = Ember.Controller.extend({
    changedtype: null,
    changedimage: null,
    actions: {
        changeType: function(v2){
            this.changedtype = v2.target.value;
        },
        changeImage:function(v2){
            this.changedimage = v2.target.value;
        },
        save: function(){
            var self = this;
            console.log(self.changedtype);
            if(window.location.search.substring(1).length > 3){
                var id = window.location.search.substring(1); //id=x
                id = id.substring(3, id.length); //x
                var obj = new Object();
                obj.ID = id;
                obj.Name = this.get('model.product.name');
                obj.Description = this.get('model.product.description');
                if(self.changedimage===null){
                    obj.Image = this.get('model.product.image');
                }else{
                    obj.Image = self.changedimage;
                }
                obj.Price = this.get('model.product.price');
                if(self.changedtype === null){
                    obj.TypeID = this.get('model.product.typeid');
                }else{
                    obj.TypeID = self.changedtype;
                }
                var url = "/api/product";
                var o = {
                    url: url,
                    data: JSON.stringify(obj),
                    type: "POST",
                    dataType: "apllication/json",
                    contentType: 'application/json; charset=utf-8',
                    success: function(){
                        self.set('statusmessage', "Changes have been saved");
                    },
                    error: function(){
                        self.set('statusmessage', "Error!");
                    }
                };
                $.ajax(o);
            }else{
                var obj = new Object();
                obj.Name = this.get('model.product.name');
                obj.Description = this.get('model.product.description');
                if(self.changedimage===null){
                    obj.Image = this.get('model.product.image');
                }else{
                    obj.Image = self.changedimage;
                }
                obj.Price = this.get('model.product.price');
                if(self.changedtype === null){
                    obj.TypeID = this.get('model.product.typeid');
                }else{
                    obj.TypeID = self.changedtype;
                }
                var url = "/api/product";
                var o = {
                    url: url,
                    data: JSON.stringify(obj),
                    type: "POST",
                    dataType: "apllication/json",
                    contentType: 'application/json; charset=utf-8',
                    success: function(){
                        self.set('statusmessage', "Changes have been saved");
                    },
                    error: function(){
                        self.set('statusmessage', "Error!");
                    }
                };
                $.ajax(o);
            }
        }
    }
});

app.EqHelper = Ember.Helper.helper(function(args) {
    return args[0] === args[1];
});

app.EqintHelper = Ember.Helper.helper(function(args) {
    return args[0] === parseInt(args[1]);
});