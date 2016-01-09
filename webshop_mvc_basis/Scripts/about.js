app = Ember.Application.create({
    rootElement: "#ember-app"
});
app.IndexRoute = Ember.Route.extend({
    model: function () {
        return {
            qoute: "We know what we are, but not what we may be .",
            author: 'Abraham Lincoln'
        }
    }
});