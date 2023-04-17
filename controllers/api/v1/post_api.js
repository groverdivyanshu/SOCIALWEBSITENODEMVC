const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res)
{

    const posts=await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
  path:'comments',
  populate:{
    path:'user'
  }
    });

    return res.status(200).json({
        message:"List of post",
        post:posts
    })
}

module.exports.destroy=async function(req,res){
    try{
  const post=await Post.findById(req.params.id);
  //id means concerting the object id into string
if(post.user==req.user.id){
    post.deleteOne();
  
    await Comment.deleteMany({post:req.params.id});
    // if(req.xhr)
    // {
    //   return res.status(200).json({
    //     data:{
    //       post_id:req.params.id
    //     },
    //     message:"Post Deleted"
    //   })
    // }
    // req.flash('success','Post and assocaited comments deleted');
    // return res.redirect('back');

  
   return res.status(200).json({
    message:"post and associated comments deletd successfully"
   })
  }
  else{
    return res.status(401).json({
      message:"You can delete post"
    })
  }
    // req.flash('error','you can delete post herer');
    // return res.redirect('back');
  
 
    }catch(err){
    //   req.flash('error','you can delete post herer');
    console.log("error is",err);
      return res.status(500).json({
        
        message:"Internal server error"
      });
    }
  
  }