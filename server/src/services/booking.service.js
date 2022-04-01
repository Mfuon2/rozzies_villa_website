import { Booking, Rate } from "../connection";
import { UuidGenerator } from "../models/booking";
import moment from "moment";
import mjml2html from "mjml"
import { main } from "./mail.service";
import { createUpdateClient } from "./client.service";

const createBooking = async(body) => {
    try {
        if (body.bookingId) {
            return await Booking.findOne({ where: { bookingId: body.bookingId } })
                .then(async(r) => {
                    if (r) {
                        return await Booking.update(body, { where: { bookingId: body.bookingId } })
                            .then(async(data) => {
                                const html = sendNotification(r.clientName, r.accountNumber)
                                await main(r.email, html.toString()).catch(console.error);
                                await saveClient(body)
                                return `${data} row(s) has been updated`
                            });
                    }
                })
                .catch((err) => {
                    return err
                })
        } else {
            body.startDate = moment(new Date(body.startDate)).format("YYYY-MM-DD hh:mm:ss")
            body.endDate = moment(new Date(body.endDate)).format("YYYY-MM-DD hh:mm:ss")
            console.log('Start : ' + body.startDate)
            console.log('End : ' + body.endDate)
            body.bookingId = new UuidGenerator().generateUuid()
            return await Booking.create(body)
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

const updateBooking = async(requestId, status) => {
    try {
        if (requestId) {
            return await Booking.update({ requestId: requestId, bookingStatus: status }, { where: { requestId: requestId } })
                .then((data) => {
                    return data
                })
                .catch((err) => {
                    return err.errors
                })
        }
    } catch (e) {
        return e.errors
    }
}

const listBookings = async() => {
    return await Booking.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['createdAt', 'DESC']
            ]
        })
        .then((data) => {
            return data
        })
}

const saveClient = async(body) => {
    const data = {
        name: body.clientName,
        phoneNumber: body.phoneNumber,
        email: body.email,
        identityId: body.identityId
    }
    await createUpdateClient(data)
}

const listSuccessfulBooked = async() => {
    return await Booking.findAll({ where: { bookingStatus: "successful" } })
        .then((data) => {
            return data
        })
}
const sendNotification = (client, accountNumber) => {
    const tes = `
    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <title></title>
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <style type="text/css">
            #outlook a {
                padding: 0;
            }
            body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            table,
            td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
            }
            p {
                display: block;
                margin: 13px 0;
            }
        </style>
        <style type="text/css">
            @media only screen and (min-width: 480px) {
                .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
            }
        </style>
        <style media="screen and (min-width:480px)">
            .moz-text-html .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
            }
        </style>
        <style type="text/css">
            @media only screen and (max-width: 480px) {
                table.mj-full-width-mobile {
                    width: 100% !important;
                }
                td.mj-full-width-mobile {
                    width: auto !important;
                }
            }
        </style>
    </head>
    <body style="word-spacing: normal; background-color: #f4f4f4;">
        <div style="background-color: #f4f4f4;">
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:1000px;" width="1000" bgcolor="#040919" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background: #040919; background-color: #040919; margin: 0px auto; max-width: 1000px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #040919; background-color: #040919; width: 100%;">
                    <tbody>
                        <tr>
                            <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:1000px;" ><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; border-spacing: 0px;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width: 300px;">
                                                                    <img
                                                                        height="auto"
                                                                        src="https://pic8.co/sh/fnEX0Q.png"
                                                                        style="border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px;"
                                                                        width="300"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
             <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 1000px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #ffffff; background-color: #ffffff; width: 100%;">
                    <tbody>
                        <tr>
                            <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:1000px;" ><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                                    <p style="border-top: solid 4px #ccae06; font-size: 1px; margin: 0px auto; width: 100%;"></p>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" style="font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                                    <div style="font-family: helvetica; font-size: 20px; line-height: 1; text-align: left; color: #f45e43;">Hello ${client},</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" style="font-size: 0px; padding: 10px 25px; padding-bottom: 20px; word-break: break-word;">
                                                    <div style="font-family: helvetica; font-size: 15px; line-height: 1; text-align: left; color: #131212;">
                                                    
I hope your checkin went smoothly. let us know if we can do anything to make your stay more comfortable, please do not hesitate to ask anything. Use the account number below to reference your booking anywhere.
                                                </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" style="font-size: 0px; padding: 10px 25px; padding-bottom: 20px; word-break: break-word;">
                                                    <div style="font-family: helvetica; font-size: 20px; line-height: 1; text-align: left; color: #f45e43;"></div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="font-size: 0px; padding: 0px 25px 0px 25px; word-break: break-word;">
                                                    <div style="font-family: Arial, sans-serif; font-size: 40px; line-height: 28px; text-align: center; color: #55575d;">${accountNumber}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:1000px;" width="1000" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 1000px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #ffffff; background-color: #ffffff; width: 100%;">
                    <tbody>
                        <tr>
                            <td style="direction: ltr; font-size: 0px; padding: 20px 0px 20px 0px; text-align: center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:1000px;" ><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="font-size: 0px; padding: 0px 25px 0px 25px; word-break: break-word;">
                                                 
                                                    <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 28px; text-align: center; color: #55575d;">
                                                        New dreams, new Hopes, new Experiences new Joys, we wish you all the best this year.
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:1000px;" width="1000" bgcolor="#040919" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="background: #040919; background-color: #040919; margin: 0px auto; max-width: 1000px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background: #040919; background-color: #040919; width: 100%;">
                    <tbody>
                        <tr>
                            <td style="direction: ltr; font-size: 0px; padding: 20px 0; text-align: center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:1000px;" ><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%">
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:1000px;" width="1000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
            <div style="margin: 0px auto; max-width: 1000px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%;">
                    <tbody>
                        <tr>
                            <td style="direction: ltr; font-size: 0px; padding: 20px 0px 20px 0px; text-align: center;">
                                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:1000px;" ><![endif]-->
                                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size: 0px; text-align: left; direction: ltr; display: inline-block; vertical-align: top; width: 100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align: top;" width="100%">
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]></td></tr></table><![endif]-->
        </div>
    </body>
</html>

    `
    return tes
}

export {
    listSuccessfulBooked,
    createBooking,
    listBookings,
    updateBooking
}