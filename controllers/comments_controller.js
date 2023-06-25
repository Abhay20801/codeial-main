const Comment = require('../models/comment');
const mongoose = require('mongoose');
const Post = require('../models/post');

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
            res.redirect('/');
        }
    } catch (err) {
        console.log('Error creating comment', err);
    }
};
