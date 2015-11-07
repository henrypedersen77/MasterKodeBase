var app = app || {};

app.ProductType= Backbone.Model.extend({
    urlRoot: '/api/producttype',
    reset: true,
});


app.ProductTypeView = Backbone.View.extend({
    el: '#content',
    template: _.template($('#producttype-tmpl').html()),

    events: {
        "click #btnSubmit": "AddProductTypeButtonHandler",
    },
    AddProductTypeButtonHandler: function (event) {
        var producttype = new app.ProductType();

        producttype.save({
            ID: $(event.currentTarget).data("id"),
            Name: txtName.value,
        },
        {
            wait: true,
            success: function (model, response) {
                $('#lblResult').html('Producttype added/updated');
            },
            error: function (model, error) {
                $('#lblResult').html(error.statusText);
            }
        });
    },
    render: function () {
        var self = this;
        var html = this.template(this.model.toJSON());
        self.$el.html(html);
        return self;    
    },
});

var ProductTypeRoute = Backbone.Router.extend({
 routes: { 
            ":id": "ProductTypeId",
            "": "ProductTypeIdNull"
        },
         ProductTypeId: function (id) {
            var producttypeid = id.substring(3,id.length);
            var producttype = new app.ProductType({ id: producttypeid });
            var producttypeview = new app.ProductTypeView({ model: producttype});
            producttype.fetch({
                success: function () {
                    producttypeview.render();
                },
                error: function (model, error) {
                    $('#lblResult').html(error.statusText);
                }
            });
        }, 
         ProductTypeIdNull: function () {
             var producttype = new app.ProductType({ ID: null, Name: '' });
            var producttypeview = new app.ProductTypeView({ model: producttype });
            producttypeview.render();
    }
}); 


$(function () {
    var producttyperoute = new ProductTypeRoute;
    Backbone.history.start();
});

