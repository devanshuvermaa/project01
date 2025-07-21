const express=require("express");
const router=express.Router({mergeParams:true});
const Review=require("../models/reviews.js");
const wrapAsync=require("../utils/wrapAsync.js");
const { reviewSchema}=require("../joi.js")
const ExpressError=require("../utils/ExpressError.js");
const Listing =require("../models/listing");
const { isLogedin, isAuthor } = require("../middlewares.js");
const reviewController = require("../controller/review.js");

const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errmsg);
    }else{
        next();
    }
}

//Reviews
//create route
router.post("/",isLogedin,validateReview,wrapAsync(reviewController.create));

//delete route
router.delete("/:reviewId",isLogedin,isAuthor,wrapAsync(reviewController.delete));

module.exports=router;