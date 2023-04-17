const passport=require('passport');
const googlestartegy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const { doesNotMatch } = require('assert');

// tel passport to use new startegy for google login
passport.use(new googlestartegy({

clientID:"606662151732-g0ab5q1qsvv7201i1ndg5hqdbrqmuiva.apps.googleusercontent.com",
clientSecret:"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",
callbackURL:"http://localhost:8000/users/auth/google/callback",
},
async function(accessToken, refreshToken, profile, cb)
{
try{
    //find the user
const user=await user.findOne({email:profile.emails[0].value});
if(user)
{
    // if found ,set this user as req.user
    return done(null,user);
}
else{
    try{
        // if not found, create the user and set it as req.user
   await User.create({
        name:profile.displayName,
        email:profile.emails(0).value,
        password:crypto.randomBytes(20).toString('hex')
    })
}catch(err)
{
    console.log("Error is coming creating user in google startegy-passport",err);
return;
}
return done(null,user);
}


}catch(err)
{
console.log("Error in google startegy-passport",err);
return;
}


}
))
module.exports=passport;