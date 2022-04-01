import {createBooking, updateBooking} from "../services/booking.service";
import {success_} from "../connection/common";

const webhooks = (app) => {
  app.route('/api/webhook/pending')
      .post((req, res) => {
          res.send(" ------ > pending" + req.query.requestId)
      })
      .get(async (req, res) => {
          res.send(" ------ > pending" + req.query.requestId)
          const id =req.query.requestId
          const created = await updateBooking(id, `PENDING`).then(r => {
              return res.status(200).send(success_(`Updated Booking`,created))
          }).catch(r => console.log('Fail' + r))
      })
}
export {
    webhooks
}
