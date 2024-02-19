const ErrorHandler = require("../utils/errorhander");

module.exports = (err,req,res,next)=>{


    err.statusCode = err.statusCode ||500;
    err.message = err.message || "internal Server Error";



    //Wrong Mongodb Id error 

    if (err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    //Moongose duplicate key error

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered `;
        err = new ErrorHandler(message,400);
    }

     //Wrong JWT error 

     if (err.name === "jsonWebTokenError"){
        const message = ` json Web Token is Invalid,try again `;
        err = new ErrorHandler(message,400);
    }

    //JWT EXPIRE error

    if (err.name === "TokenExpiredError"){
        const message = ` json Web Token is Expired, Try again`;
        err = new ErrorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false, 
        message: err.message,

    });

}; 