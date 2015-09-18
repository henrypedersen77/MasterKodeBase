$(document).ready(function () {
    $.get("/api/login", function (data) {
        //var obj = jQuery.parseJSON(data);
        if (data.login !== "admin") {
            //bruger er ikke admin redirect til Login siden
            window.location.href = "/Pages/Account/Login.html";
        }
    }).fail(function () {
        //Bruger er ikke logget ind, redirect til Login siden
        window.location.href = "/Pages/Account/Login.html";
    });
});