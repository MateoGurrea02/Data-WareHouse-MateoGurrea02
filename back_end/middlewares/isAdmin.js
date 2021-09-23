const jwt = require('jsonwebtoken');
const config = require('../config/index');

function isAdmin(req, res, next) {
    const headerAuth = req.headers['authorization'];
    if (!headerAuth) {
        return res.status('401').json({ message: 'Token is missing!' });
    }
    const [token] = headerAuth.split(' ');
    try {
        const tokenDecoded = jwt.verify( token, config.jwt_secret);
        const isAdmin = tokenDecoded.user.profile === 'Admin';
        if(!isAdmin){
            return res.status('401').json({ message: 'You not authorized' });
        }
    } catch (error) {
        let message;
        switch (error.name) {
            case 'JsonWebTokenError':{
                message = 'Error in the JWT';
                break;
            }
            default:{
                message = 'Error';
                break;
            }
        }
        return res.status(401).json({ token, message});
    }
    return next();
}

module.exports = isAdmin;