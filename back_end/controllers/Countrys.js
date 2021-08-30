const countryModel = require('../models/country');
const regionModel = require('../models/regions');

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
}

module.exports = Country;