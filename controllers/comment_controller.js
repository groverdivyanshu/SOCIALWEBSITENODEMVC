const Comment=require('../models/comment');
const Post=require('../models/post');



module.exports.create= async function(req,res)

{
    try{
    const post=await Post.findById(req.body.post);
    if(post)
    {
     
        const comment=await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id,
        })

        post.comments.push(comment);
        post.save();
if(req.xhr)
{
    console.log("hi");
   return res.status(200).json({
    data:{
        comments:comment,
        user:req.user,
       
    },
     message:"comment passed",
   })
   

}




    return res.redirect('/');
        
    }
}
catch(err)
{
    console.log("Error is coming", err); 
}
}

 module.exports.destroy= async function(req,res)
 {
const comment=await Comment.findById(req.params.id);
// console.log(comment);

if(comment.user == req.user.id)
{
   
    let postid=comment.post;
    
    comment.deleteOne();  
    
    await Post.findByIdAndUpdate(postid,{ $pull:{comments:req.params.id}});
    if(req.xhr)
    {
        console.log("req is coming");
        return res.status(200).json({

            data:{
                comments:comment,
                commentpost:comment.post,
            },
            message:"comments got it",
        })
       
    }
        return res.redirect('back');

}
else{
    return res.redirect('back');

}

 }

