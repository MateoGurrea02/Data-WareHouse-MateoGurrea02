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
}

module.exports = City;