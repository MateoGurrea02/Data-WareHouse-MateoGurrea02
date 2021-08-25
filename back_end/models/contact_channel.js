const { DataTypes, BelongsTo } = require('sequelize');

const connection = require('../connection');
const preferenceModel = require('../models/preferences');

const model = connection.define(
    'contact_channel',
    {
        name: {
            type: DataTypes.STRING
        },
        information: {
            type: DataTypes.STRING
        },
        preference_id: {
            type: DataTypes.INTEGER,
        }
    },{timestamps: false}
);

model.belongsTo(preferenceModel, { as: 'preference', foreignKey: 'preference_id' });


module.exports = model;