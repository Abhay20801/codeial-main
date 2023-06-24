const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps :true // this will add createdAt and updatedAt fields to the model automatically 
});

const Post= mongoose.model("post",postSchema);
module.exports= Post;