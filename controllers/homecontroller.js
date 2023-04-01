const Post=require('../models/post');
const User=require('../models/user');

module.exports.home= async function(req,res){

    // console.log(req.cookies);
    // return res.render('home',{
    //     title:"divyanshu",
try{
    // find the user who posted 
  const post=await Post.find({}).populate('user')
  .populate({
path:'comments',
populate:{
  path:'user'
}
  });
  if(post)
  {
  const user=  await User.find({});
  return res.render('home',{
    title:"codeial home",
    posts:post,
    alluser:user
  });
}
}
catch(err)
{
    console.log("Eroor is coming when fecthing posts",err);
}
    }