app = Ember.Application.create({ 
    rootElement: "#ember-app" 
});
app.ProducttypeAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api'
});
app.Producttype = DS.Model.extend({
    name: DS.attr('string')
});
var inflector = Ember.Inflector.inflector;
inflector.irregular('producttype', 'producttype');
app.ProducttypeSerializer = DS.JSONSerializer.extend({
    normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
            var producttype = new Object();
            producttype.type = "producttype";
            producttype.id = payload.ID;
            producttype.name = payload.Name;
            payload = producttype;
        return this._super(...arguments);
    }
}
);
app.IndexRoute = Ember.Route.extend({
    model: function () {
        if(window.location.search != null && window.location.search.substring(1).length > 3){
            var id = window.location.search.substring(1); //id=x
            id = id.substring(3, id.length); //x
            return this.store.findRecord('producttype', id);
        }else{
            var obj = new Object();
            obj.name = "";
            obj.id = 0;
            return obj;
        }
    }
}
);
app.IndexController = Ember.Controller.extend({
    actions: {
        save: function(){
            var self = this;
            if(window.location.search.substring(1).length > 3){
                var id = window.location.search.substring(1); //id=x
                id = id.substring(3, id.length); //x
                var obj = new Object();
                obj.ID = id;
                obj.Name = this.get('model.name');
                var url = "/api/producttype";
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
                obj.Name = this.get('model.name');
                var url = "/api/producttype";
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