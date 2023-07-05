const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    let post = await Post.create({
        content:req.body.content,
        user: req.user._id
    }).then((post)=>{
        // Check that the req is xhr or not
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post Created!"
            });
        }
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

        // delete the associated like for the post and all its comments likes too 
        await Like.deleteMany({likeable:post, onModel: 'Post'});
        await Like.deleteMany({_id:{$in: post.comments}});

        
        await post.deleteOne();

       await Comment.deleteMany({post:req.params.id}).then(()=>{

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:"Post deleted "
            })
        }
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

