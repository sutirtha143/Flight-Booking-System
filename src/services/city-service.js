const {CityRepository} = require('../repositories')
const {StatusCodes} = require('http-status-codes')
const appError = require('../utils/errors/app-error')

async function createCity(data){
    try {
        const city = await cityRepository.create(data)
        
        return city;
        
    } catch(error){

        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = []
            error.errors.forEach((err) => {
                explanation.push(err.message)
            })
            throw new appError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new appError('Cannot create a new City object', StatusCodes)
    }
}

module.exports = {
    createCity,
}



const cityRepository = new CityRepository();