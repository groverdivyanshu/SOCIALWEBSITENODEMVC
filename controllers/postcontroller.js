const Post=require('../models/post');
const Comment=require('../models/comment');



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

module.exports.destroy=async function(req,res){
  try{
const post=await Post.findById(req.params.id);
//id means concerting the object id into string
if(post.user==req.user.id )
{
 
  post.deleteOne();

  await Comment.deleteMany({post:req.params.id});
  return res.redirect('back');
}
else
{
  return res.redirect('back');

}
  }catch(err){
    console.log("Error is coming",err);
  }

}