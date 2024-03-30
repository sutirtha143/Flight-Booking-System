const {Logger} = require("../config");
const {StatusCodes} = require('http-status-codes')
const appError = require("../utils/errors/app-error");

class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data) {
    
            const response = await this.model.create(data);
            
            return response;
    }

    async destroy(data) {

            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return response;
    }

    async get(data) {
            const response = await this.model.findByPk(data);
            if(!response){
                throw new appError('Not able to find the resource', StatusCodes.NOT_FOUND)
            }
            return response;
        
    }

    async getAll() {
            const response = await this.model.findAll();
            return response;
    }

    async update(id, data) { //data -> {col : val, .....}
       // try{
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        // }catch(error){
        //     Logger.error('Something went wrong in the Crud Repo : update')
        //     throw error;
        // }
    }
}

module.exports = CrudRepository;