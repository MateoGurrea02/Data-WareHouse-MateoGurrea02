const { DataTypes } = require('sequelize');

const connection = require('../connection');
const countryModel = require('../models/country');
const contact_channelModel = require('../models/contact_channel');  
const companyModel = require('../models/company')

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
        company_id: {
            type: DataTypes.INTEGER
        },
        position_company:{
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


model.belongsTo(companyModel , {as:'company', foreignKey: 'company_id'});
model.belongsTo(countryModel , {as:'country', foreignKey: 'country_id'});
model.belongsTo(contact_channelModel, { as: 'contact_channel', foreignKey: 'contact_channel_id' });



module.exports = model;