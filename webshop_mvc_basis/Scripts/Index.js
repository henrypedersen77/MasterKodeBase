var app = app || {};

app.Index= Backbone.Model.extend();

app.Indexlist = Backbone.Collection.extend({
    url: '/api/product',
    model: app.Index,
});

app.IndexView = Backbone.View.extend({
    el: '#ContentPlaceHolder1_pnlProducts',
    template: _.template($('#index-tmpl').html()),

    render: function (eventName) {
        _.each(this.model.models, function (index) {
            var indexTemplate = this.template(index.toJSON());
            $(this.el).append(indexTemplate);
        }, this);

        return this;
    }
});


$(function () {
    var indexlist = new app.Indexlist();
    var indexview = new app.IndexView({ model: indexlist });
    indexlist.fetch({
        success: function () {
            indexview.render();
        }
    });
});

