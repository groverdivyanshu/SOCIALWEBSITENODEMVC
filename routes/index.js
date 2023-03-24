const express=require('express');
const router=express.Router();

const homecontroller=require('../controllers/homecontroller');
 
router.get('/',homecontroller.home);
router.use('/user',require("./users"));
router.use('/posts',require('./post'))

module.exports=router;
