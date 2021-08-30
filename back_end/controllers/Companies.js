const companyModel = require('../models/company');
const countryModel = require('../models/country');
const regionModel = require('../models/regions');

class Company {
    static async getAll(req, res) {
        try {
            const companies = await companyModel.findAll({
                include:[
                    {
                        model: countryModel,
                        as: 'country',
                        attributes: {
                            exclude: ['region_id']
                        },
                        include: [
                            {
                                model: regionModel,
                                as: 'region'
                            }
                        ]
                    }
                ],attributes:{
                    exclude: ['countryId']
                }

            });
            return res.json({
                status: 200,
                data: companies
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }

}

module.exports = Company;