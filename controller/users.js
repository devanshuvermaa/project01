const User = require("../models/user");

module.exports.signupForm=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signup=async (req,res)=>{
    try{
        let{username,email,password}=req.body;
        let newUser=new User({email,username});
        let registereduser=await User.register(newUser,password);
        // console.log(registereduser);

        req.login(registereduser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Travora!");
            res.redirect("/listings");
        })
        
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}

module.exports.loginForm=(req,res)=>{
    res.render("user/login.ejs");
}

module.exports.login=(req,res)=>{
        req.flash("success","Logged in successfully");
        res.redirect(res.locals.redirectUrl ||"/listings");
    }

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logged out Successfully.");
        res.redirect("/listings");
    })

}