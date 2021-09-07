const contactModel = require('../models/contacts')
async function existContact(req, res, next) {
    const contact = await contactModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!contact){
        return res.status(401).json({
            status: 401,
            error: 'Contact not found'
        })
    }
    next()
}

module.exports = existContact