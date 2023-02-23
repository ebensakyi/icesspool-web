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
      console.log(response);
      // $.LoadingOverlay("hide");

      const select = document.getElementById("pricing");

      response.data.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option.cost;
        optionElement.text = option.name + " - GHS " + option.cost;
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

// $("#send-request").click(function (e) {
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
