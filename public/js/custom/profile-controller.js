$("#save").click(function (e) {
    //e.preventDefault()
    let newPassword = $("#newPassword").val();
    let currentPassword = $("#currentPassword").val();
    let repeatPassword = $("#repeatPassword").val();

    if (newPassword === repeatPassword) {
        $.LoadingOverlay("show");

        $.ajax({
            url: '/profile',
            method: "POST",
            data: { currentPassword, newPassword },
            success: function (response) {
                $.LoadingOverlay("hide");

            },
            error: function (e) {
                console.log("Error ", e);
                 $.LoadingOverlay("hide");
            },
        });
    } else {
        $.LoadingOverlay("hide");

    }

});

