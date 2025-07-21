const express=require("express");
const router=express.Router();
const Listing =require("../models/listing");
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema }=require("../joi.js")
const ExpressError=require("../utils/ExpressError.js");
const { isLogedin, isOwner, validateListing } = require("../middlewares.js");
const listingController = require("../controller/listings.js");
const multer=require("multer");
const { storage, cloudinary } = require("../cloudConfig.js");
const { geocodeAddress } = require("../public/js/geocode.js");
const upload=multer({storage});


router.route("/")
    .get(wrapAsync(listingController.index))  // index route
    .post(
        isLogedin,
        validateListing,
        upload.single('listing[image]'),
        wrapAsync(listingController.create)  //Create route
    )

//New route
router.get("/new",isLogedin,listingController.new);

router.route("/:id")
    .put(isLogedin,
        isOwner,  //Update route
        validateListing,
        upload.single('listing[image]'),
        wrapAsync(listingController.update))
    .delete(isLogedin,isOwner,wrapAsync(listingController.delete))  //delete route
    .get(wrapAsync(listingController.show))  //Show route

//Edit route
router.get("/:id/edit",isLogedin,isOwner,wrapAsync(listingController.edit));

module.exports=router;