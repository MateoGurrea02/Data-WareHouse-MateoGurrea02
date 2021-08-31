const countryModel = require('../models/country')
async function existCountry(req, res, next) {
    const country = await countryModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!country){
        return res.status(401).json({
            status: 401,
            error: 'Country not found'
        })
    }
    next()
}

module.exports = existCountry