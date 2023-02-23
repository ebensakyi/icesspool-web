$("#get-pricing").click(function (e) {
    e.preventDefault()


    let userX  = $("#lat").val();
    let userY  = $("#lng").val();

    // let newPassword = $("#newPassword").val();
    // let currentPassword = $("#currentPassword").val();
    // let repeatPassword = $("#repeatPassword").val();

    // if (newPassword === repeatPassword) {
    //     $.LoadingOverlay("show");

        $.ajax({
            url: '/api/v1/calc',
            method: "POST",
            data: { userX, userY },
            success: function (response) {
                console.log(response);
               // $.LoadingOverlay("hide");

            },
            error: function (e) {
                console.log("Error ", e);
               //  $.LoadingOverlay("hide");
            },
        });
    // } else {
    //     $.LoadingOverlay("hide");

    // }

});
