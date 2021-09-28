const countryModel = require('../models/country');
const regionModel = require('../models/regions');
const cityModel = require('../models/cities');
class Country {
    static async getAll(req, res) {
        try {
            const country = await countryModel.findAll({
                include: [{
                    model: regionModel,
                    as: 'region',
                }],attributes:{
                    exclude: ['region_id']
                }
            });
            return res.json({
                status: 200,
                data: country
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
            const { name, region_id} = req.body;
            if ( !name|| !region_id ) {
                return res.status(422).json({
                    status: 422,
                    error: 'The input \"name\" and \"region_id\" are required'
                });
            }
            const regionFound = await regionModel.findOne({
                where: {
                    id: region_id
                }
            });
            if (!regionFound) {
                return res.status(422).json({
                    status: 422,
                    error: 'The region_id is not found'
                });
            }
            const countryCreated = await countryModel.create(
                { name, region_id},
                { fields: ["name", "region_id"] }
            );
            return res.status(201).json({
                status: 201,
                message: 'country created'
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
            const { name, region_id } = req.body;
            const countryId = await countryModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (region_id) {
                const regionFound = await regionModel.findOne({
                    where: {
                        id: region_id
                    }
                });
                if (!regionFound) {
                    return res.status(422).json({
                        status: 422,
                        error: 'The region_id is not found'
                    });
                }
            }
            const countryUpdated = await countryId.update(
                { name, region_id },
                {fields: ["name", "region_id"]}
            );
            return res.status(200).json({
                status: 200,
                message: 'country updated'
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
                where: {
                    country_id: req.params.id
                }
            });

            const deleteCountry= await countryModel.destroy({
                where:{
                    id: req.params.id
                }            
            });
            return res.status(201).json({
                status: 201,
                message: 'Deleted country'
            })
        }catch{
            return res.status(500).json({
                status: 500,
                error
            })   
        }
    }
}

module.exports = Country;