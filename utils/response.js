const successResp = (res, message, data, status = 200) => {
    return res.status(status).json({
        code: status,
        message: message,
        data: data
    });
};

const errorResp = (res, message, status = 400) => {
    return res.status(status).json({
        code: status,
        message: message
    });
};


export { successResp, errorResp };