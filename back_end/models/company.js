const { DataTypes } = require('sequelize');

const connection = require('../connection');
const cityModel = require('./cities')

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
        city_id:{
            type: DataTypes.INTEGER
        }
    },{timestamps: false}
);


model.belongsTo(cityModel, {as: 'city', foreignKey: 'city_id'});

module.exports = model;