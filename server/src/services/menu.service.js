import {Booking, Menu, Rate} from "../connection";

const createUpdateMenu = async (body) => {
    try {
        if (body.menuId) {
            return await Menu.findOne({where: {menuId: body.menuId}})
                .then(async (data) => {
                    if (data) {
                        return await Menu.update(body, {where: {menuId: body.menuId}})
                            .then((data) => {
                                return `${data} row(s) of Menu has been updated`
                            });
                    }
                })
                .catch((err) => {
                    return err
                })
        }else{
            return await Menu.create(body)
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

const listMenus = async () => {
    return await Menu.findAll()
        .then((data) => {
            return data
        })
}

const listDeletedMenus = async () => {
    return await Booking.findAll({where: {isDeleted: true}})
        .then((data) => {
            return data
        })
}

export {
    listDeletedMenus,
    listMenus,
    createUpdateMenu
}
