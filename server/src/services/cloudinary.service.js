import * as dotenv from "dotenv";
import cloudinary from "cloudinary";
import multer from "multer";
import {saveImage} from "./image.service";

dotenv.config();

let title = ''
let description = ''

const save_image_od_db = async (req, path) => {
    const im = {
        path: path,
        category: req.query.category,
        title: req.query.title,
        description: req.query.description
    }
    const image = await saveImage(im)
    console.log( ' =============== > ' + image.imageId)
    return image.imageId
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.query.category)
        console.log(req.query.title)
        console.log(req.query.description)
        let path = '../client/assets/img/gallery/'+ req.query.category
        cb(null, path)
    },
    filename: async function (req, file, cb) {
        let path = 'assets/img/gallery/'+ req.query.category
        const id = await save_image_od_db(req, path)
        const ext = file.mimetype.split('/')[1]
        cb(null, `${id}.png`)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb({
            message: 'Unsupported file format'
        }, false)
    }
}

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 1024
    },
    fileFilter: fileFilter
})
