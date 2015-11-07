var app = app || {};

app.RegisterModel = Backbone.Model.extend({
    url: '/api/register',
    default: {
        login: '',
        password: '',
        user: {
            FirstName: '',
            LastName: '',
            Address: '',
            PostalCode: ''
        },
    },
})

app.RegisterView = Backbone.View.extend({
    el: '#content',
    template: _.template($('#register-tmpl').html()),

    initialize: function () {
        this.render();
    },
    events: {
        "click .button": "RegisterButtonHandler",
    },
    RegisterButtonHandler: function (event) {
        var self = this;
        register.save({
            login:  Login.value,
            password: Password.value,
            user: {
                FirstName: FirstName.value,
                LastName: LastName.value,
                Address: Address.value,
                PostalCode: PostalCode.value
            }},
            {
                wait: true,
                success: function (model, response) {
                 window.location.replace('../Index.html');

            },
            error: function(model, error) {
                $('#statusmessage').html(error.statusText);
            }
        });
    },
    render: function () {
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;    
    },
});

var register = new app.RegisterModel();

$(function () { 
    new app.RegisterView({ model: register });
});
