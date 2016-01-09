app = Ember.Application.create({ 
    rootElement: "#ember-app" 
});
app.LoginAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api',
    headers: {
        'Content-Type': 'Application/Json'
    }
});
app.Login = DS.Model.extend({
    login: DS.attr('string'),
    password: DS.attr('string')
});
var inflector = Ember.Inflector.inflector;
inflector.irregular('login', 'login');
app.IndexController = Ember.Controller.extend({
    actions: {
        loginUser: function () {
            var self = this;
            var login = this.get('login');
            var password = this.get('password');
            var post = this.store.createRecord('login', {
                login: login,
                password: password
            });
            post.save().then(function () {
                window.location.replace("/Pages/Index.html");
            }).catch(function (error) {
                self.set('statusmessage', "error");
            });
        }
    }
});
app.IndexRoute = Ember.Route.extend({
});
app.LoginSerializer = DS.JSONSerializer.extend({
    serialize:function(snapshot, options) {
        var json = this._super(...arguments);
        return json;
    }
});