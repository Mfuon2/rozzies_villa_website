import {createBooking, listBookings, listSuccessfulBooked} from "../services/booking.service";
import {failure_, success_} from "../connection/common";
import {booking_validation} from "../connection/validation";

const bookingRoute = (app) => {
    app.route('/api/bookings')
        .get(async (req, res) => {
            const list = await listBookings();
            res.status(200).send(success_(`Getting bookings`,list))
        })
        .post((req, res, next) => {
            console.log(req.body)
            const validation = booking_validation(req.body)
            if (!validation)
                return res.status(500).send(failure_(`Validation Error(s)`,booking_validation.errors))
            next()
        }, async (req, res) => {
            console.log('START DATE : ' + req.body.startDate)
            console.log('END DATE  : ' + req.body.endDate)
            let created = await createBooking(req.body);
            created.requestId = process.env.FLW_ACC_K
            if(!created.toString().includes(`Error`)){
                return res.status(200).send(success_(`Booking created`,created))
            }else{
                return res.status(500).send(failure_(`Failed to make the booking`,created))
            }
        })
    app.route('/api/bookings/update')
        .get(async (req, res) => {
            const status = req.query.status
            const paymentTransactionRef = req.query.tx_ref
            const transactionId = req.query.transaction_id
            const bookingId = req.query.bookingId
            if (req.query.status === 'successful') {
                const created = await createBooking({bookingStatus:status, bookingId: bookingId, paymentTransactionRef: paymentTransactionRef, paymentTransactionId: transactionId, isBooked: true})
                console.log(created)
                if (!created.toString().includes(`Error`)) {
                    return res.status(200).send(success_(`Booking created`, created))
                } else {
                    return res.status(500).send(failure_(`Failed to make the booking`, created))
                }
            }
        })
    app.route('/api/bookings/active')
        .get(async (req, res) => {
            const x = JSON.parse(JSON.stringify(await listSuccessfulBooked()))
            let data = []
            x.forEach(r => {
                if(r.bookingStatus === 'successful'){
                    let res = getDatesBetweenDates(new Date(r.startDate), new Date(r.endDate))
                    res.forEach(x => {
                        data.push(x)
                    })
                }
            })
            res.status(200).send(success_(`Booked Dates`,data))
        })
}

const getDatesBetweenDates = (startDate, endDate) => {
    let dates = []
    const theDate = new Date(startDate)
    while (theDate <= endDate) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
    }
    return dates
}

export {
    bookingRoute
}
