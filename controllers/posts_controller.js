const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    await Post.create({
        content:req.body.content,
        user: req.user._id
    }).then((post)=>{
        req.flash('success','Post Published');
      
        return res.redirect('back');
    }).catch((err)=>{
        req.flash('error',err);
        // console.log(`Error in creating post ${err}`); 
        return res.redirect('back');
    })
}

module.exports.destroy = async function(req,res){
    const post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if(post.user == req.user.id){
        await post.deleteOne();

       await Comment.deleteMany({post:req.params.id}).then(()=>{
        req.flash('success','Post and comment deleted');
            return res.redirect('back');
        }).catch((err)=>{
            req.flash('error',err);
            console.log(`Error deleting comments for a deleted post ${err}`);
        })

    } else{
        req.flash('error','Error you cannot delete this post');
        return res.redirect('back');
    }
}

