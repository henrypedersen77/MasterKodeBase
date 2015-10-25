var app = app || {};

app.About = Backbone.Model.extend({
    url: '/about/1',
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
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;    
    }
});

var about = new app.About({
    quote: "We know what we are, but not what we may be .",
    author: "Abraham Lincolntest"
}
);

$(function () { 
    new app.AboutView({ model: about });
});
