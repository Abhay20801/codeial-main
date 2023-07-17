const env = require('./environment');
const fs = require('fs');

module.exports = (app) => {
    app.locals.assetPath = function(filePath){
        if(env.name=='development'){
            return filePath;
        }

        return JSON.parse(fs.readFileSync(path.join(__dirname,'../assests/rev.manifest.json')))[filePath];
    }
}