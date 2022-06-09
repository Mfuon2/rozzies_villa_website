let lock_button = false;
localStorage.removeItem('start_date')
localStorage.removeItem('end_date')
let checkin = '';
let picker_in
let picker_out
let checkout = '';
let start_date = new Date();
let end_date = new Date();
const checkin_config = {
    position: 'tr',
    customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    maxDate: new Date(2099, 0, 1), // Jan 1st, 2099.
    minDate: new Date(),
    onSelect: instance => {
        const selectedCheckinDates = instance.dateSelected
        updateDates(selectedCheckinDates, instance)
        start_date = new Date(selectedCheckinDates)
    }
}
let checkout_config = {
    position: 'tr',
    customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    maxDate: new Date(2099, 0, 1), // Jan 1st, 2099.
    minDate: new Date(),
    onSelect: instance => {
        const selectedCheckinDates = instance.dateSelected
        let date = new Date(selectedCheckinDates);
        if (new Date(start_date).getDate() !== date.getDate()) {
            date.setDate(date.getDate() - 1);
        }
        end_date = new Date(date)

        const x = new Date(selectedCheckinDates)
        const y = new Date(start_date)
        console.log('start date ' + start_date)
        console.log('end date ' + end_date)
        if (x.getDate() < y.getDate()) {
            lock_button = true
            Swal.fire({
                title: 'Checkout date should be greater than the checkin date',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
            document.getElementById("checkout-btn-r").disabled = true;
            return false;
        } else {
            lock_button = false
            document.getElementById("checkout-btn-r").disabled = false;
        }
    }
}
const updateDates = (selectedDates, instance) => {
    const today = new Date(selectedDates);
    const x = today.setDate(new Date(today).getDate());
}

const showEmptyDialog = (msg) => {
    Swal.fire({
        title: `${msg}`,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

const save_locally = () => {
    const checkinDate = $("#checkin-date").val()
    const checkOutDate = $("#checkout-date").val()
    if (checkinDate === "" || checkinDate === undefined) {
        showEmptyDialog("Innsjekkingsdato er påkrevd")
        return;
    }
    if (checkOutDate === "" || checkOutDate === undefined) {
        showEmptyDialog("Utsjekkingsdato er påkrevd")
        return;
    }
    if (!lock_button) {
        console.log('Save Locally\n Start Date' + start_date + '\n End Date ' + end_date)
        localStorage.setItem('start_date', start_date);
        localStorage.setItem('end_date', end_date);
        return window.location.pathname = "no/check.html";
    } else {
        Swal.fire({
            title: 'Checkout date should be greater than the checkin date',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        document.getElementById("checkout-btn-r").disabled = true;
        return false;
    }
}

async function updateDatesFun() {
    $.ajax({
        method: 'GET',
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        url: `/api/bookings/active`,
        success: function(response) {
            let d = []
            if (response.success) {
                checkin_config.disabledDates = []
                checkout_config.disabledDates = []
                d = response.data
                d.forEach(r => {
                    let date = new Date(r)
                    date.setDate(date.getDate());
                    checkin_config.disabledDates.push(new Date(date))
                    checkout_config.disabledDates.push(new Date(date))
                })
                picker_in = datepicker("#checkin-date", checkin_config)
                picker_out = datepicker("#checkout-date", checkout_config);
            }
        },
        error: function(request, status, error) {
            console.log(`JSON request : ${JSON.stringify(request)}  status :  ${JSON.stringify(status)}  error : ${JSON.stringify(error)}`);
        }
    })
}

var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();

(async function() {
    await updateDatesFun().then(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        if (window.location.href.indexOf('status') !== -1) {
            //
            const Toast = Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Your booking was successful. Thank you for choosing our villa.'
            })
            const status = urlParams.get('status')
            const bookingId = urlParams.get('bookingId')
            const tx_ref = urlParams.get('tx_ref')
            const transaction_id = urlParams.get('transaction_id')
            $.ajax({
                method: 'GET',
                contentType: 'application/json',
                headers: {
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                url: `/api/bookings/update?bookingId=${bookingId}&status=${status}&tx_ref=${tx_ref}&transaction_id=${transaction_id}`,
                success: function(response) {
                    console.log(response)
                    window.location = window.location.href.split("?")[0];
                },
                error: function(request, status, error) {
                    console.log(`JSON request : ${JSON.stringify(request)}  status :  ${JSON.stringify(status)}  error : ${JSON.stringify(error)}`);
                }
            })
        }
        const s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/61f3dc799bd1f31184d9cb40/1fqg9af12';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    });
})();