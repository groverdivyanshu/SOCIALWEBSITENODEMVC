const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},

 async function(email,password,done)
{
//find a user and establish the identity
try{
const user=await User.findOne({email:email});
    // if(err)
    // {
    //     console.log("Error in finding user->passport");
    //     return done(err);
    if(!user ||user.password!=password)
    {
        console.log("Invalid password");
        return done(null,false);
    }
    return done(null,user);
}
catch(err)
{
console.log("Error is coming in passport");
return;
}
})
);

//seralize the user to decide which key is to be kept in cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserilaize the user from key in the cookies

passport.deserializeUser(
    async function(id,done){
        try{
   const user=await User.findById(id)
   {
        // if(err)
        // {
        // console.log("Error in finding user->passport");
        // return done(err);
        // }
     
        return done(null,user);
   }
}catch(err)
   {
    console.log("Error in finding user->passport");
    return done(err);
   }
    });

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next)
{
    // if the user is signed in, then pass on request to the next function(contoller action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in
    return res.redirect('/user/sign_in');
}
//

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
    
        //req.user contains the current signed user from the session of cookie and we are just sending this locals to views.
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;