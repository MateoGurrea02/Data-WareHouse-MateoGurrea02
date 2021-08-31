const { DataTypes, BelongsTo } = require('sequelize');

const connection = require('../connection');
const contactModel = require('../models/contacts');
const contactChannelModel = require('../models/contact_channel');

const model = connection.define(
    'contact_channel_line',
    {
        contact_id: {
            type: DataTypes.INTEGER
        },
        contact_channel_id: {
            type: DataTypes.INTEGER
        }
    },{timestamps: false}
);

model.belongsTo(contactChannelModel, {as: 'contact_channel', foreignKey: 'contact_channel_id'});


module.exports = model;