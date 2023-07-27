const mongoose = require('mongoose');

const env = require('./environment');
console.log(`${env.db}`);
mongoose.connect(`${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to the database"));

db.once('open',function(){
    console.log("Connected to the database: Mongodb");
});

module.exports = db;