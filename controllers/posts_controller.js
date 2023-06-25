const Post = require('../models/post');

module.exports.create = async function(req,res){
    await Post.create({
        content:req.body.content,
        user: req.user._id
    }).then((post)=>{
        console.log('Post created successfully')
        return res.redirect('back');
    }).catch((err)=>{
        console.log(`Error in creating post ${err}`); 
        return;
    })
}

