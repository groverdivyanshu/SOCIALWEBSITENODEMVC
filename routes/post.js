const express=require('express');
const passport=require('passport');
const router=express.Router();

const postcontroller=require('../controllers/postcontroller');

router.post("/create",passport.checkAuthentication,postcontroller.create);
router.get("/destroy/:id",passport.checkAuthentication,postcontroller.destroy);


module.exports=router;