const contact_channel_lineModel = require('../models/contact_channel_line');
const contact_channelModel = require('../models/contact_channel');
const contactModel = require('../models/contacts');
const preferenceModel = require('../models/preferences');


class Contact_channel{
    static async add(req, res){
        try{
            const { contact_id, contact_channel_id, information, preference_id } = req.body;
            if (!contact_id|| !contact_channel_id||!information || !preference_id ) {
                return res.status(422).json({
                    status: 422,
                    error: 'The input \"contact_id\", \"contact_channel_id\", \"information\" and \"preference_id\" are required'
                });
            }
            const contact = await contactModel.findOne({
                where: {
                    id: contact_id
                }
            });
            const contact_channel = await contact_channelModel.findOne({
                where: {
                    id: contact_channel_id
                }
            });
            const preference = await preferenceModel.findOne({
                where: {
                    id: preference_id
                }
            });
            if (!contact || !contact_channel || !preference) {
                return res.status(404).json({
                    status: 404,
                    error: 'The input \"contact_id\", \"contact_channel_id\" and \"preference_id\" are not found'
                });
            }
            
            const contact_channel_line = await contact_channel_lineModel.create(
                { contact_id, contact_channel_id, information, preference_id },
                { fields: ['contact_id', 'contact_channel_id', 'information', 'preference_id'] 
            });
            return res.status(201).json({
                status: 201,
                data: "Contact Channel added successfully"
            });
        }catch(err){
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }
    static async getAll(req, res){
        try{
            const contact_channel = await contact_channelModel.findAll();
            return res.status(200).json({
                status: 200,
                data: contact_channel
            });
        }catch(err){
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }
    static async getAllContactChannelLines(req, res){
        try{
        let contactChannel = await contact_channel_lineModel.findAll();
        return res.status(200).json({
            status: 200,
            data: contactChannel
        });
        }catch(err){
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }

    static async getPreferences(req, res){
        try{
            const preference = await preferenceModel.findAll();
            return res.status(200).json({
                status: 200,
                data: preference
            });
        }catch(err){
            return res.status(500).json({
                status: 500,
                error: err
            })
        }
    }
    static async updateContactChannel(req, res){
        try{
            const {  information, preference_id } = req.body;
            let contactChannelFound = await contact_channel_lineModel.findOne({
                where: {
                    id: req.params.id
                }
            });
            if (!contactChannelFound) {
                return res.status(404).json({
                    status: 404,
                    error: 'The input \"contact_channel_line_id\" is not found'
                });
            }
            let contactUpdated = await contact_channel_lineModel.update(
                { information, preference_id },
                { where: { id: req.params.id } },
                { fields: ['information', 'preference_id']});


            return res.status(200).json({
                status: 200,
                data: "Contact Channel updated successfully"
            });
        }catch(err){
            return res.status(500).json({
                status: 500,
                error: err.message
            })
        }
    }
}

module.exports = Contact_channel;