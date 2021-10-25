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
            let contactId = contactCreated.id;
            return res.status(201).json({
                status: 201,
                message: 'contact created',
                data: contactId
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
            const { name, surname, email, company_id, position_company, interest,direction, city_id} = req.body;
            const contactId = await contactModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            const contactUpdated = await contactId.update(
                { name, surname, email, company_id, position_company, interest, direction, city_id},
                { fields: ["name", "surname", "email", "company_id","position_company", "interest","direction","city_id"] }
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
            const contactLineId = await contact_channel_lineModel.findOne({
                where: {
                    contact_id: req.params.id
                }
            });
            //si no se encuentra el contactLineId se elimina el contacto
            if (!contactLineId) {
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
            }
            //si se encuentra el contactLineId se elimina el contacto y el contactLine
            const contactLine = await contactLineId.destroy();
            const contact = await contactModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            await contact.destroy();
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
    static async getContactByName(req, res) {
        try {
            const { name } = req.params;
            const contact = await contactModel.findAll({
                where: {
                    name: name
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
            
                }],
                attributes: {
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
    static async getContactByCompany(req, res) {
        try {
            const { company_id } = req.params;
            const contact = await contactModel.findAll({
                where: {
                    company_id: company_id
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
                }],
                attributes: {
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
    static async getContactByCountry(req, res) {
        try {
            const { country_id } = req.params;
            const contact = await contactModel.findAll({
                where: {
                    '$city.country.id$': country_id
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
                        },
                        where: {
                            id: country_id
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
                }],
                attributes: {
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
    static async getContactByRegion(req, res) {
        try {
            const { region_id } = req.params;
            const contact = await contactModel.findAll({
                where: {
                    '$city.country.region.id$': region_id
                },
                include: [{
                    model: cityModel,
                    as: 'city',
                    include: [{
                        model: countryModel,
                        as: 'country',
                        include: [{
                            model: regionModel,
                            as: 'region',
                            where: {
                                id: region_id
                            }
                        }],attributes:{
                            exclude: ['region_id']
                        }
                    }],attributes: {
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
                }],
                attributes: {
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
    static async getContactByPosition(req, res) {
        try {
            const { position} = req.params;
            const contact = await contactModel.findAll({
                where: {
                    position_company: position
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
            
                }],
                attributes: {
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
    static async getContactByInterest(req, res) {
        try {
            const { interest} = req.params;
            const contact = await contactModel.findAll({
                where: {
                    interest: interest
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
            
                }],
                attributes: {
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

}

module.exports = Contact;