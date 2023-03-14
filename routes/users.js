const express=require('express');
const router=express.Router();

const usercontoller=require("../controllers/user_controllers");

router.get('/profile' ,usercontoller.profile);


module.exports=router;