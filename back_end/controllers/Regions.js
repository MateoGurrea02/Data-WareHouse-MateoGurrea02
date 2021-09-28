const regionModel = require('../models/regions');
const countryModel = require('../models/country');
const cityModel = require('../models/cities');

class Region {
    static async getAll(req, res) {
        try {
            const regions = await regionModel.findAll();
            return res.json({
                status: 200,
                data: regions
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
            const { name} = req.body;
            if ( !name ) {
                return res.status(422).json({
                    status: 422,
                    error: 'The input \"name\" is required'
                });
            }
            const regionCreated = await regionModel.create(
                { name},
                { fields: ["name"] }
            );
            return res.status(201).json({
                status: 201,
                message: 'Region created'
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
            const { name } = req.body;
            const regionId = await regionModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            const regionUpdated = await regionId.update(
                { name,},
                {fields: ["name"]}
            );
            return res.status(200).json({
                status: 200,
                message: 'Region updated'
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
            const countryId = await countryModel.findAll({
                where: {
                    region_id: req.params.id
                }
            });
            const country = countryId.map(country => country.id);

            //destroy all cities in the region
            const cities = await cityModel.destroy({
                where: {
                    country_id: country
                }
            });

            const deleteCountry = await countryModel.destroy({
                where:{
                    region_id: req.params.id
                }
            });
            const deleteRegion = await regionModel.destroy({
                where:{
                    id: req.params.id
                }            
            });
            return res.status(201).json({
                status: 201,
                message: 'Deleted region and all countrys'
            })
        }catch (error){
            return res.status(500).json({
                status: 500,
                error: error.message
            })   
        }
    }
}

module.exports = Region;