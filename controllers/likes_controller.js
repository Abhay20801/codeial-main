const Comment = require('../models/comment');
const Post = require('../models/post');
const Like = require('../models/like');

module.exports.toggleLike = async function(req,res){
    try {

        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        // Why this deleted boolean is kept false
        // So that when we receive json data back based on that we can increment or decrement like count
        let deleted = 'false';

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        } else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // Check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel:req.query.type,
            user: req.user._id
        })

        // If a like Already exists then delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.deleteOne();
            deleted = true;
        }else{
            // Else Make a new Like 
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.status(200).json({
            message:"Request Successfull",
            data: {
                deleted:deleted
            }
    })
        // return res.json(200,{
        //     message:"Request Successfull",
        //     data: {
        //         deleted:deleted
        //     }
        // })

    } catch(err) {
        console.log(err);
        return res.json(500,{
            message:'Internal server Error'
        });
    }
}