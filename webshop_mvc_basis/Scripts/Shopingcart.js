Shoppingcart_application = Ember.Application.create({});

Shoppingcart_application.IndexRoute = Ember.Route.extend({

    model: function () {
        var self = this;

        return Ember.RSVP.hash({
            cart: Shoppingcart_application.Shoppingcart.get(),
            totallineamount: null,
            vat: 0,
            totalamount: null,

            //                user: Shoppingcart_application.User.get(),
            quantities: ['1', '2', '3', '4', '5', '6'],
            statusmessage: null,
        })
    }
});

Shoppingcart_application.IndexController = Ember.Controller.extend({
    actions:{
        deletecart: function (id) {
            var test = 'test';
            return Em.$.ajax('/api/cart/' + id, {
                        "type": 'DELETE', // HTTP method
                        "dataType": 'JSON', // type of data expected from the API response
                        "success": function (data, textStatus, jqXHR) {
                            statusmessage = 'Product added to cart';
                            window.location.replace('Shoppingcart.html');
                        },
                        "error": function (jqXHR, textStatus, errorThrown) {
                            statusmessage, 'Error deleting product to cart';
                        }
                    });
        
        },
    change: function() {
            const changeAction = this.get('action');
            const content = this.get('content');
            const selectedValue = content[selectedIndex];

            this.set('selectedValue', selectedValue);
          changeAction(selectedValue);
        }
    }
});

Shoppingcart_application.Shoppingcart = Ember.Object.extend();

Shoppingcart_application.Shoppingcart.reopenClass({
    get: function () {
        return $.getJSON("/api/login").then(function (response) {
            var user = Shoppingcart_application.Shoppingcart.create();
            user.set('UserName', response.login);
            user.set('UserId', response.user.Id);
            user.set('Guid', response.user.Guid);
            user.set('FirstName', response.user.FirstName);
            user.set('LastName', response.user.LastName);
            user.set('Address', response.user.Address);
            user.set('PostalCode', response.user.PostalCode);

            return Shoppingcart_application.Cart.get(response.user.Guid);
        });
    }
});

Shoppingcart_application.Cart = Ember.Object.extend({
    watchType: function () {
        if (this.LineAmount)
        {
            var newlineamount = this.Price * this.Amount;
            var totallineamount = this.totallineamount + newlineamount - this.LineAmount;
            var vat = this.vat + ((newlineamount - this.LineAmount) * 0.21);
            var totalamount = totallineamount + vat + 15;
            this.set('LineAmount', this.Price * this.Amount);
            this.set('totallineamount', totallineamount);
            this.set('vat', vat);
            this.set('totalamount', totalamount);

            return Em.$.ajax('/api/cart/' + this.ID + '/Amount', {
                "type": 'POST', // HTTP method
                "dataType": 'JSON', // type of data expected from the API response
                "data": JSON.stringify(parseInt(this.Amount)),
                "success": function (data, textStatus, jqXHR) {
//                    //                            window.location.replace('../Index.html');
                },
                "error": function (jqXHR, textStatus, errorThrown) {
 //                   statusmessage, 'Error adding product to cart';
                }
            });
        }
        else
        {
             this.set('totallineamount', 0);
            //            this.model.set('vat', vat);
            //            this.model.set('totalamount', totalamount);

        }
    }.observes('Amount')
});

Shoppingcart_application.Cart.reopenClass({
    get: function (guid) {
        return $.getJSON("/api/cart/" + guid + "/orders").then(function (response) {
            var items = [];
            var totallineamount = 0;

            response.forEach(function (record) {
                var product = Shoppingcart_application.Cart.create();
                product.set('ID', record.ID);
                product.set('ClientID', record.ClientID);
                product.set('ProductID', record.ProductID);
                product.set('Amount', record.Amount);
                product.set('DatePurchased', record.DatePurchased);
                product.set('IsInCart', record.IsInCart);
                product.set('ImageUrl', '../Content/Images/Products/' + record.Product.Image);
                product.set('Name', record.Product.Name);
                product.set('Price', record.Product.Price);
                product.set('Description', record.Product.Description);
                product.set('LineAmount', record.Product.Price * record.Amount);
                items.push(product)
                totallineamount = totallineamount + (record.Product.Price * record.Amount);
            });

            var vat = totallineamount *0.21;
            var totalamount = totallineamount + vat + 15;

//            this.set('totallineamount', totallineamount);
//            this.set('vat', vat);
//            this.set('totalamount', totalamount);

            return items;
        });
        }
});
