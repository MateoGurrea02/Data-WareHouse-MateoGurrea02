const userModel = require('../models/users');

class User {
    static async getAll(req, res) {
        try {
            const users = await userModel.findAll(
                {
                    attributes: {
                        exclude: ['password','profile_id']
                    },
                    include: ['profile']
                }
            );
            return res.json({
                status: 200,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
}

module.exports = User;