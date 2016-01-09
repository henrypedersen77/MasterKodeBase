var app = app || {};
app.AboutModel = Backbone.Model.extend({
    defaults: {
        quote: '',
        author: ''
    }
});
var data = new app.AboutModel({
    quote: 'We know what we are, but not what we may be .',
    author: 'Abraham Lincoln'
});
app.AppView = Backbone.View.extend({
    el: '#container',
    aboutTemplate: _.template($('#about-template').html()),
    render: function () {
        this.$el.html(this.aboutTemplate(data.toJSON()));
        return this;
    },
    initialize: function () {
        this.render();
    }
});
$(function () {
    new app.AppView();
});