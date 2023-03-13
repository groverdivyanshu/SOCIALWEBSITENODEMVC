const express=require('express');
const app=express();
const port=8000;

app.listen(port,function(err){
    if(err)
    {
        console.log(`error is coming ${err}`);

    }
    console.log(`server is ruunig up ${port}`);
});