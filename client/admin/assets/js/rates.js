$.fn.dataTable.ext.buttons.alert = {
    className: 'bg-gradient-success shadow-success text-white text-center border-radius-sm',
    action: function (e, dt, node, config) {
         Swal.fire({
            html:
            '<input name="description" id="description" class="swal2-input" type="text" placeholder="Description">' +
                '<input name="rate" id="rate" class="swal2-input" type="number" placeholder="Rate">'

            ,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    description:  document.getElementById('description').value,
                    rate: document.getElementById('rate').value
                }
            }
        }).then((result) => {
            if(!result.value.description.length > 0 || !result.value.rate.length > 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Validation Error => ' + JSON.stringify('Description and Rate is required')
                })
                return 'Description is required'
            }else{
                let data = {
                    description: result.value.description,
                    rate: parseInt(result.value.rate),
                    isSelected:true
                }
                console.log( '====== > ' + data)
                console.log(JSON.stringify(data))
                $.ajax({
                    url: "/api/rates",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    success: function (result) {
                        const x = JSON.stringify(result)
                        dt.ajax.reload();
                        Swal.fire({
                            icon: 'success',
                            text: 'Message : ' + x.data[0].message
                        })
                    },
                    error: function (err) {
                        console.log(JSON.stringify(err))
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Validation Error => ' + JSON.stringify(err)
                        })
                    }
                });
            }

        })
    }
};

$(document).ready(function () {

    // datatable
    let table = $('#bookings').DataTable({
        "ajax": "/api/rates",
        "order": [ [ 2, 'desc' ]],
        "columns": [
            {"data": "rateId", "visible": false},
            {"data": "description"},
            {"data": "rate"},
            {"data": "createdAt"},
            {
                "data": null,
                "defaultContent": "<button class='bg-gradient-success btn-sm shadow-success text-white text-center border-radius-sm'>Activate</button>"
            }
    ] ,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'alert',
                text: 'Add'
            }
        ]
    });

    // make booking
    $('#bookings tbody').on( 'click', 'button', function () {
        let data = table.row( $(this).parents('tr') ).data();
        let reqData = {
            description: data.description,
            rate: parseInt(data.rate),
            isSelected:true,
            rateId: data.rateId
        }
        $.ajax({
            url: "/api/rates",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(reqData),
            success: function (result) {
                const x = JSON.stringify(result)
                if(x.success){
                    Swal.fire({
                        icon: 'success',
                        title: 'Oops...',
                        text: 'Validation Error => ' + JSON.stringify(x.success)
                    })
                }
                table.ajax.reload();
            },
            error: function (err) {
                console.log(JSON.stringify(err))
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Validation Error => ' + JSON.stringify(err)
                })
            }
        });
    } );
});
