var app = app || {};

app.Router = Backbone.Router.extend({
    routes: {
        "": "viewProductType",
        ":id": "viewProductType"
    },
    viewProductType: function (id) {
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

app.Producttype = Backbone.Model.extend({
    urlRoot: '/api/producttype',
    reset: true
});

app.AppView = Backbone.View.extend({
    el: '#content',
    events: {'click': 'handleClick'},
    productTemplate: _.template($('#producttype-template').html()),
    render: function (pid) {
        var self = this;
        var producttype = new app.Producttype();
        if (pid != null) {
            producttype = new app.Producttype();
            producttype.fetch({ data: $.param({ id: pid }) });
            producttype.on('all', function (data) {
                self.$el.html(self.productTemplate(producttype.toJSON()));
            });
        } else {
            producttype = new app.Producttype({ID: -1977, Name: ''});
            self.$el.html(self.productTemplate(producttype.toJSON()));
        }
        
        return this;
    },
    handleClick: function (e) {
        e.preventDefault();
        if (e.target.id === "btnSubmit") {
            var ID = $(e.target).data("id");
            var Name = $('#txtName').val();
            if (ID === -1977) {
                addproducttype(Name);
            } else {
                changeproducttype(ID, Name);
            }
        }
    }
});

addproducttype = function (PTName) {
    var pt = new app.Producttype({ID:null, Name: PTName });
    pt.save().done(function () {
        $('#lblResult').html("Producttype has been saved!");
    });
}

changeproducttype = function (PTID, PTName) {
    var pt = new app.Producttype({ ID: PTID, Name: PTName });
    pt.save().done(function () {
        $('#lblResult').html("Producttype has been saved!");
    });
}

$(function () {
    new app.Router();
    Backbone.history.start();
});