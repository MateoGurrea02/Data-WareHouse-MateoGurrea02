const companyModel = require('../models/company');
const countryModel = require('../models/country');
const cityModel = require('../models/cities');

class Company {
    static async getAll(req, res) {
        try {
            const companies = await companyModel.findAll({
                include:[
                    {
                        model: cityModel,
                        as: 'city',
                        include: [
                            {
                                model: countryModel,
                                as: 'country',
                                attributes:{
                                    exclude:['region_id']
                                }
                            }
                        ],attributes: {
                            exclude: ['country_id']
                        },
                    }
                ],attributes:{
                    exclude: ['city_id']
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
    static async create(req, res) {
        try {
            const { name, direction, phone, email, city_id } = req.body;
            if (!name|| !direction||!phone || !email ||!city_id ) {
                return res.status(422).json({
                    status: 422,
                    error: 'The input \"name\", \"direction\", \"phone\", \"email\"  and \"city_id\" are required'
                });
            }
            const city = await cityModel.findOne({
                where: {
                    id: city_id
                }
            });
            if (!city) {
                return res.status(422).json({
                    status: 422,
                    error: 'The city does not exist'
                });
            }

            const companyCreated = await companyModel.create(
                { name, direction, phone, email, city_id},
                { fields: ["name", "direction", "phone", "email", "city_id"] }
            );
            return res.status(201).json({
                status: 201,
                message: 'Company created'
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
            const { name, direction, phone, email, city_id } = req.body;
            const companyId = await companyModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (city_id) {
                const cityFound = await cityModel.findOne({
                    where: {
                        id: city_id
                    }
                });
                if (!cityFound) {
                    return res.status(422).json({
                        status: 422,
                        error: 'The city_id is not found'
                    });
                }
            }
            const update = await companyId.update(
                {name, direction, phone, email, city_id},
                {fields: ["name", "direction", "phone", "email","city_id"]}
            )
            return res.status(201).json({
                status: 201,
                message: 'Updated company'
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
            const deleteCompany = await companyModel.destroy({
                where:{
                    id: req.params.id
                }            
            });
            return res.status(201).json({
                status: 201,
                message: 'Deleted company'
            })
        }catch{
            return res.status(500).json({
                status: 500,
                error
            })   
        }
    }

}

module.exports = Company;