import {DataTypes} from "sequelize";
import {v4 as uuidv4} from "uuid";

export const inquiryModel = {
    inquiryId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4(),
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bookingRef: {
        type: DataTypes.STRING,
        allowNull: false
    }
}
