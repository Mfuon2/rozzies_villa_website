import {DataTypes} from "sequelize";
import crypto from "crypto";

export class UuidGenerator {
    generateUuid = () => {
        return [4, 2, 2, 2, 6]
            .map(group => crypto.randomBytes(group).toString('hex'))
            .join('-');
    };
}


export const bookingModel =  {
    bookingId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: new UuidGenerator().generateUuid(),
    },
    startDate:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    phoneNumber:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true
    },
    identityId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    clientName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    requestId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    accountNumber:{
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentTransactionRef:{
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentTransactionId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    bookingStatus:{
        type:DataTypes.STRING,
    },
    isBooked: {
        type: DataTypes.BOOLEAN
    }
}
