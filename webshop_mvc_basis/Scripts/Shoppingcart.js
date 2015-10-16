var app = app || {};

var theView;
var allOrders;

var optionsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
var total = 0;
var vat = 0;
var shipping = 15;
var totalAmount = 0;

app.Shoppingcart = Backbone.Collection.extend({
    url: function () { return '/api/cart/' + this.url_created + '/orders'; },
    initialize: function (models, options) {
        this.url_created = options.url_created;
    },
    reset: true
});

app.PaidOrders = Backbone.Collection.extend({
    url: '/api/cart/paid',
    save: function(){
        Backbone.sync('create', this, {
            success: function() {
                window.location("/Pages/Success.html");
            }
        });
    },
    reset: true
});

app.Order = Backbone.Model.extend({
    urlRoot: '/api/Cart',
    reset: true
});

app.Login = Backbone.Model.extend({
    urlRoot: '/api/Login',
    reset: true
});

app.AppView = Backbone.View.extend({
    el: '#content',
    events: {
        'click': 'handleClick',
        'change': 'handleChange'
    },
    shoppingcartTemplate: _.template($('#shoppingcart-template').html()),
    render: function () {
        var self = this;
        var loginModel = new app.Login();
        loginModel.fetch().done(function (response) {
            var ClientID = response.user.Guid;
            allOrders = new app.Shoppingcart(null, { url_created: ClientID });
            allOrders.fetch();
            allOrders.on('all', function (data) {
                self.$el.html(self.shoppingcartTemplate(allOrders.toJSON()));
                var order
                total = 0;
                for (var i = 0; i < allOrders.length; i++) {
                    order = allOrders.models[i];
                    total = total + (order.attributes.Amount * order.attributes.Product.Price);
                }
                vat = (total * 0.21);
                totalAmount = total + vat + shipping;
            });
        });
        return this;
    },
    initialize: function () {
        _.bindAll(this, 'render');
        this.listenTo(allOrders, 'reset', this.render);
        this.render();
    },
    handleClick: function (e) {
        e.preventDefault();
        if (e.target.id === "ContentPlaceHolder1_LinkButton1") {
            window.location("/Pages/Index.html");
        }
        if (e.target.id === "btnDel") {
            var id = $(e.target).data("id");
            deleteitem(id);
        }
        if (e.target.id === "ContentPlaceHolder1_btnCheckout") {
            checkout();
        }
    },
    handleChange: function (e) {
        e.preventDefault();
        if (e.target.id === "select_amount") {
            var id = $(e.target).data("id");
            var value = $(e.target).val();
            changeamount(id, value);
        }
    }
});

deleteitem = function (cartid) {
    var cart = new app.Order({ id: cartid });
    cart.destroy().done(function () {//der skal sendes en HTTP Delete til /api/cart/{cartID}
        allOrders.fetch();//+ data på siden skal opfriskes
    });
 };

checkout = function () {
    var po = new app.PaidOrders();
    po.add(allOrders.toJSON()); //En kopi af allOrders
    po.save();

 };

 changeamount = function (cartid, value) {
     //der skal sendes en HTTP post til /api/cart/{cartid}/amount med antal angivet i JSON dataet

     //Problem med at poste et nummer til url’en "/api/cart/{cartid}/amount"
     //Det er ikke muligt i Backbone, opgaven blev derfor løst via Jquery Ajax.
     $.ajax({
         url: "/api/cart/" + cartid + "/amount",
         dataType: "json",
         contentType: "application/json;charset=utf-8",
         type: "POST",
         data: JSON.stringify(value),
         success: function (msg) {
             allOrders.fetch();//+ data på siden skal opfriskes
         }
     });
 };

//main
$(function () {
    theView = new app.AppView();
});