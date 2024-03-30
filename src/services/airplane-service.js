const {AirplaneRepository} = require('../repositories')
const {StatusCodes} = require('http-status-codes')
const appError = require('../utils/errors/app-error')


const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepository.create(data)
        
        return airplane;
        
    } catch(error){

        if(error.name == 'SequelizeValidationError'){
            let explanation = []
            error.errors.forEach((err) => {
                explanation.push(err.message)
            })
            throw new appError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new appError('Cannot create a new Airplane object', StatusCodes)
    }
}

async function getAirplanes(){
    try{
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    }catch(error){
        throw new appError('Cannot fetch data of all the airplanes', StatusCodes)
    }
}

async function getAirplane(id){
    try{
        const airplane = await airplaneRepository.get(id);
        return airplane;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new appError('The airplane you requested is not present', error.statusCode)
        }
        throw new appError('Cannot fetch data of the airplane', StatusCodes)
    }
}

async function destroyAirplane(id){
    try{
        const response = await airplaneRepository.destroy(id);
        return response;
    }catch(error){
        throw new appError('Cannot delete data of the airplane', StatusCodes)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}