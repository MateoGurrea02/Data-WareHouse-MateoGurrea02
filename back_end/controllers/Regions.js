const regionModel = require('../models/regions');

class Region {
    static async getAll(req, res) {
        try {
            const regions = await regionModel.findAll();
            return res.json({
                status: 200,
                data: regions
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
}

module.exports = Region;