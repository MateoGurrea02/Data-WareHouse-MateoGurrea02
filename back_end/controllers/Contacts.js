const contactModel = require('../models/contacts');
const companyModel = require('../models/company');
const countryModel = require('../models/country');
const cityModel = require('../models/cities');
const contact_channelModel = require('../models/contact_channel');
const preferenceModel = require('../models/preferences');
const contact_channel_lineModel = require('../models/contact_channel_line');
const regionModel = require('../models/regions');

class Contact {
    static async getAll(req, res) {
        try {
            const contact = await contactModel.findAll({
                include: [{
                    model: cityModel,
                    as: 'city',
                    include: [{
                        model: countryModel,
                        as: 'country',
                        include: [{
                            model: regionModel,
                            as: 'region'
                        }],attributes:{
                            exclude: ['region_id']
                        }
                    }],
                    attributes: {
                        exclude: ['country_id']
                    }
                },{
                    model: companyModel,
                    as: 'company',
                    include: [{
                        model: cityModel,
                        as: 'city',
                    }],attributes:{
                        exclude: ['city_id']
                    }
                },{
                    model: contact_channel_lineModel,
                    as: 'contact_channel_line',
                    include: [
                        {
                            model: contact_channelModel,
                            as: 'contact_channel',
                        },
                        {
                            model: preferenceModel,
                            as: 'preference',
                        },
                    ],attributes: {
                        exclude: ['contact_id','preference_id','contact_channel_id']
                    }
                }
            ],attributes: {
                    exclude: ['company_id', 'city_id']
                }
            });
            return res.json({
                status: 200,
                data: contact
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
    static async getById(req, res) {
        try {
            const contact = await contactModel.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: cityModel,
                    as: 'city',
                    include: [{
                        model: countryModel,
                        as: 'country',
                        include: [{
                            model: regionModel,
                            as: 'region'
                        }],attributes:{
                            exclude: ['region_id']
                        }
                    }],
                    attributes: {
                        exclude: ['country_id']
                    }
                },{
                    model: companyModel,
                    as: 'company',
                    include: [{
                        model: cityModel,
                        as: 'city',
                    }],attributes:{
                        exclude: ['city_id']
                    }
                },{
                    model: contact_channel_lineModel,
                    as: 'contact_channel_line',
                    include: [
                        {
                            model: contact_channelModel,
                            as: 'contact_channel',
                        },
                        {
                            model: preferenceModel,
                            as: 'preference',
                        },
                    ],attributes: {
                        exclude: ['contact_id','preference_id','contact_channel_id']
                    }
                }
            ],attributes: {
                    exclude: ['company_id', 'country_id']
                }
            });
            return res.json({
                status: 200,
                data: contact
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
            const { name, surname, email, company_id, position_company, city_id, direction, interest} = req.body;
            if (!name|| !surname||!email || !company_id || !position_company || !city_id) {
                return res.status(422).json({
                    status: 422,
                    error: 'The input \"name\", \"surname\", \"email\", \"company_id\", \"city_id\" and \"position_company\" are required'
                });
            }

            const cityFound = await cityModel.findOne({
                where: {
                    id: city_id
                }
            });
            if (!cityFound) {
                return res.status(422).json({
                    status: 422,
                    error: 'The country not found'
                });
            }

            const company = await companyModel.findOne({    
                where: {
                    id: company_id
                }
            });
            if (!company) {
                return res.status(422).json({
                    status: 422,
                    error: 'The input \"company_id\" is not valid'
                });
            }

            const contactCreated = await contactModel.create(
                { name, surname, email, company_id, position_company, city_id, direction,interest},
                { fields: ["name", "surname", "email", "company_id","position_company","city_id","direction","interest"] }
            );
            return res.status(201).json({
                status: 201,
                message: 'contact created'
            }) 
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }
    static async update(req, res) {
        try {
            const { name, surname, email, company_id, position_company, interest,direction} = req.body;
            const contactId = await contactModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            const contactUpdated = await contactId.update(
                { name, surname, email, company_id, position_company, interest, direction},
                { fields: ["name", "surname", "email", "company_id","position_company", "interest","direction"] }
            );
            return res.status(200).json({
                status: 200,
                message: 'contact updated'
            }) 
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }
    static async delete(req, res) {
        try {
            const contactId = await contactModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            await contactId.destroy();
            return res.status(200).json({
                status: 200,
                message: 'contact deleted'
            }) 
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }
}

module.exports = Contact;