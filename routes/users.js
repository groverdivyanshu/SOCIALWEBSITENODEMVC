const express=require('express');
const router=express.Router();

const usercontoller=require("../controllers/user_controllers");
const passport=require('passport'); 

router.get('/profile' ,passport.checkAuthentication,  usercontoller.profile);
router.get('/sign_in',usercontoller.sign_in);
router.get('/sign_up',usercontoller.sign_up);
router.post('/create',usercontoller.create);
router.get('/sign_out',usercontoller.destroysession)
//use passport to authentictae to user
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign_in'},
),usercontoller.createsession)


module.exports=router;