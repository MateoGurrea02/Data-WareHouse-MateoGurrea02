const userModel = require('../models/users')
async function existUser(req, res, next) {
    const user = await userModel.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user){
        return res.status(401).json({
            status: 401,
            error: 'User not found'
        })
    }
    next()
}

module.exports = existUser