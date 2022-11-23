export const SuccessResponseJson = (res, statusCode, message, data)=>{
    res.status(statusCode || 200).json({
        code : statusCode  || 200,
        message : message || "Success Data",
        data : data
    })
}