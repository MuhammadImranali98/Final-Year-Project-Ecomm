const nodeMailer = require("nodemailer");

const  sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSOWORD,
        },
      
        
    });

    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,

    };
    console.log('these are mail options ',mailOptions)

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;