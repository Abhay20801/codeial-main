
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
// if directory not exits create one
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// 

 const development ={
    name: 'development',
    asset_path : '/assets',
    session_cookie_key : 'blahblah',
    db: 'codeial_developement',
    smtp: {
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'abhay20801@gmail.com',
          pass: 'sgifgrbebwoknkmu',
        }
      },
      google_client_id:"353702964644-n55nla6nb3h0i6m00r7kb2hopu15o2k4.apps.googleusercontent.com",
      google_client_secret: "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",
      google_call_back_url: "http://localhost:8000/users/auth/google/callback",
      jwt_secret : 'codeial',
      morgan: {
        mode:'dev',
        options: {stream:accessLogStream}
      }
    
 }

 const production = {
    name: 'production',
    // assest_path : process.env.CODEIAL_ASSET_PATH,
    asset_path :process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.CODEIAL_GMAIL_USERNAME,
          pass: process.env.CODEIAL_GMAIL_PASSWORD,
        }
      },
      google_client_id:process.env.GOOGLE_CLIENT_ID,
      google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
      google_call_back_url: process.env.GOOGLE_CALLBACK_URL,
      jwt_secret : process.env.CODEIAL_JWT_SECRET,
      morgan: {
        mode:'combined',
        options: {stream:accessLogStream}
      }
 }

 module.exports = eval(process.env.CODEIAL_ENVIRONMENT)== undefined ? development:eval(process.env.CODEIAL_ENVIRONMENT);