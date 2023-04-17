const express=require('express');
const router=express.Router();

const usercontoller=require("../controllers/user_controllers");
const passport=require('passport'); 

router.get('/profile/:id' ,passport.checkAuthentication,  usercontoller.profile);
router.get('/sign_in',usercontoller.sign_in);
router.get('/sign_up',usercontoller.sign_up);
router.post('/update/:id',usercontoller.update);
router.post('/create',usercontoller.create);
router.get('/sign_out',usercontoller.destroysession)
//use passport to authentictae to user
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign_in'},
),usercontoller.createsession)



router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),usercontoller.createsession);
module.exports=router;
