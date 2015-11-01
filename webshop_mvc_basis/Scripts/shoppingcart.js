app = Ember.Application.create({ rootElement: "#ember-app" });

app.IndexRoute = Ember.Route.extend({
    model: function () {
        var orders = new Array;
        return this.store.findRecord('login', 1).then(function(data) {
            var guid = data.get('guid');
            var url = "/api/cart/" + guid + "/orders";
            return Ember.$.getJSON(url).then(function(orders){
                var subtotal = 0;
                var vat = 0;
                var totalamount = 0;
                for (var j = 0; j < orders.length; j++){
                    orders[j].Product.Image = "/Content/Images/Products/" + orders[j].Product.Image;
                    subtotal = subtotal + (orders[j].Product.Price * orders[j].Amount);
                }
                vat = subtotal * 0.21;
                totalamount = subtotal + vat + 15;
                Ember.set(orders, 'subtotal', subtotal);
                Ember.set(orders, 'vat', vat);
                Ember.set(orders, 'totalamount', totalamount);
                return orders;
            });
        })
    }
});

var inflector = Ember.Inflector.inflector;
inflector.irregular('login', 'login');

app.LoginAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api'
});

app.Login = DS.Model.extend({
    login: DS.attr('string'),
    guid: DS.attr('string')
});

app.Cart = DS.Model.extend({
    clientID: DS.attr('string'),
    productID: DS.attr('number'),
    amount: DS.attr('number'),
    datePurchased: DS.attr('date'),
    isInCart: DS.attr('boolean')
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
        console.log(payload);

        var data = new Array;
        payload.id = 1;
        data.push(payload);

        payload = data;
        console.log(payload);

        return this._super(...arguments);
    }
});

//app.CartSerializer = DS.JSONSerializer.extend({
//    normalizeResponse: function (store, primaryModelClass, payload, id, requestType) {
//        console.log("normalixe Cart");
//        console.log(payload);
//        return this._super(...arguments);
//    }
//});

app.IndexController = Ember.Controller.extend({
    selectedAmount : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    actions: {
        changeAmount: function(v1, v2){
            Ember.set(this.model[v1], 'Amount', v2.target.value);
            var subtotal = 0;
            var vat = 0;
            var totalamount = 0;
            for (var j = 0; j < this.model.length; j++){
                subtotal = subtotal + (this.model[j].Product.Price * this.model[j].Amount);
            }
            vat = subtotal * 0.21;
            totalamount = subtotal + vat + 15;
            Ember.set(this.model, 'subtotal', subtotal);
            Ember.set(this.model, 'vat', vat);
            Ember.set(this.model, 'totalamount', totalamount);

            var url = "/api/cart/" + this.model[v1].ID + "/amount";
            var o = {
                url: url,
                data: v2.target.value,
                type: "POST",
                dataType: "apllication/json",
                contentType: 'application/json; charset=utf-8'
            };
            $.ajax(o);
        },
        deleteCart: function(index){
            var url = "/api/cart/" + this.model[index].ID;
            var o = {
                url: url,
                type: "DELETE",
                dataType: "apllication/json",
                contentType: 'application/json; charset=utf-8'
            };
            $.ajax(o);

            this.model.removeAt(index, 1);
        },
        checkOut: function(){
            console.log("checkout");
            
            var dataArray = new Array;
            for (var j = 0; j < this.model.length; j++){
                var obj = new Object();
                obj.ID = this.model[j].ID;
                dataArray.push(obj);
            }

            var url = "/api/cart/paid";
            var o = {
                url: url,
                data: JSON.stringify(dataArray),
                type: "POST",
                dataType: "apllication/json",
                contentType: 'application/json; charset=utf-8'
            };
            $.ajax(o);

            window.location.replace("/Pages/Success.html");
        }
    }
});

app.EqHelper = Ember.Helper.helper(function(args) {
    return args[0] === args[1];
});

app.MulHelper = Ember.Helper.helper(function(args) {
    return args[0] * args[1];
});

//app.SubTotalHelper = Ember.Helper.helper(function(args) {
//    var SubTotal = 0;
//    for (var j = 0; j < args[0].length; j++){
        
//        SubTotal = SubTotal + (args[0][j].Amount * args[0][j].Product.Price);
//    }

//    return SubTotal;
//});