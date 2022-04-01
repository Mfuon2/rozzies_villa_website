import {User} from "../connection";

const createUpdateUsers = async (body) => {
    try {
        if (body.userId) {
            return await User.findOne({where: {userId: body.userId}})
                .then(async (data) => {
                    if (data) {
                        return await User.update(body, {where: {userId: body.userId}})
                            .then((data) => {
                                return `${data} row(s) of Client has been updated`
                            });
                    }
                })
                .catch((err) => {
                    return err
                })
        }else{
            return await User.create(body)
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


const listUsers = async () => {
    return await User.findAll()
        .then((data) => {
            return data
        })
}


export {
    listUsers,
    createUpdateUsers
}
