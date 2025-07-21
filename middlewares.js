const { listingSchema } = require("./joi");
const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError");


module.exports.isLogedin=(req,res,next)=>{
    // console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl; 
        req.flash("error","Log in first!");
        return res.redirect("/login");
    }
    next();
}

//passport reset the session after authentication will be done so i have to store it in res.locals
module.exports.saveUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next(); 
}

module.exports.isOwner=async(req,res,next)=>{
    let id=req.params.id;
    let listing= await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not allowed to tamper this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor=async (req,res,next)=>{
    // console.log(req.user);
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`)
    }
    next();
}

//Validate using JOI
module.exports.validateListing=(req,res,next)=>{
    let{error} = listingSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        // console.log(error,errmsg);
        throw new ExpressError(400,errmsg);

    }else{
        next();
    }
} 