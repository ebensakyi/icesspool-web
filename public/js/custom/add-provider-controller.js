$("#details").on("show.bs.modal", function (e) {
  const id = $(e.relatedTarget).data("idd");
  $("#idd").val(id);
  $.LoadingOverlay("show");

  $.ajax({
    url: `/provider/${id}`,
    method: "GET",
    success: function (response) {
      $.LoadingOverlay("hide");
      $("#providerId").val(response.data.Provider.id);

      $("#surname").val(response.data.surname);
      $("#otherNames").val(response.data.otherNames);
      $("#phoneNumber").val(response.data.phoneNumber);
      $("#email").val(response.data.email);

      $("#region").val(response.data.Location.Region.regionName);
      //$("#district").val(response.data.Location.District.districtName);
      $("#community").val(response.data.Location.community);

      $("#companyName").val(response.data.Provider.company);
      $("#officeLocation").val(response.data.Provider.officeLocation);
      $("#ghanaPostGps").val(response.data.Provider.ghanaPostGPS);

      $("#momoNumber").val(response.data.Provider.MomoAccount.momoNumber);

      // $("#driverLicense").val(driverLicense);
      $("#licenseNumber").val(response.data.Provider.licenseNumber);
      // $("#licenseClassification").val(
      //   response.data.Provider.licenseClassification
      // );
      $("#vehicleNumber").val(response.data.Vehicle.vehicleNumber);
      //$("#axleClassification").val(response.data.axleClassification);
      $("#tankCapacity").val(response.data.Vehicle.tankCapacity);
      $("#insuranceNumber").val(response.data.Vehicle.insuranceNumber);
      $("#insuranceExpiry").val(response.data.Vehicle.insuranceExpiry);
      $("#roadWorthy").val(response.data.Vehicle.roadWorthy);
      $("#roadWorthyExpiryDate").val(response.data.Vehicle.roadWorthyExpiry);

      $("#vehicleOwnerName").val(response.data.Vehicle.owner);
      $("#vehicleOwnerPhoneNumber").val(response.data.Vehicle.ownerNumber);

      //Add momo networks to select widget
      // $.each(response.momo, function (i, item) {
      //   $('#momoNetwork').append($('<option>', {
      //     value: item.id,
      //     text: item.network
      //   }));
      // });

      // $.each(response.licenseClasses, function (i, item) {
      //   $('#licenseClassification').append($('<option>', {
      //     value: item.id,
      //     text: item.l_class
      //   }));
      // });

      //$("#momoNetwork").val(response.data.Provider.MomoAccount.MomoNetwork.network);
      $("#momoNetwork")
        .val(response.data.Provider.MomoAccount.MomoNetwork.id)
        .trigger("change");
      $("#axleClassification")
        .val(response.data.Vehicle.AxleClassification.id)
        .trigger("change");
      $("#licenseClassification")
        .val(response.data.Provider.licenseClassification)
        .trigger("change");
      $("#district").val(response.data.Location.District.id).trigger("change");
      $("#region").val(response.data.Location.Region.id).trigger("change");
    },
    error: function (e) {
      console.log("Error ", e);
      // $.LoadingOverlay("hide");
    },
  });
});

$("#submit").click(function (e) {
  e.preventDefault();
 // $.LoadingOverlay("show");

  const id = $("#idd").val();
  const data = {
    id: $("#idd").val(),
    surname: $("#surname").val(),
    otherNames: $("#otherNames").val(),
    email: $("#email").val(),
    phoneNumber: $("#phoneNumber").val(),
    companyName: $("#companyName").val(),
    officeLocation: $("#officeLocation").val(),
    region: $("#region").val(),
    district: $("#district").val(),
    community: $("#community").val(),

    momoNumber: $("#momoNumber").val(),
    momoNetwork: $("#momoNetwork").val(),

    ghanaPostGps: $("#ghanaPostGps").val(),
    driverLicense: $("#driverLicense").val(),
    licenseNumber: $("#licenseNumber").val(),
    licenseClassification: $("#licenseClassification").val(),
    vehicleNumber: $("#vehicleNumber").val(),
    passportPicture: $("#passportPicture").val(),

    axleClassification: $("#axleClassification").val(),
    tankCapacity: $("#tankCapacity").val(),
    insuranceNumber: $("#insuranceNumber").val(),
    insuranceExpiry: $("#insuranceExpiry").val(),
    roadWorthy: $("#roadWorthy").val(),
    roadWorthyExpiryDate: $("#roadWorthyExpiryDate").val(),
    vehicleOwnerName: $("#vehicleOwnerName").val(),
    vehicleOwnerPhoneNumber: $("#vehicleOwnerPhoneNumber").val(),
  };


  $.ajax({
    url: `/api/v1/add-service-provider`,
    method: "POST",
    data: data,
    success: function (data) {
     // $.LoadingOverlay("hide");
      // if (data.statusCode == 1) {
      //   $("#details").modal("toggle");

      //   // swal("Successful!", "Account updated", "success", {
      //   //   timer: 3000,
      //   // });
      // }
    },
    error: function (e) {
      console.log("Error ", e);
     // $.LoadingOverlay("hide");
    },
  });
});
