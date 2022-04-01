import {Image} from "../connection";
import {UuidGenerator} from "../models/booking";

const saveImage = async (body) => {
    try {
            //console.log(' =======> ' + JSON.stringify(body))
            return await Image.create(body)
                .then((data) => {
                    return data
                })
                .catch((err) => {
                    return err.errors
                });
    } catch (e) {
        return e.errors
    }
}

const listImages = async (category) => {
    return await Image.findAll({where: {category: category}})
        .then((data) => {
            return data
        })
}

const deleteImage = async (imageId) => {
    return await Image.destroy({where: {imageId: imageId}})
        .then( (data) => {
            return data
        })
}

export {
    listImages,
    saveImage,
    deleteImage
}
