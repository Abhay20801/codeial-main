const express = require('express');
// require morgan . it work as logger
const logger = require('morgan');
const env = require('./config/environment');
const app = express();

const port = 8000;

require('./config/view-helpers')(app);

const cookieParser = require('cookie-parser');

const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

const cors = require('cors')
app.use(cors())

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// Passport-jwt
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');

// Require sass 
const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');
const customMware = require('./config/middleware');

const passportGoogle = require('./config/passport-google-oauth2-strategy');
// Require socket server
// Setup the chat server to be used with socket.io

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);



chatServer.listen(5000);
console.log('Chat Server is listening on port 5000');
const path = require('path');
if(env.name == 'development'){
app.use(sassMiddleware({
    src: path.join(__dirname,env.asset_path,'scss'),
    dest: path.join(__dirname,env.asset_path,'css'),
    debug: false,
    outputStyle:'extended',
    prefix:'/css'
}))
}

// Reading through POST request
app.use(express.urlencoded({extended:false}));

// Setup The cookieParser
app.use(cookieParser());
// Setup the static file
// First we tell app in which folder to look for static files
app.use(express.static(__dirname+"/assets"));

app.use(express.static(env.asset_path));
app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayout);

// Extract styles and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Connect upload folder so that server can access it
  app.use('/uploads',express.static(__dirname+'/uploads'));
// Set up the view engine
   app.set('view engine','ejs');
    app.set('views','./views');


// Middleware which takes the session cookies & encrypts it
// mongo store is used to store the session cookie in the db
app.use(session({
    // Name of cookie or software
    name:'codeial',
    // ToDO: Change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie: {
        // No of seconds in ms
        maxAge: (1000 * 60 * 1000)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/codeial_developement',
            //  mongooseConnection:db,
            autoRemove : 'disabled'
        
    },
    function(err){
        console.log(err || 'connect mongoose setup ok');
    }
    )

}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

// After the set of session because flash is stored in session cookies
app.use(flash());
app.use(customMware.setFlash);
   // Use Express route
   app.use('/',require('./routes/index'));
  
app.listen(port,function(err){
    if(err){
        console.log(`Error in rinning the server: ${port}`);
    }

    console.log(`Server is running on port: ${port}`);
});
