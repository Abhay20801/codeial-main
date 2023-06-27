const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = async function(req,res){
    const post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if(post.user == req.user.id){
        await post.deleteOne();

       await Comment.deleteMany({post:req.params.id}).then(()=>{
            
            return res.redirect('back');
        }).catch((err)=>{
            console.log(`Error deleting comments for a deleted post ${err}`);
        })

    } else{
        return res.redirect('back');
    }
}

