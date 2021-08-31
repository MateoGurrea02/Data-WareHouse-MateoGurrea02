const cityModel = require('../models/cities');
const countryModel = require('../models/country');

class City {
    static async getAll(req, res) {
        try {
            const city = await cityModel.findAll({
                include: [{
                    model: countryModel,
                    as: 'country',
                    attributes: {
                        exclude: ['region_id']
                    },
                    include: ['region']                
                }],attributes: {
                    exclude: ['country_id']
                }
            });
            return res.json({
                status: 200,
                data: city
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
    static async create(req, res) {
        try {
            const { name, country_id} = req.body;
            if ( !name|| !country_id ) {
                return res.status(422).json({
                    status: 422,
                    error: 'The input \"name\" and \"country_id\" are required'
                });
            }
            const countryFound = await countryModel.findOne({
                where: {
                    id: country_id
                }
            });
            if (!countryFound) {
                return res.status(422).json({
                    status: 422,
                    error: 'The country_id is not found'
                });
            }
            const cityCreated = await cityModel.create(
                { name, country_id},
                { fields: ["name", "country_id"] }
            );
            return res.status(201).json({
                status: 201,
                message: 'city created'
            }) 

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }
    static async update(req, res){
        try {
            const { name, country_id } = req.body;
            const cityId = await cityModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (country_id) {
                const countryFound = await countryModel.findOne({
                    where: {
                        id: country_id
                    }
                });
                if (!countryFound) {
                    return res.status(422).json({
                        status: 422,
                        error: 'The country_id is not found'
                    });
                }
            }
            const cityUpdated = await cityId.update(
                { name, country_id },
                {fields: ["name", "country_id"]}
            );
            return res.status(200).json({
                status: 200,
                message: 'city updated'
            })
        }catch{
            return res.status(500).json({
                status: 500,
                error
            })   
        }
    }
    static async delete(req, res){
        try {   
            const deleteCity = await cityModel.destroy({
                where:{
                    id: req.params.id
                }            
            });
            return res.status(201).json({
                status: 201,
                message: 'Deleted city'
            })
        }catch{
            return res.status(500).json({
                status: 500,
                error
            })   
        }
    }
}

module.exports = City;