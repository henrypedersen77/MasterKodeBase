ManageProductType_application = Ember.Application.create({});

ManageProductType_application.IndexRoute = Ember.Route.extend({

    model: function () {
        var id = null;
        return Ember.RSVP.hash({
            producttype: ManageProductType_application.ProductType.get(id)
        })
    }
});


ManageProductType_application.IndexController = Ember.Controller.extend({
    actions: {
        submit: function (id) {
            return Em.$.ajax('/api/producttype', {
                "type": 'POST', // HTTP method
                "dataType": 'JSON', // type of data expected from the API response
                "data": { // Begin data payload
                    "ID": this.model.producttype.ID,
                    "Name": this.model.producttype.Name,
                }, // End data payload
                "success": function (data, textStatus, jqXHR) {
                    window.console.log(jqXHR);
                    //                            window.location.replace('../Index.html');
                },
                "error": function (jqXHR, textStatus, errorThrown) {
                    window.console.log(jqXHR);
                }
            });
        }
    }
});

ManageProductType_application.ProductType = Ember.Object.extend();

ManageProductType_application.ProductType.reopenClass({
    get: function (id) {
        if(id) 
        {
            return $.getJSON("/api/producttype/"+id).then(function (response) {
                    var producttype = ManageProductType_application.ProductType.create();
                    producttype.set('ID', response.ID);
                    producttype.set('Name', response.Name);
                    return producttype;
            });
        }
        else
        {
            var producttype = ManageProductType_application.ProductType.create();
            producttype.set('ID', null);
            producttype.set('Name', null);
            return producttype;
        }
    }
});
