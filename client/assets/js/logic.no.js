$(async function() {
    await append_dates();
    $('.book-now-btn').click(function(e) {
        e.preventDefault();

        let $this = $('.toggle');

        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .inner').removeClass('show');
            $this.parent().parent().find('li .inner').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });
});

const append_dates = async() => {
    const dates = await get_dates(localStorage.getItem('start_date'), localStorage.getItem('end_date')).then(r => {
        return r;
    });
    if (dates.length === 0) {
        $(".availability").remove();
    } else {
        $(".no-dates").remove();
        let template = ``;
        let totalPrice = currency(0);
        dates.forEach((x) => {
            template = `<div class="col-md-2" style="margin: 5px">
                            <div class="card border-success">
                                   <div class="card-body text-success">
                                       ${x.date.toDateString()}
                                        <p class="card-text">${currency(x.price).format()}</p>
                                    </div>
                               </div>
                             </div>
                       </div>
`
            $(".availability").append(template);
            totalPrice = currency(totalPrice).add(x.price)
        });

        const greaterTwo = `
        <div class="col-md-12">
        <h6 class="card-text text-danger"> ${dates.length} dag valgt. Vennligst velg minst 2 dager </h6>
     </div>
        `

        const book_template = `
        <br/>
            <br/>
                <div class="col-md-12">
                   <p class="card-text"> ${dates.length} dager valgt. Vennligst føl skjemaet for å bestille. Total verdi å betale vil være
                   <b class="text-danger">${currency(totalPrice).format()}</b>  </p>
                </div>`

        const payNow = `${currency(totalPrice).format()})`

        if (dates.length > 1) {
            $("#payNow").append(payNow);
            $(".book-now").append(book_template);
            $("#price").val(totalPrice);
        } else {
            $(".no-booking").append(greaterTwo);
            $("#registration").hide();
        }
    }
}

const get_dates = async(startDate, endDate) => {
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    let dates = [],
        currentDate = startDate,
        addDays = function(days) {
            let date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };
    while (currentDate <= endDate) {
        await fetch_my_data(currentDate).then(r => {
            const data = {
                date: currentDate,
                price: r.data
            }
            dates.push(data);
        })
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
}



async function fetch_my_data(dates) {

    async function promised_fetch(date) {

        return new Promise((resolve, reject) => {
            $.ajax({
                url: `/api/rates/${date}`,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    resolve(JSON.parse(JSON.stringify(response)));
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }

    return promised_fetch(dates);
}