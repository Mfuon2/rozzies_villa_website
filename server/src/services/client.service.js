import {Booking, Menu, Rate, Client} from "../connection";
import {UuidGenerator} from "../models/booking";

const createUpdateClient = async (body) => {
    try {
        if (body.clientId) {
            return await Client.findOne({where: {clientId: body.clientId}})
                .then(async (data) => {
                    if (data) {
                        return await Client.update(body, {where: {clientId: body.clientId}})
                            .then((data) => {
                                return `${data} row(s) of Client has been updated`
                            });
                    }
                })
                .catch((err) => {
                    return err
                })
        }else{
            return await Client.findOne({where: {email: body.email, identityId:body.identityId}})
                .then(async (data) => {
                    if (data) {
                        return await Client.update(body, {where: {email: body.email}})
                            .then((data) => {
                                return `${data} row(s) of Client has been updated`
                            });
                    }else {
                        body.clientId = new UuidGenerator().generateUuid()
                        return await Client.create(body)
                            .then((data) => {
                                return data
                            })
                            .catch((err) => {
                                return err
                            });
                    }
                })
                .catch((err) => {
                    return err
                })
        }
    } catch (e) {
        return e.errors
    }
}
const listClients = async () => {
    return await Client.findAll()
        .then((data) => {
            return data
        })
}
export {
    listClients,
    createUpdateClient
}
