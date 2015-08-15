$(document).ready(function () {
    $.get("/Pages/Template.html", function (data) {
        $("#header").html(data);
    });
    //Spørger om en bruger er logget ind
    $.get("/api/login", function (data) {
        console.log("Brugeren er logget ind");
        $.get("/Pages/TemplateLogout.html", function (data) {
            $("#loginlogout").html(data);
        })
    }).fail(function () {
        console.log("Bruger er ikke logget ind");
        $.get("/Pages/TemplateLogin.html", function (data) {
            $("#loginlogout").html(data);
        })
    });
});

function logout() {
    $.ajax({
        url: '/api/login',
        type: 'DELETE',
        success: function (result) {
            console.log("Brugeren logger af");
            $.get("/Pages/TemplateLogin.html", function (data) {
                $("#loginlogout").html(data);
            });
            window.location.href = "/Pages/Index.html";
        }
    });
};