$('.close').on('click', function() {
    var id = $(this).attr("id");
    var $row = $(this).parent().parent();

    $.ajax({
        type: "DELETE",
        url: "/users/delete/" + id,
    });

    $row.fadeOut();
});
