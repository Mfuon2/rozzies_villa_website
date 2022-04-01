
const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const rate_schema = {
    type: "object",
    properties: {
        rate: {type: "number"},
        description: {type: "string"}
    },
    required: ["rate","description"],
    additionalProperties: true
}

const booking_schema = {
    type: "object",
    properties: {
        clientName: {type: "string"},
        amount: {type: "number"},
        startDate: {type: "string"},
        endDate: {type: "string"},
        gender: {type: "string"},
        email: {type: "string"},
        requestId: {type: "string"}
    },
    required: ["clientName","amount", "startDate", "endDate", "gender", "email", "requestId"],
    additionalProperties: true
}

const rate_validation = ajv.compile(rate_schema)
const booking_validation = ajv.compile(booking_schema)

export {
    rate_validation,
    booking_validation
}
