const mongoose = require('mongoose');

const env = require('./environment');
// MongoDB connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    // Specify the write concern mode as 'majority'
    writeConcern: {
      w: 'majority1',
      wtimeout: 0,
    },
  };
console.log(`${env.db}`,options);
mongoose.connect(`${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to the database"));

db.once('open',function(){
    console.log("Connected to the database: Mongodb");
});

module.exports = db;