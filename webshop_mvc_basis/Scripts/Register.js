var app = app || {};
app.RegisterModel = Backbone.Model.extend({
    url: '/api/Register',
    defaults: {
        login: '',
        password: '',
        user: {
            FirstName: '',
            LastName: '',
            Address: '',
            PostalCode: 0000
        }
    }
});
app.AppView = Backbone.View.extend({
    el: '#btnRegister',
    events: {
        'click': 'handleClick'
    },
    handleClick: function (e) {
        if ($('#txtPassword').val() === $('#txtConfirmPassword').val()) {
            var data = new app.RegisterModel({
                login: $('#txtUserName').val(),
                password: $('#txtPassword').val(),
                user: {
                    FirstName: $('#txtFirstName').val(),
                    LastName: $('#txtLastName').val(),
                    Address: $('#txtAddress').val(),
                    PostalCode: $('#txtPostalCode').val()
                }
            });
            data.save().done(function (response) {
                window.location("/Pages/Index.html");
            }).fail(function (response) {
                $('#statusmessage').html("Error registering user! " + response);
            });
        } else {
            $('#statusmessage').html("The passwords do not match!");
        }
    }
});
$(function () {
    new app.AppView();
});