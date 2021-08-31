const companyModel = require('../models/company')
async function existCompany(req, res, next) {
    const company = await companyModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!company){
        return res.status(401).json({
            status: 401,
            error: 'Company not found'
        })
    }
    next()
}

module.exports = existCompany