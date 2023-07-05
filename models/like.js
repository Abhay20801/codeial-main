const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
    },
    // This defines the Object Id of liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    // This field is used for defining the type of liked object,since this is a dynamic referance
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps: true
});

// Tell mongoose that this is schema
const Like = mongoose.model('Like',likeSchema);

module.exports = Like;