$("#get-pricing").click(function (e) {
  e.preventDefault();

  let userX = $("#lat").val();
  let userY = $("#lng").val();

  // let newPassword = $("#newPassword").val();
  // let currentPassword = $("#currentPassword").val();
  // let repeatPassword = $("#repeatPassword").val();

  // if (newPassword === repeatPassword) {
  //     $.LoadingOverlay("show");

  $.ajax({
    url: "/api/v1/calc",
    method: "POST",
    data: { userX, userY },
    success: function (response) {
      // $.LoadingOverlay("hide");
      $("#pricing").empty();

      const select = document.getElementById("pricing");

      response.data.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option.id + "$" + option.cost;
        optionElement.text = option.name + " - GHS " + option.cost ;
        select.appendChild(optionElement);
      });
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

// $("#make-payment").click(function (e) {
//   e.preventDefault();

//   let fullName = $("#fullName").val();
//   let phoneNumber = $("#phoneNumber").val();
//   let community = $("#community").val();
//   let toiletType = $("#toiletType").val();
//   let latitude = $("#latitude").val();
//   let longitude = $("#longitude").val();

//   // let newPassword = $("#newPassword").val();
//   // let currentPassword = $("#currentPassword").val();
//   // let repeatPassword = $("#repeatPassword").val();

//   // if (newPassword === repeatPassword) {
//   //     $.LoadingOverlay("show");

//   $.ajax({
//     url: "/api/v1/calc",
//     method: "POST",
//     data: { fullName, phoneNumber, community, toiletType, latitude, longitude },
//     success: function (response) {
//       console.log(response);
//       // $.LoadingOverlay("hide");

//     },
//     error: function (e) {
//       console.log("Error ", e);
//       //  $.LoadingOverlay("hide");
//     },
//   });
//   // } else {
//   //     $.LoadingOverlay("hide");

//   // }
// });

$("#make-payment").on("show.bs.modal", function (e) {
  const id = $(e.relatedTarget).data("id");
  const providerId = $(e.relatedTarget).data("provider");
  const clientId = $(e.relatedTarget).data("client");

  const community = $(e.relatedTarget).data("community");
  const axle = $(e.relatedTarget).data("axle");
  const trips = $(e.relatedTarget).data("trips");
  const status = $(e.relatedTarget).data("status");
  const customerName = $(e.relatedTarget).data("customername");
  const discountedTotalCost = $(e.relatedTarget).data("discountedtotalcost");
  const customerPhoneNumber = $(e.relatedTarget).data("customerphonenumber");

  $("#providerId").val(providerId);
  $("#clientId").val(clientId);
  $("#communityName").val(community);
  $("#axle").val(axle);
  $("#tripsNumber").val(trips);
  $("#currentStatus").val(status);
  $("#id").val(id);
  $("#customerName").val(customerName);
  $("#discountedTotalCost").val("GHS " + discountedTotalCost);
  $("#customerName").val(customerName);
  $("#customerPhoneNumber").val(customerPhoneNumber);

  var part1 = Math.floor(100000 + Math.random() * 900000);
  var part2 = Math.floor(100000 + Math.random() * 900000);
  let paymentId = part1 + "" + part2;
  $("#make-payment-btn").click(function (e) {
    e.preventDefault();
    $.LoadingOverlay("show");

    let url =  `/api/v1/initiate-teller-payment?txId=${id}&paymentId=${paymentId}&amount=${discountedTotalCost.trim()}`

    console.log(url);

    $.ajax({
      url,
      // method: "GET",
      // data: { txId: id, paymentId: part1+""+part2 },
      success: function (response) {
        console.log(response.data.checkout_url);
      window.location.replace(response.data.checkout_url, '_blank');
        $.LoadingOverlay("hide");
      },
      error: function (e) {
        console.log("Error ", e);
        $.LoadingOverlay("hide");
      },
    });

    // $.get(`/api/v1/initiate-teller-payment?txId=${id}&paymentId=${paymentId}`, function(data, status){
    //   alert("Data: " + data + "\nStatus: " + status);
    // });
  });
});
$("#toiletTypeDiv").hide();
$("#waterTypeDiv").hide();

$("#serviceType").change(function (e) {
  console.log(e.target.value);

  let serviceType = e.target.value;
  if(serviceType=="1"){
    $("#waterTypeDiv").hide();
    $("#toiletTypeDiv").show();

  }else if(serviceType=="2"){
      $("#toiletTypeDiv").hide();
      $("#waterTypeDiv").show();

  }else{
    $("#toiletTypeDiv").hide();
    $("#waterTypeDiv").hide();
  }
 
   if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
})

{/* <script>
function myFunction() {
  var x = document.getElementById("myDIV");
 
}
</script> */}