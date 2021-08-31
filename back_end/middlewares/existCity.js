const cityModel = require('../models/cities')
async function existCity(req, res, next) {
    const city = await cityModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!city){
        return res.status(401).json({
            status: 401,
            error: 'City not found'
        })
    }
    next()
}

module.exports = existCity