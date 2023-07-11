 
 const development ={
    name: 'development',
    assest_path : './assests',
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
      
    
 }

 const production = {
    name: 'production'
 }

 module.exports = development;