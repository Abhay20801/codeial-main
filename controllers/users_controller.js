const User = require('../models/user');
const fs = require('fs');
const path = require('path');
// This is one controller which controls Many users
module.exports.profile = async function(req,res){
  const user = await User.findById(req.params.id);
    return res.render('user_profile', {
        title:"user profile",
        profile_user:user
     });
}

// Update the profile name and email
module.exports.update = async function(req,res){
  if(req.user.id == req.params.id){
    try{
   const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
   User.uploadedAvatar(req,res,function(err){
    if(err){console.log('****Error in Multer :',err);}

   user.name = req.body.name;
   user.email = req.body.email;

   if(req.file){

    if(user.avatar){
      fs.unlinkSync(path.join(__dirname,'..',user.avatar));
    }
    // This is saving the path of the uploaded file into the avatar field in the user
    user.avatar = User.avatarPath + '/' + req.file.filename;
   }
   user.save();
   return res.redirect('back');
   });

    } catch(err){
      req.flash('error',err);
      return res.redirect('back');
    }
  } else{
    return res.status(401).send('Unauthorized');
  }
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
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
  req.logOut(function(err) {
    if (err) {
      // Handle error if needed
      return res.redirect('/'); // Redirect to home page even if an error occurs
    }
    req.flash('success','You have logged Out');
    return res.redirect('/'); // Redirect to home page after successful logout
  });
 
};
