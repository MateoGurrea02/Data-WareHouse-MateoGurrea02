const { DataTypes } = require('sequelize');

const connection = require('../connection');
const cityModel = require('./cities');
const contact_channel_lineModel = require('./contact_channel_line');  
const companyModel = require('./company')

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
        direction: {
            type: DataTypes.STRING
        },
        interest: {
            type: DataTypes.INTEGER
        },
        company_id: {
            type: DataTypes.INTEGER
        },
        position_company:{
            type: DataTypes.STRING
        },
        city_id: {
            type: DataTypes.INTEGER
        }
    },{timestamps: false}
);


model.belongsTo(companyModel , {as:'company', foreignKey: 'company_id'});
model.belongsTo(cityModel , {as:'city', foreignKey: 'city_id'});
model.hasMany(contact_channel_lineModel, {as: 'contact_channel_line', foreignKey: 'contact_id'});




module.exports = model;