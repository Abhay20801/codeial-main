const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
// Importing a module which will help in extracting jwt from the header
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'codeial'
}

passport.use(new JWTStrategy(opts, async function(jwtPayload, done) {
   const user = await User.findById(jwtPayload._id);
    try{
        if(user){
            return done(null,user);
        } else{
            return done(null,false);
        }
    } catch(err){
        if(err){console.log('Error in finding user from JWT',err); return; }
    }  
    })
)



module.exports = passport;