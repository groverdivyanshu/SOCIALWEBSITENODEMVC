const express=require('express');
const app=express();
const port=8000;
const expresslayout=require('express-ejs-layouts');
app.use(expresslayout);
app.use(express.static('./assets'))
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));


//set view engine and view
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`error is coming ${err}`);

    }
    console.log(`server is ruunig up ${port}`);
});