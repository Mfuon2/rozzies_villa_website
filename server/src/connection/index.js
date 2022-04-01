import {DataTypes, Sequelize} from "sequelize";
import {rateModel} from "../models/rate";
import {bookingModel} from "../models/booking";
import {clientModel} from "../models/client";
import {inquiryModel} from "../models/inquiry";
import {menuModel} from "../models/menu";
import {userModel} from "../models/user";
import {imageModel} from "../models/images";
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+00:00'
});

export const Rate = sequelize.define('Rate', rateModel , { tableName: 'rates', timestamps: true});
export const Booking = sequelize.define('Booking', bookingModel , { tableName: 'bookings', timestamps: true});
export const Client = sequelize.define('Client', clientModel , { tableName: 'clients', timestamps: true});
export const Inquiry = sequelize.define('Inquiry', inquiryModel , { tableName: 'inquiries', timestamps: true});
export const Menu = sequelize.define('Menu', menuModel , { tableName: 'menus', timestamps: true});
export const User = sequelize.define('User', userModel , { tableName: 'users', timestamps: true});
export const Image = sequelize.define('User', imageModel , { tableName: 'images', timestamps: true});

export const init_database = () => {
    (async () => {
        console.log('================================== \n Updating Database \n==================================')
        await sequelize.sync({ alter: true }).then(() => console.log('🔥🔥Done🔥🔥'))
    })();
}



