const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'queue_bot',
    'root',
    'root',
    {
        host: '37.9.4.179',
        port: 5432,
        dialect: 'postgres'
    }
)