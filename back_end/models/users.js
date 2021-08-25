const { DataTypes } = require('sequelize');

const connection = require('../connection');
const profileModel = require('../models/profile')

const model = connection.define(
    'user',
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
        profile_id:{
            type: DataTypes.INTEGER
        },
        password: {
            type: DataTypes.STRING
        }
    },{timestamps: false}
);


model.belongsTo(profileModel, {as: 'profile', foreignKey: 'profile_id'});

module.exports = model;