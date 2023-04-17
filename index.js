const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expresslayout=require('express-ejs-layouts');
const flash=require('connect-flash');
const Custommiddleware=require('./config/middleware');
const db=require('./config/mongoose')
//use for session cookie
const session=require('express-session');
const passport=require('passport');
const loclpassport=require('./config/passport-local-strategie');
const passportJwt=require('./config/passport-jwt-startegy');
const MongoStore=require('connect-mongo');



//use express router

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(expresslayout);
app.use(express.static('./assets'))
//make the uploads available to the browser
app.use('/uploads', express.static(__dirname +'/uploads'));
app.set('layout extractStyles', true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views');

//mongo store is use to store the session cookie in db.
app.use(session({
    name:'codeial',
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1/codeial_development',
        autoRemove: 'disabled'
    }),
    function(err){
        console.log(err||'connect-mongo-db');
    }

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(Custommiddleware.setFlash);
app.use(passport.setAuthenticatedUser);
//set view engine and 

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error is coming ${err}`);

    }
    console.log(`server is ruunig up ${port}`);
});