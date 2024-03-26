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

module.exports = {
    createAirplane,
    getAirplanes
}