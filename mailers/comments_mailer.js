const nodemailer = require('../config/nodemailer');


// This is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer');
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from: 'abhay20801@gmail.com',      
        to: 'abhay2080@gmail.com',
        subject: 'New Comment Published !!',
        html: htmlString
    },(err,info) => {
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        console.log('Message sent',info);  
        return;
    });
}