const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "workout-log", "postgres", "e15d03bf01fa45d692ef258276297e67", {
        host: 'localhost',
        dialect: 'postgres'
    });
sequelize.authenticate().then(
    function(){
        console.log('Connected to workout-log postgress database');
    },
    function(err){
        console.log(err);
    }
);
module.exports = sequelize;