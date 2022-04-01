import {createRate, listRates, selectedRate} from "../services/rate.service";
import {rate_validation} from "../connection/validation";
import {failure_, success_} from "../connection/common";
import {listImages, saveImage, deleteImage} from "../services/image.service";

const imagesRoute = (app) => {
    app.route('/api/images')
        .post((req, res, next) => {
            console.log(req.body)
            next()
        }, async (req, res) => {
            const created = await saveImage(req.body)
            if(!created.toString().includes(`Error`)){
                return res.status(200).send(success_(`Image uploaded`,created))
            }else{
                return res.status(500).send(failure_(`Failed creating image`,created))
            }
        })
        .get(async (req, res) => {
            const rates = await listImages(req.query.category)
            res.status(200).send(success_(`Retrieved images`,rates))
        })
    app.route('/api/images/image')
        .get(async (req, res) => {
        const selected = await selectedRate(req.body)
        res.status(200).send(success_(`Selected image`, selected))
    })
    app.route('/api/images/delete/image')
        .post((req, res) => {
            deleteImage(req.body.imageId).then(r => {
                res.status(200).send(success_(`Deleted Image`,true))
            })
        })
}
export {
    imagesRoute
}
