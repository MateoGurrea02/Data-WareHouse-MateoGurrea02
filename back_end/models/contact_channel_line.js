const { DataTypes, BelongsTo } = require('sequelize');

const connection = require('../connection');
const contactChannelModel = require('../models/contact_channel');
const preferenceModel = require('../models/preferences');

const model = connection.define(
    'contact_channel_line',
    {
        contact_id: {
            type: DataTypes.INTEGER
        },
        contact_channel_id: {
            type: DataTypes.INTEGER
        },
        information: {
            type: DataTypes.STRING
        },
        preference_id: {
            type: DataTypes.INTEGER
        },
    },{timestamps: false}
);


model.belongsTo(preferenceModel, {as:'preference' ,foreignKey: 'preference_id'});
model.belongsTo(contactChannelModel, {as: 'contact_channel', foreignKey: 'contact_channel_id'});


module.exports = model;