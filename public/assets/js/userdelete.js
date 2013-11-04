$('.userdel').on('click', function() {
    var id = $(this).attr("id");
    var $row = $(this).parent().parent();

    $.ajax({
        type: "DELETE",
        url: "/users/delete/" + id,
    });

    $row.fadeOut();
});

$('.eventdel').on('click', function() {
	var id = $(this).attr("id");
	var $row = $(this).parent().parent();

	$.ajax({
		type: "DELETE",
		url: "/events/delete/" + id
	});

	$row.fadeOut();
});
