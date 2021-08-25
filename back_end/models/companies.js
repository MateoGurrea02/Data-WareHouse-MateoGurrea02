const { DataTypes } = require('sequelize');

const connection = require('../connection');
const countryModel = require('../models/country')

const model = connection.define(
    'company',
    {
        name: {
            type: DataTypes.STRING
        },
        direction: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        country_id:{
            type: DataTypes.INTEGER
        }
    },{timestamps: false}
);


model.belongsTo(countryModel, {as: 'country', foreignKey: 'country_id'});