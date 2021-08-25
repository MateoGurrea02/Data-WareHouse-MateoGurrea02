const { DataTypes, BelongsTo } = require('sequelize');

const connection = require('../connection');
const countryModel = require('../models/country');
const contact_channelModel = require('../models/contact_channel');  

const model = connection.define(
    'contact',
    {
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        psition_company:{
            type: DataTypes.STRING
        },
        country_id: {
            type: DataTypes.INTEGER
        },
        contact_channel_id:{
            type: DataTypes.INTEGER
        }
    },{timestamps: false}
);

model.belongsTo(countryModel, { as: 'country', foreignKey: 'country_id' });
model.belongsTo(contact_channelModel, { as: 'contact_channel', foreignKey: 'contact_channel_id' });


module.exports = model;