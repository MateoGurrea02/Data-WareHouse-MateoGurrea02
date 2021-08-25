const { DataTypes } = require('sequelize');

const connection = require('../connection');

const model = connection.define(
    'region',
    {
        name: {
            type: DataTypes.STRING
        }
    },{timestamps: false}
);

module.exports = model;