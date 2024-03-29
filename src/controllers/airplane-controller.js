const {StatusCodes} = require('http-status-codes')
const {AirplaneService} = require('../services')
const {SuccessResponse, ErrorResponse} = require('../utils/common')

async function createAirplane(req, res){
    try{
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        })
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error;
        res
         .status(error.statusCode)
         .json(ErrorResponse)
    }
}

async function getAirplanes(req, res){
    try{
        const airplane = await AirplaneService.getAirplanes()
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error;
        res
         .status(error.statusCode)
         .json(ErrorResponse)
    }
}

module.exports = {
    createAirplane,
    getAirplanes
}