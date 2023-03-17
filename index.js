const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expresslayout=require('express-ejs-layouts');

const db=require('./config/mongoose')

//use express router

app.use(express.urlencoded());

app.use(cookieParser());
app.use(expresslayout);
app.use(express.static('./assets'))
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);
//set view engine and 
app.use('/',require('./routes'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`error is coming ${err}`);

    }
    console.log(`server is ruunig up ${port}`);
});