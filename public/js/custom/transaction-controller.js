$("#provider-details").on("show.bs.modal", function(e) {
    const id = $(e.relatedTarget).data("id");
    $("#id").val(id);

    $.ajax({
        url: `/transaction/provider/${id}`,
        method: "GET",
        success: function(response) {
            // $.LoadingOverlay("hide");
            $("#surname").val(response.data.User.surname);
            $("#otherNames").val(response.data.User.otherNames);
            $("#phoneNumber").val(response.data.User.phoneNumber);
            $("#email").val(response.data.User.email);
            $("#companyName").val(response.data.company);
            $("#officeLocation").val(response.data.officeLocation);
            $("#ghanaPostGps").val(response.data.ghanaPostGPS);
        },
        error: function(e) {
            console.log("Error ", e);
            // $.LoadingOverlay("hide");
        },
    });
});

$("#client-details").on("show.bs.modal", function(e) {
    const id = $(e.relatedTarget).data("id");
    $("#id").val(id);

    $.ajax({
        url: `/transaction/client/${id}`,
        method: "GET",
        success: function(response) {
            console.log(response);
            // $.LoadingOverlay("hide");
            $("#surname1").val(response.data.User.surname);
            $("#otherNames1").val(response.data.User.otherNames);
            $("#phoneNumber1").val(response.data.User.phoneNumber);
            $("#email1").val(response.data.User.email);
        },
        error: function(e) {
            console.log("Error ", e);
            // $.LoadingOverlay("hide");
        },
    });
});

$("#tx-statuses").on("show.bs.modal", function(e) {
    const id = $(e.relatedTarget).data("id");
    $("#id").val(id);

    $.ajax({
        url: `/transaction/status/${id}`,
        method: "GET",
        success: function(response) {
            console.log(response);

            const data = response.data;
            $("#statusTable tr").remove();
            for (let i = 0; i < data.length; i++) {
                addToTableFunction(
                    data[i].id,
                    data[i].Status.state,
                    getDate(data[i].createdAt),
                    getTime(data[i].createdAt)
                );
            }
            // $.LoadingOverlay("hide");
        
        },
        error: function(e) {
            console.log("Error ", e);
            // $.LoadingOverlay("hide");
        },
    });
});

$("#tx-details").on("show.bs.modal", function(e) {
    const id = $(e.relatedTarget).data("id");
    const providerId = $(e.relatedTarget).data("provider");
    const clientId = $(e.relatedTarget).data("client");
    const district = $(e.relatedTarget).data("district");
    const community = $(e.relatedTarget).data("community");
    const location = $(e.relatedTarget).data("location");
    const axle = $(e.relatedTarget).data("axle");
    const trips = $(e.relatedTarget).data("trips");
    const status = $(e.relatedTarget).data("status");

    $("#providerId").val(providerId);
    $("#clientId").val(clientId);
    $("#district").val(district);
    $("#community").val(community);
    $("#location").val(location);
    $("#axle").val(axle);
    $("#trips").val(trips);
    $("#currentStatus").val(status);
    $("#id").val(id);

    $("#close-tx").click(function(e) {
        e.preventDefault();
        $.LoadingOverlay("show");

        $.ajax({
            url: "/transaction/manual-close",
            method: "POST",
            data: { transactionId: id, providerId: providerId, txStatusCode: 4 },
            success: function(response) {
                window.location.replace("/transaction");
                $.LoadingOverlay("hide");
            },
            error: function(e) {
                //console.log("Error ", e);
                $.LoadingOverlay("hide");
            },
        });
    });
});

function addToTableFunction(id, status, date, time) {
   // $("#statusTable tr").remove();

    $("#statusTable")
        .find("tbody")
        .append(
            "<tr>" +
            "<td hidden>" +
            id +
            "</td>" +
            "<td>" +
            status +
            "</td>" +
            "<td>" +
            date +
            "</td>" +
            "<td>" +
            time +
            "</td>" +
            "</tr>"
        );
}

function getDate(dateTimeString) {
    return dateTimeString.split("T")[0];
}

function getTime(dateTimeString) {
    let time = dateTimeString.split("T")[1];
    return time.slice(0, 5);
}