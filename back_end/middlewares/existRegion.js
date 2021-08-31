const regionModel = require('../models/regions')
async function existRegion(req, res, next) {
    const region = await regionModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!region){
        return res.status(401).json({
            status: 401,
            error: 'Region not found'
        })
    }
    next()
}

module.exports = existRegion