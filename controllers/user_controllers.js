
const User=require("../models/user");


module.exports.profile= async function(req,res)
{
   const user=await User.findById(req.params.id)
    return res.render('user',{
        title:"new user page",
        profileuser:user
    });
}

module.exports.update= async function(req,res)
{
    try{

if(req.user.id==req.params.id)
{
   const user =await User.findByIdAndUpdate(req.params.id,req.body);
  return res.redirect('back');    
}
else
{
    return res.status(401).send('Unauthorize');
}
    }catch(err){
        console.log("error is coming",err);
    }
}

//Render the signin page
module.exports.sign_in=function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user-sigin',{
        title:"codeial sigin page",
    })
}


//Render the signup page
module.exports.sign_up=function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('usersignup',{
        title:"codeial sigup page",
    })
}
//get the signup data
module.exports.create= async function(req,res)
{
 try{     
if(req.body.password!=req.body.confirmpassword)
{
    return res.redirect('back');
}

const user=await User.findOne({email:req.body.email})

if(!user)
{
    const newuser=await User.create(req.body);
    if(newuser)
    {
        return res.redirect('/user/sign_in');
    }
    
}
 }
 catch(err)
 {
    console.log("Error is coming",err);
    return;
 }
}
// module.exports.create=function(req,res)
// {
// User.findOne({email:req.body.email})
// .then((user)=>{
//     if(!user)
//     {
//     User.create(req.body)
//     .then((newuser)=>{
//         return res.redirect('/user/sign_in');
        
//     })
//     .catch((err)=>{
//         console.log("error is comig00");
//         return;
//     })
//     }
// }).catch((err)=>{
//     console.log("Error is coming",err);
// })
// }
    //  function(err,user){
    // if(err){
    //     console.log("error is finding to user")
    //     return;
    // }
    // if(!user)
    // {
    //     User.create(req.body,function(err,user){
    //     if(err)
    //     {
    //         console.log("Error is coming while signup the user");
    //         return;
    //     }

// return res.redirect('/user/sign_in');
//         })
//     }
//     else
//     {
//         return res.redirect('back'); 
//     }

// }








//sigin and create session for the user
module.exports.createsession=function(req,res)
{

   return res.redirect('/');
}

//signout user

module.exports.destroysession=function(req,res,next){

    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
})
}