$(document).ready(function () {
    $.get("/Pages/Template.html", function (data) {
        $("#header").html(data);
    });
});