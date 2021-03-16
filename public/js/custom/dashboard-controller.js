$(function () {
    $.LoadingOverlay("show");

    $.ajax({
        url: `/api/dashboard`,
        method: "GET",
        success: function (response) {
            $.LoadingOverlay("hide");

            $("#providersTotalCount").text(response.providersTotalCount)
            $("#clientsTotalCount").text(response.clientsTotalCount)
            $("#activeProvidersCount").text(response.activeProvidersCount)
            $("#inactiveProvidersCount").text(response.inactiveProvidersCount)
            $("#activeClientsCount").text(response.activeClientsCount)
            $("#inactiveClientsCount").text(response.inactiveClientsCount)
            
            $("#transactionsTotalCount").text(response.transactionsTotalCount)
            $("#offerMadeCount").text(response.offerMadeCount)
            $("#offerInplaceCount").text(response.offerInplaceCount)
            $("#offerClosedCount").text(response.offerClosedCount)


            console.log("response ", response)
        },
        error: function (e) {
            console.log("Error ", e);
            $.LoadingOverlay("hide");
          },
    })
});