let rates;
const listRates = async () => {
        $.ajax({
            url: "/api/rates/selected",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                const x = JSON.stringify(result)
                if (result.success) {
                    rates = result.data
                    loadCalendar(rates);
                }
            },
            error: function (err) {
                console.log(JSON.stringify(err))
                return err;
            }
        });
    }
    (async function () {
        await listRates();
    })();

const saveRate = async (rate) => {
    $.ajax({
        url: "/api/rates",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(rate),
        success: function (result) {
            const x = JSON.stringify(result)
            if (x.success) {
                console.log(x)
            }
        },
        error: function (err) {
            console.log(JSON.stringify(err))
        }
    });
}

const loadCalendar = (rates) => {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: function (info) {
            var event = calendar.getEventById(info.dateStr);
            if (event) {
                event.remove();
            }
            popDialog(this, info)
        }
    });
    calendar.render();
    rates.forEach((rate) => {
        calendar.addEvent({
            id: rate.rateId,
            title: `Price : $${rate.rate}`,
            start: rate.rateId,
            allDay: true
        })
    })
}

const popDialog = (event, info) => {
    Swal.fire({
        html: '<input name="description" id="description" required class="swal2-input" type="number" placeholder="Rate value">',
        focusConfirm: false,
        preConfirm: () => {
            return {
                description: document.getElementById('description').value
            }
        }
    }).then((result) => {
        if (!result.value.description.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Validation Error => ' + JSON.stringify('Description is required')
            })
            return 'Description is required'
        } else {
            event.addEvent({
                id: info.dateStr,
                title: 'Price : ' + result.value.description,
                editable: true,
                start: info.dateStr,
                allDay: true
            });

            const rate = {
                rateId: info.dateStr,
                description: info.dateStr,
                rate: parseFloat(result.value.description)
            }
            saveRate(rate).then(async (r) => {
                console.log("saved rate")
            })
        }

    })
}