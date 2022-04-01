import {DataTypes} from "sequelize";
import {v4 as uuidv4} from "uuid";

export const menuModel = {
    menuId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4(),
    },
    category:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.DOUBLE,
        defaultValue:10,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}
