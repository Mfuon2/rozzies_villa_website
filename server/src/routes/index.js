
import {inquiryRoutes} from "./inquiry.route";
import {imagesRoute} from "./image.route";
const {rateRoutes} = require("./rate.route");
const {bookingRoute} = require("./booking.route");
const {webhooks} = require("./webhooks.route");
export const routes = (app) => {
    rateRoutes(app)
    bookingRoute(app)
    webhooks(app)
    inquiryRoutes(app)
    imagesRoute(app)

}
