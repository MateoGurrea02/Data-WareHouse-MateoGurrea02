const { DataTypes, BelongsTo } = require('sequelize');

const connection = require('../connection');
const countryModel = require('../models/country');

const model = connection.define(
    'city',
    {
        name: {
            type: DataTypes.STRING
        },
        country_id: {
            type: DataTypes.INTEGER
        },
    },{timestamps: false}
);

model.belongsTo(countryModel, { as: 'country', foreignKey: 'country_id' });


module.exports = model;