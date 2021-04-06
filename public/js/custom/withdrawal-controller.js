$("#details").on("show.bs.modal", function (e) {
  const id = $(e.relatedTarget).data("id");
  const provider_id = $(e.relatedTarget).data("provider_id");
  const provider = $(e.relatedTarget).data("provider");
  const company = $(e.relatedTarget).data("company");
  const phone = $(e.relatedTarget).data("phone");
  const network = $(e.relatedTarget).data("network");
  const amount = $(e.relatedTarget).data("amount");
  const balance = $(e.relatedTarget).data("balance");

  $("#id").val(id);
  $("#provider_id").val(provider_id);
  $("#provider").val(provider);
  $("#company").val(company);
  $("#phone").val(phone);
  $("#network").val(network);
  $("#amount").val(amount);
  $("#balance").val(balance);



  $("#submit").click(function (e) {
    e.preventDefault();
    //const id = $("#id").val();
    const data = {
      id,
      provider_id: $("#provider_id").val(),
    };

    //console.log(data)
    $.LoadingOverlay("show");
    $.ajax({
      url: '/approve-withdrawal',
      method: "post",
      data: data,
      success: function (data) {
        $.LoadingOverlay("hide");
        console.log(data);
        if (data.statusCode == 1) {
          $("#details").modal("toggle");
          console.log(data.message);

          // swal("Successful!", "Payment made successfully", "success", {
          //   timer: 3000,
          // });

          window.location.replace("/withdrawal-requests")

        }else{
          console.log(data.message);

        }
      },
      error: function (e) {
        console.log("Error ", e);
        $.LoadingOverlay("hide");
      },
    });
  });
});