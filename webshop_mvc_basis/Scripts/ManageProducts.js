var app = app || {};

var allImages;
var allImageNames;
var allProducttypes;

app.Router = Backbone.Router.extend({
    routes: {
        "": "viewProduct",
        ":id": "viewProduct"
    },
    viewProduct: function (id) {
        if (id != null) {
            var pid = id.substring(3, id.length); //fjerne id=
            var view = new app.AppView();
            view.render(pid);
        } else {
            var view = new app.AppView();
            view.render();
        }
    }
});

app.Producttypes = Backbone.Collection.extend({
    url: '/api/producttype',
    reset: true
});

app.Product = Backbone.Model.extend({
    url: '/api/product',
    reset: true
});

app.Images = Backbone.Model.extend({
    urlRoot: '/api/image',
    reset: true
});

app.AppView = Backbone.View.extend({
    el: '#content',
    events: { 'click': 'handleClick' },
    productTemplate: _.template($('#product-template').html()),
    render: function (pid) {
        var self = this;
        var product;
        allProducttypes = new app.Producttypes();
        allProducttypes.fetch().done(function(){ 
            allImages = new app.Images();
            allImages.fetch().done(function () {
                allImageNames = allImages.attributes;
                if (pid != null) {
                    product = new app.Product();
                    product.fetch({ data: $.param({ id: pid }) }).done(function(){
                        self.$el.html(self.productTemplate(product.toJSON()));
                    });
                } else {
                    product = new app.Product({
                        ID: -1977, TypeID: 1, Name: '',
                        Price: 0, Description: '', Image: 'Body Panels.jpg', ProductType: {ID: 1}
                    });
                    self.$el.html(self.productTemplate(product.toJSON()));
                }
            });
        });
        return this;
    },
    handleClick: function (e) {
        e.preventDefault();
        if (e.target.id === "btnSubmit") {
            var ID = $(e.target).data("id");
            var TypeID = $('#ddlType').val();
            var Name = $('#txtName').val();
            var Price = $('#txtPrice').val();
            var Image = $('#ddlImage').val();
            var Description = $('#ContentPlaceHolder1_txtDescription').val();
            if (ID === -1977) {
                addproduct(TypeID, Name, Price, Image, Description);
            } else {
                changeproduct(ID, TypeID, Name, Price, Image, Description);
            }
        }
    }
});

addproduct = function (PTTypeID, PTName, PTPrice, PTImage, PTDescription) {
    var pt = new app.Product({ ID: null, TypeID: PTTypeID, Name: PTName, Price: PTPrice, Image: PTImage, Description: PTDescription });
    pt.save().done(function () {
        $('#lblResult').html("Product has been saved!");
    });
}

changeproduct = function (PTID, PTTypeID, PTName, PTPrice, PTImage, PTDescription) {
    var pt = new app.Product({ ID: PTID, TypeID: PTTypeID, Name: PTName, Price: PTPrice, Image: PTImage, Description: PTDescription });
    pt.save().done(function () {
        $('#lblResult').html("Product has been saved!");
    });
}

$(function () {
    new app.Router();
    Backbone.history.start();
});