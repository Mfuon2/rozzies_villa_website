import {Inquiry} from "../connection";
import {UuidGenerator} from "../models/booking";


const createUpdateInquiry = async (body) => {
    try {
        if (body.inquiryId) {
            return await Inquiry.findOne({where: {inquiryId: body.inquiryId}})
                .then(async (data) => {
                    if (data) {
                        return await Inquiry.update(body, {where: {inquiryId: body.inquiryId}})
                            .then((data) => {
                                return `${data} row(s) of Client has been updated`
                            });
                    }
                })
                .catch((err) => {
                    return err
                })
        }else{
            body.inquiryId = new UuidGenerator().generateUuid()
            return await Inquiry.create(body)
                .then((data) => {
                    return data
                })
                .catch((err) => {
                    return err
                });
        }
    } catch (e) {
        return e.errors
    }
}


const listInquiry = async () => {
    return await Inquiry.findAll({ order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['createdAt', 'DESC']]})
        .then((data) => {
            return data
        })
}


export {
    listInquiry,
    createUpdateInquiry
}
