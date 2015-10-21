Product_application = Ember.Application.create({});

Product_application.IndexRoute = Ember.Route.extend({

    model: function () {
        var id = 13;

        if (id) {
            return Ember.RSVP.hash({
                product: Product_application.Product.get(id),
                user: Product_application.User.get(),
                quantities: ['1', '2', '3', '4', '5', '6'],
                selectedquantity: null,
                statusmessage: null
            })
        }
    }
});


Product_application.IndexController = Ember.Controller.extend({
    actions:{
        addcart: function (id) {
                var today = new Date();
                    return Em.$.ajax('/api/cart', {
                        "type": 'POST', // HTTP method
                        "dataType": 'JSON', // type of data expected from the API response
                        "data": { // Begin data payload

                            "ClientID": this.model.user.Guid,
                            "ProductID": this.model.product.ID,
                            "Amount": this.model.selectedquantity,
                            "DatePurchased": today,
                            "IsInCart": "true"

                        }, // End data payload
                        "success": function (data, textStatus, jqXHR) {
                            statusmessage = 'Product added to cart';
//                            window.location.replace('../Index.html');
                        },
                        "error": function (jqXHR, textStatus, errorThrown) {
                            statusmessage, 'Error adding product to cart';
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

Product_application.User = Ember.Object.extend();

Product_application.User.reopenClass({
    get: function () {
        return $.getJSON("/api/login").then(function (response) {
            var user = Product_application.User.create();
            user.set('UserName', response.login);
            user.set('UserId', response.user.Id);
            user.set('Guid', response.user.Guid);
            user.set('FirstName', response.user.FirstName);
            user.set('LastName', response.user.LastName);
            user.set('Address', response.user.Address);
            user.set('PostalCode', response.user.PostalCode);

            return user;
        });
    }
});


Product_application.Product = Ember.Object.extend();

Product_application.Product.reopenClass({
    get: function (id) {
        return $.getJSON("/api/product/"+id).then(function (response) {
            var product = Product_application.Product.create();

            product.set('ID', response.ID);
            product.set('TypeID', response.TypeID);
            product.set('Name', response.Name);
            product.set('Price', response.Price);
            product.set('Description', response.Description);
            product.set('Image', response.Image);
            product.set('ImageUrl', '../Content/Images/Products/' + response.Image);
            product.set('ProductUrl', '/pages/product.html?id=' + response.ID);


//            var user = Product_application.User.get();

            return product;
        });
        }
});
