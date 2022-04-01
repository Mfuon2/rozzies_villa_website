import {createRate, listRates, selectedRate, selectedRateForTheDay} from "../services/rate.service";
import {rate_validation} from "../connection/validation";
import {failure_, success_} from "../connection/common";
import moment from 'moment';

const rateRoutes = (app) => {
    app.route('/api/rates')
        .post((req, res, next) => {
            console.log(req.body)
            const validation = rate_validation(req.body)
            if (!validation)
                return res.status(500).send(failure_(`Validation Error(s)`,rate_validation.errors))
            next()
        }, async (req, res) => {
            const created = await createRate(req.body)
            console.log(created);
            if(!created.toString().includes(`Error`)){
                return res.status(200).send(success_(`Rate Created`,created))
            }else{
                return res.status(500).send(failure_(`Failed creating rate`,created))
            }
        })
        .get(async (req, res) => {
            const rates = await listRates()
            res.status(200).send(success_(`Retrieved rates`,rates))
        })
    app.route('/api/rates/selected').get(async (req, res) => {
        const selected = await listRates(req.body)
        res.status(200).send(success_(`Selected Rate`, selected))
    })
    app.route('/api/rates/:dates').get(async (req, res) => {
        const thisDate = req.params.dates
        const format2 = "YYYY-MM-DD"
        let date2 = new Date(thisDate);
        let dateTime2 = moment(date2).format(format2);
        
        console.log( " Selected Date : " + dateTime2)
        const selected = await selectedRateForTheDay(dateTime2)
        console.log( " Selected Rate : " + selected)
        const value = selected[0]
        if(selected !== null && selected !== undefined && (value !== undefined || value !== '')){
            res.status(200).send(success_(`Selected Rate`, selected[0].rate))
        }else{
            res.status(200).send(success_(`Selected Rate`, 52000))
        }
    })
}
export {
    rateRoutes
}
