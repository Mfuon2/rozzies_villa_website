import {Image} from "../connection";

const saveImage = async (body) => {
    try {
            console.log(' =======> ' + JSON.stringify(body))
        return await Image.create(body)
                 .then(async (data) => {
                     console.log('msg : ' + JSON.stringify(data))
                     const t = await Image.update({path: data.path + `/${data.imageId}.png`},{where:{imageId:data.imageId}})
                     return data
                 })
                 .catch((err) => {
                     console.log('msg : ' + JSON.stringify(err.errors))
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
