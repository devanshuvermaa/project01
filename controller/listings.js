const Listing = require("../models/listing");
const { geocodeAddress } = require("../public/js/geocode");


module.exports.index = async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
}

module.exports.new=(req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.create = async (req, res) => {
    let coordinates = await geocodeAddress(req.body.listing.location);
    if(coordinates==null){
        req.flash("error", "Enter correct Location");
        return res.redirect("listings/new");
    }
    let {lat,lng}=coordinates;
    let url=req.file.path;
    let filename=req.file.filename;
    let newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image={url,filename};
    newlisting.coordinates=[lat,lng];
    await newlisting.save();
    req.flash("success", "New listing added");
    res.redirect("/listings");
}

module.exports.edit=async (req,res)=>{
    let id=req.params.id;
    let listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for doesn't exist");
        return res.redirect("/listings");
    }
    let origImage=listing.image.url;
    origImage=origImage.replace("/upload","/upload/w_150")
    res.render("listings/edit.ejs",{listing,origImage});
}

module.exports.update=async (req,res)=>{
    let { lat, lng } = await geocodeAddress(req.body.listing.location);
    let id = req.params.id;
    let newlisting=req.body.listing;
    if(req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        newlisting.image={url,filename};
    }
    newlisting.coordinates=[lat,lng];
    await Listing.findByIdAndUpdate(id,{...newlisting});
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
}

module.exports.delete=async (req,res)=>{
    let id=req.params.id;
    let deleted=await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("error","Listing deleted successfully");
    res.redirect("/listings");
}

module.exports.show=async (req,res)=>{
    let id=req.params.id; 
    let foundlisting= await Listing.findById(id)
        .populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!foundlisting){
        req.flash("error","Listing you requested for doesn't exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{foundlisting});
} 