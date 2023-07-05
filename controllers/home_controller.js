const Post = require("../models/post");

const User = require('../models/user');


module.exports.home = async function (req, res) {
  const posts = Post.find()
    .sort('-createdAt')
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      },
      populate: {
        path:'likes'
      }
    }).populate('likes')
    .exec()
    .then(async (posts) => {
      // console.log(posts);
      const users = await User.find().then((users)=>{
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
          all_users:users
        } )
      })
    })
    
    .catch((err) => {
      console.error("Error in sending post to home page");
      throw err;
    });
};

// return res.end("<h1>Ecpress is up for codeial!</h1>");
//  console.log(req.cookies);
//  res.cookie('user_id',25);
// Populate the user of each post

// Post.find({}).populate('user').exec(function(err,posts){
//     return res.render('home',{
//         title:'Codeial | Home',
//         posts : posts
//     });
// })
