Register_application = Ember.Application.create({
});

Register_application.IndexController= Ember.Controller.extend({
    statusmessage: 'Ok',
    UserName: '',
    Password: '',
    ConfirmPassword: '',
    FirstName: '',
    LastName: '',
    Address: '',
    PostalCode: '',

    actions:{
        submit: function () {
            return Em.$.ajax('/api/register', {
                    "type": 'POST', // HTTP method
                    "dataType": 'JSON', // type of data expected from the API response
                    "data": { // Begin data payload

                        "login": this.UserName,
                        "password": this.Password,
                        "user": {
                            "FirstName": this.FirstName,
                            "LastName": this.LastName,
                            "Address": this.Address,
                            "PostalCode": this.PostalCode
                        },
                    }, // End data payload
                    "success": function (data, textStatus, jqXHR) {
                        window.location.replace('../Index.html');
                    },
                    "error": function (jqXHR, textStatus, errorThrown) {
                        this.statusmessage = 'Error creating user';

                        window.console.log(jqXHR);
                    }
                });
        }
    }
});

Register_application.User = Ember.Object.extend({
});

Register_application.User.reopenClass({
    save: function () {
        return $.getJSON("/api/product").then(function (response) {
            var items = [];

            return items;
        });
    }
});

