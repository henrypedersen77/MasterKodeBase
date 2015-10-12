var app = app || {};

app.RegisterModel = Backbone.Model.extend({
    url: '/api/Login',
    defaults: {
        login: '',
        password: ''
    }
});

app.AppView = Backbone.View.extend({
    el: '#btnLogin',
    events: { 'click': 'handleClick' },
    handleClick: function (e) {
        var data = new app.RegisterModel({
            login: $('#txtUserName').val(),
            password: $('#txtPassword').val(),
        });

        data.save().done(function (response) {
            //redirect til index siden
            window.location("/Pages/Index.html");
        }).fail(function (response) {
            $('#statusmessage').html("Invalid login!");
        });
    }
});

$(function () {
    new app.AppView();
});