const merchantURL = "http://localhost:3000/api/encrypt";

const ranNumber = Math.floor((Math.random() * 88008800));
const startDate = localStorage.getItem('start_date')
const endDate = localStorage.getItem('end_date')
let customerName = ''
let phoneNumber = ''
let email = ''
let amount = 0
let data = {}
let bookingData = {}

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const requestId = 'RV' + ranNumber
const createBooking = async() => {
    amount = parseFloat($('#price').val());
    console.log('Start Date : ' + startDate)
    console.log('End Date : ' + endDate)
    bookingData = {
        startDate: startDate,
        endDate: endDate,
        phoneNumber: `${$('#phoneNumber').val()}`,
        identityId: `${$('#identityId').val()}`,
        accountNumber: 'AC-' + Math.random().toString(36).substring(2, 15).toUpperCase(),
        gender: getGender(),
        clientName: `${$('#firstName').val()} ${$('#lastName').val()}`,
        requestId: requestId,
        amount: amount,
        email: $('#emailAddress').val()
    }

    Swal.fire({
        title: 'Bekræfte',
        text: "Følgende oplysninger vil blive brugt til reservationen. Fortsæt til betaling?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ja'
    }).then((result) => {
        if (result.isConfirmed) {
            const host = `${window.location.protocol}//${window.location.hostname + (window.location.port ? ':' + window.location.port : '')}`;
            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(bookingData),
                headers: {
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                url: '/api/bookings',
                success: function(response) {

                    Swal.fire({
                        html: 'Opdaterer din anmodning...',
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                        }
                    }).then(() => {
                        FlutterwaveCheckout({
                            public_key: 'FLWPUBK-dab570bafec0007a426361ecb7acbba0-X',
                            tx_ref: `TxID${ranNumber}`,
                            amount: amount,
                            currency: "USD",
                            country: "KE",
                            payment_options: "",
                            redirect_url: `${host}/?bookingId=` + response.data.bookingId,
                            meta: {
                                consumer_id: 230020 + ranNumber,
                                consumer_mac: "92a3-912ba-1192a-" + ranNumber,
                            },
                            customer: {
                                email: email,
                                phone_number: phoneNumber,
                                name: customerName,
                            },
                            callback: function(datas) {
                                console.log(datas);
                            },
                            customizations: {
                                title: "Rozzies' Villa",
                                description: "Payment being made for Rozzie Villa bookings",
                                logo: "https://pic8.co/sh/fnEX0Q.png",
                            },
                        })
                    })

                },
                error: function(request, status, error) {
                    console.log(`JSON request : ${JSON.stringify(request)}  status :  ${JSON.stringify(status)}  error : ${JSON.stringify(error)}`);
                }
            })
        }
    })
}

const getGender = () => {
    const ele = document.getElementsByName('gender');
    let results = ''
    for (let i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            results = ele[i].value;
    }
    return results
}

const loadCheckoutPage = () => {
    createBooking().then(r => console.log('Booking oprettet'))
}


const makePayment = () => {
    let errors = []
    const warning = $("#error-warning")
    warning.html("")
    warning.hide()
    customerName = `${$('#firstName').val()} ${$('#lastName').val()}`
    phoneNumber = `${$('#phoneNumber').val()}`
    email = `${$('#emailAddress').val()}`
    let identityId = `${$('#identityId').val()}`
    console.log(customerName)
    if (customerName.length < 5) {
        errors.push('Kundens navn er påkrævet')
    }
    if (phoneNumber.length < 10) {
        errors.push('Telefonnummer er påkrævet')
    }
    if (email.length < 10 && !validEmail(email)) {
        errors.push('E-mail er påkrævet eller ugyldig')
    }

    if (identityId.length < 7) {
        errors.push('Identitet er påkrævet er påkrævet eller ugyldig')
    }
    if (errors.length) {
        warning.show()
        errors.forEach(r => {
            warning.append('<li>' + r + '</li>');
        })
    } else {

        rates()
    }
}

function validEmail(email) {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
}

const rates = () => {
    loadCheckoutPage()
}