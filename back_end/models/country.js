const { DataTypes, BelongsTo } = require('sequelize');

const connection = require('../connection');
const regionModel = require('../models/regions');

const model = connection.define(
    'country',
    {
        name: {
            type: DataTypes.STRING
        },
        region_id: {
            type: DataTypes.INTEGER
        },
    },{timestamps: false}
);

model.belongsTo(regionModel, { as: 'region', foreignKey: 'region_id' });


module.exports = model;