var app = app || {};

app.LoginModel = Backbone.Model.extend({
    url: '/api/login',
    default: {
        login: '',
        password: '',
    },
})

app.LoginView = Backbone.View.extend({
    el: '#content',
    template: _.template($('#login-tmpl').html()),

    initialize: function () {
        this.render();
    },
    events: {
        "click .button": "LoginButtonHandler",
    },
    LoginButtonHandler: function (event) {
        var self = this;
        login.save({
            login: txtUserName.value,
            password: txtPassword.value,
        },
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

var login = new app.LoginModel();

$(function () { 
    new app.LoginView({ model: login});
});
