const Comment = require('../models/comment');
const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user')

module.exports.create = async function(req, res) {
    try {
        const postId = req.body.post.replace(/\s/g, ''); // Remove whitespace characters
        const post = await Post.findById(postId);
        if (post) {
            const comment = await Comment.create({
                content: req.body.content,
                post: postId,
                user: req.user._id
            });
            post.comments.push(comment);
            await post.save();
            req.flash('success','Comment posted');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error','Error in creating comment');
        // console.log('Error creating comment', err);
    }
};


module.exports.destroy = async function(req,res){
    const comment = await Comment.findById(req.params.id);
    const post = await Post.findById(comment.post);
    if (comment.user == req.user.id || post.user == req.user.id){
        let postId = comment.post;
        await comment.deleteOne();

       const post = await Post.findByIdAndUpdate(postId,{
        $pull:{comments:req.params.id}});
        req.flash('success','Comment deleted');
        return res.redirect('back');
    } else{
        return res.redirect('back');
    }
}