Register_application = Ember.Application.create({
});

Register_application.IndexController= Ember.Controller.extend({
    statusmessage: 'Ok',
    UserName: '',
    Password: '',

    actions:{
        submit: function () {
            var test = this.UserName;
            return Em.$.ajax('/api/login', {
                    "type": 'POST', // HTTP method
                    "dataType": 'JSON', // type of data expected from the API response
                    "data": { // Begin data payload

                        "login": this.UserName,
                        "password": this.Password,
                    }, // End data payload
                    "success": function (data, textStatus, jqXHR) {
                        window.location.replace('../Index.html');
                    },
                    "error": function (jqXHR, textStatus, errorThrown) {
                        this.statusmessage = 'Error Login';

                        window.console.log(jqXHR);
                    }
                });
        }
    }
});
