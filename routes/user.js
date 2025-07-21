const express=require("express");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveUrl } = require("../middlewares");
const userController = require("../controller/users");
const router=express.Router();

router.get("/signup",userController.signupForm)

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",userController.loginForm);

router.post("/login",
    saveUrl,
    passport.authenticate("local",
        {
            failureFlash:true,
            failureRedirect:"/login"
    }),
    userController.login 
)

router.get("/logout",userController.logout)

module.exports=router;