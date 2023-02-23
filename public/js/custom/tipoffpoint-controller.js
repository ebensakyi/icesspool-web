function addToTableFunction(id, siteName, location, address, status) {
    $("#table")
        .find('tbody')
        .append(
            "<tr>" +
            "<td hidden>" + id + "</td>" +
            "<td>" + siteName + "</td>" +
            "<td>" + location + "</td>" +
            "<td>" + address + "</td>" +


            "<td>" + status + "</td>" +

            "<td>" + 
            "<button data-toggle='tooltip' data-placement='top' title='Delete account'  type='button' class='btn btn-danger btn-icon'onclick='deleteById(this)'><i data-feather='delete'></i>D </button>  </td>" +"</tr>"
        );
}
function saveTipoffPoint() {
    addLoading()
    if ($('#siteName').val() == '' || $('#placeId').val() == '' || $('#address').val() == ''
        || $('#location').val() == '' || $('#latitude').val() == '' || $('#longitude').val() == ''
    ) {

        // swal("Not successful!", "All fields are mandatory ", "warning", {
        //     timer: 3000
        // });
    }
    let siteName = $('#siteName').val()
    let placeId = $('#placeId').val()
    let address = $('#address').val()

    let location = $('#location').val()
    let latitude = $('#latitude').val()
    let longitude = $('#longitude').val()


    const formData = {
        siteName: siteName,
        placeId: placeId,
        address: address,
        location: location,
        latitude: latitude,
        longitude: longitude,
    };

    $.ajax({
        url: '/tipoffpoints',
        method: 'POST',
        data: formData,
        success: function (response) {
            console.log(response)
            addToTableFunction(response.data.id, response.data.siteName, response.data.location, response.data.address, response.data.active);
            // if (data.status == 1) {
            //     window.location.replace("/admin/grade");
            // }
            // clearForm()
            //$.LoadingOverlay("hide");

        },
        error: function (e) {
            console.log('Error ', e)
            //$.LoadingOverlay("hide");
        }

    })
}

function removeFromTable(e) {
    var id = e.parentNode.parentNode.rowIndex;
    $("#table tr:eq(" + id + ")").remove();

}


function deleteById(e) {
    deleteLoading()

    var rowIndex = e.parentNode.parentNode.rowIndex;
    var id = document.getElementById('table').rows[rowIndex].cells[0].outerText;

    const data = {
        id: id
    }
    $.ajax({
        url: '/tipoffpoints',
        method: 'DELETE',
        data: data,
        success: function (data) {
            
            removeFromTable(e)
            //$.LoadingOverlay("hide");

        },
        error: function (e) {
            console.log('Error ', e)
            //$.LoadingOverlay("hide");
        }

    })
}

function clearForm() {
    // $('#institutionName').val('')
    // $('#institutionPeriod').val('')
    // $('#institutionCert').val('')
    // $('#classObtained').val('')


}


function addLoading() {
    // $.LoadingOverlay("show", {
    //     background: "rgba(169, 244, 184, 0.81)"
    // });
}

function deleteLoading() {
    // $.LoadingOverlay("show", {
    //     background: "rgba(238, 104, 108, 0.72)"
    // });
}
function initLoading() {
    // $.LoadingOverlay("show", {
    //     background: "rgba(111, 185, 231, 0.72)"
    // });
}
function getData() {
    initLoading()
    $.ajax({
        url: '/tipoffpoints/data',
        method: 'GET',
        data: "",
        success: function (response) {
            console.log(".......", response.data.length)
            console.log(".......", response.data[0])

            for (var i = 0; i < response.data.length; i++) {
                addToTableFunction(response.data[i].id, response.data[i].siteName, response.data[i].location, response.data[i].address, response.data[i].active);
                //$.LoadingOverlay("hide");

            }
        },
        error: function (e) {
            console.log('Error ', e)
            //$.LoadingOverlay("hide");
        }

    })
}

$(function () {
    getData()
})

