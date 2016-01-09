app = Ember.Application.create({
    rootElement: "#ember-app"
});
app.RegisterAdapter = DS.JSONAPIAdapter.extend({
    namespace: 'api',
    headers: {
        'Content-Type': 'Application/Json'
    }
});
app.Register = DS.Model.extend({
    login: DS.attr('string'),
    password: DS.attr('string'),
    user: DS.belongsTo('user')
});
app.User = DS.Model.extend({
    FirstName: DS.attr('string'),
    LastName: DS.attr('string'),
    Address: DS.attr('string'),
    PostalCode: DS.attr('number')
});
var inflector = Ember.Inflector.inflector;
inflector.irregular('user', 'user');
inflector.irregular('register', 'register');
app.IndexController = Ember.Controller.extend({
    actions: {
        registerUser: function () {
            var self = this;
            var login = this.get('login');
            var password = this.get('password');
            var confirmPassword = this.get('confirmPassword');
            var firstName = this.get('firstName');
            var lastName = this.get('lastName');
            var address = this.get('address');
            var postalCode = this.get('postalCode');
            if (password === confirmPassword) {
                var post = this.store.createRecord('register', {
                    login: login,
                    password: password
                });
                var pu = this.store.createRecord('user', {
                    FirstName: firstName,
                    LastName: lastName,
                    Address: address,
                    PostalCode: postalCode
                });
                post.set('user', pu);
                post.save().then(function () {
                    window.location.replace("/Pages/Index.html");
                }).catch(function (error) {
                    self.set('statusmessage', "error");
                });
            } else {
                self.set('statusmessage', "The passwords do not match!");
            }
        }
    }
});
app.IndexRoute = Ember.Route.extend({
});
app.RegisterSerializer = DS.JSONSerializer.extend({
    serializeBelongsTo: function (snapshot, json, relationship) {
        var key = relationship.key;
        var belongsTo = snapshot.belongsTo(key);
        key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
        json[key] = Ember.isNone(belongsTo) ? belongsTo : belongsTo.record.toJSON();
    }
});