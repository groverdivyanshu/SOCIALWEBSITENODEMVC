const express=require('express');
const router=express.Router();

const homecontroller=require('../controllers/homecontroller');

router.get('/',homecontroller.home);
router.use('/user',require("./users"));

module.exports=router;
