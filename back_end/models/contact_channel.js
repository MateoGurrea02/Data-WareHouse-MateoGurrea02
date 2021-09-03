const { DataTypes, BelongsTo } = require('sequelize');

const connection = require('../connection');


const model = connection.define(
    'contact_channel',
    {
        name: {
            type: DataTypes.STRING
        },
    },{timestamps: false}
);



module.exports = model;