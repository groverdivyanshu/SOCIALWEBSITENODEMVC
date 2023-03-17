const express=require('express');
const router=express.Router();

const usercontoller=require("../controllers/user_controllers");

router.get('/profile' ,usercontoller.profile);
router.get('/sign_in',usercontoller.sign_in);
router.get('/sign_up',usercontoller.sign_up);
router.post('/create',usercontoller.create);

module.exports=router;