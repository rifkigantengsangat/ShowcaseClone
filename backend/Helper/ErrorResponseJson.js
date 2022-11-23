export const ErrorResponseJson = (res, statusCode, message)=>{
    res.status(statusCode || 400).json({
        code : statusCode  || 200,
        message : message || "Failed"
    })
}