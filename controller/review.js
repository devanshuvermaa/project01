const Listing =require("../models/listing");
const Review=require("../models/reviews.js");

module.exports.create=async (req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author=req.user._id;
    listing.reviews.push(newreview);

    await newreview.save();
    await listing.save();
    req.flash("success","New Review added");
    res.redirect(`/listings/${listing._id}`);
    // res.render("listings/reviews.ejs",{newreview,id});
}

module.exports.delete=async (req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
}