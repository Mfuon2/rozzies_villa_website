import {DataTypes} from "sequelize";
import {v4 as uuidv4} from "uuid";

export const clientModel = {
    clientId: {
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
        allowNull: false,
        unique: true
    },
    identityId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}
