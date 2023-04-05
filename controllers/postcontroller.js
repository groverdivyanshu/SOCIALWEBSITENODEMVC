const Post=require('../models/post');
const Comment=require('../models/comment');
const { json } = require('express');



module.exports.create= async function(req,res)
{
    try{
      
const post=await Post.create({


    content:req.body.content,
    user:req.user._id})
    post.populate('user','-password');
    req.flash('success','Post published');
  if(post)
  {
    if(req.xhr)
    {
      return res.status(200).json({
        data:{
          post:post
        },
        message:"Post created!"
      })
    }
 
    return res.redirect('back'); 
    // return res.status(200).json({
    //   message:"post created",
    //   postkey:post
    // }) 
  }

    
    }

catch(err)
{
  req.flash('error','err');
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
  if(req.xhr)
  {
    return res.status(200).json({
      data:{
        post_id:req.params.id
      },
      message:"Post Deleted"
    })
  }
  req.flash('success','Post and assocaited comments deleted');
  return res.redirect('back');
}
else
{
  req.flash('error','you can delete post herer');
  return res.redirect('back');

}
  }catch(err){
    req.flash('error','you can delete post herer');
    return res.redirect('back');
  }

}