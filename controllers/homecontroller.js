const Post=require('../models/post');

module.exports.home= async function(req,res){

    // console.log(req.cookies);
    // return res.render('home',{
    //     title:"divyanshu",
try{
  const post=await Post.find({}).populate('user');
  if(post)
  {
  return res.render('home',{
    title:"codeial home",
    posts:post,
  });
}
}
catch(err)
{
    console.log("Eroor is coming when fecthing posts",err);
}
    }