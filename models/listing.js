const { object } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
let Review=require("./reviews");

let listingschema= new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        url:String,
        filename:String
    },
    price:Number, 
    location:String,
    country:String,
    reviews:[{
        type : Schema.Types.ObjectID,
        ref:"Review"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    coordinates:[Number],
})

listingschema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})

let Listing=mongoose.model('Listing',listingschema);

module.exports=Listing;