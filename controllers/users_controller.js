const User = require('../models/user');

// This is one controller which controls Many users
module.exports.profile = function(req,res){
    return res.render('user_profile', {
        title:"user profile",
     });
}

// Sign Up Controller
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }

    return res.render('user_signup',{
        title: "Codeial || Sign Up"
    });
}

// Sign In Controller
module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
    return res.render('user_signin',{
        title: "Codeial || Sign In"
    });
}


// Error that Find one callback is depreceated Older code is:-
// module.exports.create = async function(req,res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }

//    await User.findOne({email:req.body.email}, async function(err,user){
//         if(err){console.log("Error in finding the user in signing up");  return; }
//         // If user is not there then create a new user
//         if(!user){
//           await User.create(req.body, async function(err,user){
//                 if(err){console.log("Error in Creating User while signing up");  return; }

//                 return res.redirect('/users/sign-in');
//             })
//         }
//         // If user is there redirect to sign up Page
//         else{
//             return res.redirect('back');
//         }
//     }) 
// }





// Get the sign Up data
module.exports.create = async function (req, res) {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        await User.create(req.body);
        return res.redirect('/users/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log("Error in finding/creating user while signing up", err);
      return res.redirect('back');
    }
  };
  
// Sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
  req.logOut(function(err) {
    if (err) {
      // Handle error if needed
      return res.redirect('/'); // Redirect to home page even if an error occurs
    }

    return res.redirect('/'); // Redirect to home page after successful logout
  });
};
