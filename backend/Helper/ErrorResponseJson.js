export const ErrorResponseJson = (res, statusCode, message)=>{
    res.status(statusCode).json({
        code : statusCode  || 400,
        message : message || "Failed"
    })
}