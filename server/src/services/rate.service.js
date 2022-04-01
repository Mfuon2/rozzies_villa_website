import {Rate} from "../connection";
import {UuidGenerator} from "../models/booking";
import {Op} from "sequelize";

const createRate = async (body) => {

    try {
        if (body.rateId) {
            return await Rate.findOne({where: {rateId: body.rateId}})
                .then(async (data) => {
                    if (data) {
                        return  Rate.update(body, {where: {rateId: body.rateId}})
                            .then((r) => {
                                return `${r} row(s) has been updated`
                            });
                    }else{
                        return Rate.create(body)
                        .then((newData) => {
                            console.log(newData)
                            return newData
                        })
                        .catch((err) => {
                            return err.errors
                        });
                    }
                })
                .catch((err) => {
                    return err.errors
                })
        }

    } catch (e) {
        return e.errors
    }
}

const listRates = async () => {
    return  Rate.findAll({ order: [
            // Will escape title and validate DESC against a list of valid direction parameters
            ['createdAt', 'DESC']]})
        .then((data) => {
            return data
        })
}

const selectedRate = async (body) => {
    let isSelected = true;
    return  Rate.findOne({where: {isSelected: isSelected}})
        .then((data) => {
            return data
        })
}

const selectedRateForTheDay = async (date) => {
    return  Rate.findAll( {where: {
        rateId: { [Op.like]: `%${date}%` },
      }})
        .then((data) => {
            return data
        })
}

export {
    createRate,
    listRates,
    selectedRate,
    selectedRateForTheDay
}
