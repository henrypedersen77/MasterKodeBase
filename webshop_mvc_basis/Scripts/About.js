var app = app || {};

app.About = Backbone.Model.extend({
    url: '/about',
    default: {
        quote: '',
        author: ''
    },
});

app.AboutView = Backbone.View.extend({
    el: '#about-view',
    template: _.template($('#about-tmpl').html()),

    initialize: function () {
        this.model.fetch();
        this.render();
    },
    render: function(){
        _.each(this.model.models, function (index) {
            var ProductTemplate = this.template(index.toJSON());
            $(this.el).append(ProductTemplate);
        }, this);

        //var html = this.template(this.model.toJSON());
        //this.$el.html(html);
        //return this;    
    }
});

var about = new app.About({
    quote: "We know what we are, but not what we may be .",
    author: "Abraham Lincoln"
}
);

$(function () { 
    new app.AboutView({ model: about });
});
