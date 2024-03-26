const {StatusCodes} = require('http-status-codes');
const {ErrorResponse} = require('../utils/common');
const appError = require('../utils/errors/app-error');


function validateCreateRequest(req, res, next){
    if(!req.body.modelNumber){

        ErrorResponse.message = 'Something went wrong while creating airplane'
        
        ErrorResponse.error = new appError(['Model number not found in the incoming request in the correct form'], StatusCodes.BAD_REQUEST)
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse)
    }
    next();
}



module.exports = {
    validateCreateRequest
}