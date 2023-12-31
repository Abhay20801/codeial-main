const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){
    
    const posts = await Post.find()
    .sort('-createdAt')
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    });
    
    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req,res){
    try{
    const post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    if(post.user == req.user.id){
        post.deleteOne();

       await Comment.deleteMany({post:req.params.id});

       return res.json(200,{
        message: "Post and assosciated comments deleted successfully"
       });
    } else{
        // req.flash('error','You cannot delete this post');
        // return res.redirect('back');
        return res.json(401,{
            message:'You cannot delete this post'
        });
    }
    } catch(err){
    
        return res.json(500,{
            
            message:"Internal Server Error"
        })
    }
}
     

    // } else{
    //     req.flash('error','Error you cannot delete this post');
    //     return res.redirect('back');
    // }
