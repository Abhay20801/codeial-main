const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;


// Require USer Or Find user
const User = require('../models/user');

// Authentication using Passort
// * it contains some inbuilt function
passport.use(new LocalStrategy({
    usernameField: 'email', 
    passReqToCallback: true,
    },
   async function(req,email,password,done){
        // Find the user and establish the identity
        //:email belongs to which is passed on
        // Whenever passport is called email and password is automatically passed on from where we'll see
  
        const user = await User.findOne({email:email});
        try{
           if(!user || user.password != password){
                req.flash('error','Invalid Username/password');
                return done(null,false);
            }

            // If user Found
            return done(null,user);
        } catch (err){
            if(err){
                req.flash('error',err)
                return done (err);
            }
        }
        }   
    ));

    // Serialize the user to decide which key is to be kept in the cookies
    passport.serializeUser(function(user,done){
        done(null,user.id);
    })

    // Deserialize the user from the key in the cookies
    passport.deserializeUser(function(id,done){
        // Find the user if its in the db
        User.findById(id).then((user)=>{
            return done(null,user); 
    }).catch((err)=>{
        console.log("Error in finding the user",err);
        return done (err);
    })

});

// Check if the user is authenticated used as middleware
passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
      return next();
   }
//    If the user is not signed-in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}


// Only Exporting the passport not the strategy
module.exports= passport