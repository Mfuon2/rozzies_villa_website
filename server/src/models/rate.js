import {
    DataTypes
} from "sequelize";
import {
    v4 as uuidv4
} from "uuid";

export const rateModel = {
    rateId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    rate: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0,
        unique: false
    }
}