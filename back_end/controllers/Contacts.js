const contactModel = require('../models/contacts');
const companyModel = require('../models/company');
const countryModel = require('../models/country');
const cityModel = require('../models/cities');
const contact_channelModel = require('../models/contact_channel');
const preferenceModel = require('../models/preferences');
const contact_channel_lineModel = require('../models/contact_channel_line');

class Contact {
    static async getAll(req, res) {
        try {
            const contact = await contactModel.findAll({
                include: [{
                    model: countryModel,
                    as: 'country',
                    attributes: {
                        exclude: ['region_id']
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
                            include: [{
                                model: preferenceModel,
                                as: 'preference',
                            }],attributes: {
                                exclude: ['preference_id']
                            }
                        }
                    ],attributes: {
                        exclude: ['contact_id','contact_channel_id']
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
}

module.exports = Contact;