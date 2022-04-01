import {createRate, listRates, selectedRate} from "../services/rate.service";
import {rate_validation} from "../connection/validation";
import {failure_, success_} from "../connection/common";
import {createUpdateInquiry, listInquiry} from "../services/inquiry.service";

const inquiryRoutes = (app) => {
    app.route('/api/inquiry')
        .post((req, res, next) => {
            console.log(req.body)
            next()
        }, async (req, res) => {
            const created = await createUpdateInquiry(req.body)
            if(!created.toString().includes(`Error`)){
                return res.status(200).send(success_(`Inquiry Created`,created))
            }else{
                return res.status(500).send(failure_(`Failed creating inquiry`,created))
            }
        })
        .get(async (req, res) => {
            const rates = await listInquiry()
            res.status(200).send(success_(`Retrieved inquiries`,rates))
        })
}
export {
    inquiryRoutes
}
