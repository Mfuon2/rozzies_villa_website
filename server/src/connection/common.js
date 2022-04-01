const success_ = (msg, data) => {
    return {
        success: true,
        message: msg,
        data: data
    }
}

const failure_ = (msg, data) => {
    return {
        success: false,
        message: msg,
        data: data
    }
}

export {
    success_,
    failure_
}
