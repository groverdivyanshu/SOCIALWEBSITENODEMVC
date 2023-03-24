const Post=require('../models/post');
module.exports.create= async function(req,res)
{
    try{
const post=await Post.create({
    content:req.body.content,
    user:req.user._id})

  if(post)
  {
    return res.redirect('back');  
  }

    
    }

catch(err)
{
    console.log("POst error is comigg");
    return;
}
}