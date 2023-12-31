const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

const env = require('./environment');
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url,
    },

    // ***********This is callback which is valid on version lesser than 6.0.0



    // function(accessToken, refreshToken, profile, done){
    //     // find a user
    //     User.findOne({email: profile.emails[0].value}).exec(function(err, user){
    //         if (err){console.log('error in google strategy-passport', err); return;}
    //         console.log(accessToken, refreshToken);
    //         console.log(profile);

    //         if (user){
    //             // if found, set this user as req.user
    //             return done(null, user);
    //         }else{
    //             // if not found, create the user and set it as req.user
    //             User.create({
    //                 name: profile.displayName,
    //                 email: profile.emails[0].value,
    //                 password: crypto.randomBytes(20).toString('hex')
    //             }, function(err, user){
    //                 if (err){console.log('error in creating user google strategy-passport', err); return;}

    //                 return done(null, user);
    //             });
    //         }

    //     }); 
    // }



    // ******** This is working and using .then
    // function(accessToken, refreshToken, profile, done) {
    //     User.findOne({ email: profile.emails[0].value })
    //       .then(user => {
    //         console.log(accessToken, refreshToken);
    //         console.log(profile);
      
    //         if (user) {
    //           // if found, set this user as req.user
    //           return done(null, user);
    //         } else {
    //           // if not found, create the user and set it as req.user
    //           return User.create({
    //             name: profile.displayName,
    //             email: profile.emails[0].value,
    //             password: crypto.randomBytes(20).toString('hex')
    //           });
    //         }
    //       })
    //       .then(user => {
    //         return done(null, user);
    //       })
    //       .catch(err => {
    //         console.log('error in google strategy-passport', err);
    //         return done(err);
    //       });
    //   },
      


    // ******** Same thing as above two using try and catch 
    async function(accessToken, refreshToken, profile, done) {
        try {
          const user = await User.findOne({ email: profile.emails[0].value });
      
          console.log(accessToken, refreshToken);
          console.log(profile);
      
          if (user) {
            // if found, set this user as req.user
            return done(null, user);
          } else {
            const newUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex')
            });
      
            return done(null, newUser);
          }
        } catch (err) {
          console.log('error in google strategy-passport', err);
          return done(err);
        }
      }
      

));


module.exports = passport;