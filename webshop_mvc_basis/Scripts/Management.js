var app = app || {};
var allProducts;
var allProductTypes;
app.Product = Backbone.Model.extend({
    urlRoot: '/api/Product',
    reset: true
});
app.Producttype = Backbone.Model.extend({
    urlRoot: '/api/Producttype',
    reset: true
});
app.Products = Backbone.Collection.extend({
    url: '/api/Product',
    reset: true
});
app.Producttypes = Backbone.Collection.extend({
    url: '/api/Producttype',
    reset: true
});
app.ProductView = Backbone.View.extend({
    el: '#productContent',
    events: {
        'click': 'handleClick'
    },
    productTemplate: _.template($('#product-template').html()),
    render: function () {
        var self = this;        
        allProducts = new app.Products();
        allProducts.fetch();
        allProducts.on('all', function (data) {
            self.$el.html(self.productTemplate(allProducts.toJSON()));
        });
        return this;
    },
    initialize: function () {
        _.bindAll(this, 'render');
        this.listenTo(allProducts, 'reset', this.render);
        this.render();
    },
    handleClick: function (e) {
        e.preventDefault();
        if (e.target.id === "btnAddNewProduct") {
            addproduct();
        }
        if (e.target.id === "btnDelProduct") {
            var id = $(e.target).data("id");
            deleteproduct(id);
        }
        if (e.target.id === "btnEditProduct") {
            var id = $(e.target).data("id");
            editproduct(id);
        }
    }
});
app.ProducttypeView = Backbone.View.extend({
    el: '#producttypeContent',
    events: {
        'click': 'handleClick'
    },
    productTemplate: _.template($('#producttype-template').html()),
    render: function () {
        var self = this;
        allProductTypes = new app.Producttypes();
        allProductTypes.fetch();
        allProductTypes.on('all', function (data) {
            self.$el.html(self.productTemplate(allProductTypes.toJSON()));
        });
        return this;
    },
    initialize: function () {
        _.bindAll(this, 'render');
        this.listenTo(allProductTypes, 'reset', this.render);
        this.render();
    },
    handleClick: function (e) {
        e.preventDefault();
        if (e.target.id === "btnAddNewProducttype") {
            addproducttype();
        }
        if (e.target.id === "btnDelProducttype") {
            var id = $(e.target).data("id");
            deleteproducttype(id);
        }
        if (e.target.id === "btnEditProducttype") {
            var id = $(e.target).data("id");
            editproducttype(id);
        }
    }
});
addproduct = function () {
    window.location("/Pages/Management/ManageProducts.html");
};
deleteproduct = function (pid) {
    var product = new app.Product({
        id: pid
    });
    product.destroy().done(function () {//der skal sendes en HTTP Delete til /api/product/{pid}
        allProducts.fetch();//+ data på siden skal opfriskes
    });
};
editproduct = function (id) {
    window.location("/Pages/Management/ManageProducts.html#id=" + id);
};
addproducttype = function () {
    window.location("/Pages/Management/ManageProductTypes.html");
};
deleteproducttype = function (pid) {
    var producttype = new app.Producttype({
        id: pid
    });
    producttype.destroy().done(function () {//der skal sendes en HTTP Delete til /api/product/{pid}
        allProductTypes.fetch();//+ data på siden skal opfriskes
    });
};
editproducttype = function (id) {
    window.location("/Pages/Management/ManageProductTypes.html#id=" + id);
};
$(function () {
    new app.ProductView();
    new app.ProducttypeView();
});