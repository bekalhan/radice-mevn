const ErrorResponse = require('../Helpers/errorResponse');

const errorhandler = (err,req,res,next) =>
{
    let error = {...err};

    error.message = err.message;

    console.log(err);

    if(err.code === 11000)
    {
        const message = 'Duplicate field value error';
        error = new ErrorResponse(message,400);
    }

    if(err.name === "ValidationError")
    {
        const message = Object.values(err.errors).map((val)=>val.message);
        error = new ErrorResponse(message,400);
    }

    res.status(error.statusCode || 500).json({
        success : false,
        error : error.message  || "Server error"
    })
}

module.exports = errorhandler;