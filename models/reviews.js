const { required } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    comment:{
        type : String,
    },
    rating:{
        type: Number,
        min:0,
        max:5
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
})

let Review= mongoose.model("Review",reviewSchema);
module.exports=Review;