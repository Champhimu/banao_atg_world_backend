import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js'

// https://ethereal.email/create
let nodeconfig = {
    host: "smtp.ethereal.email",
    port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeconfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mailgen",
        link: "https://mailgen.js/"
    }
})

// POST: http://localhost/808/api/registerMail
export const registerMail = async(req, res) => {
    const {username, userEmail, text, subject} =req.body;

    // body of the email
    var email = {
        body: {
            name: username,
            intro: text || "Welcome to this website! WE\'re very excited to have you on board.",
            outro: "Need help, or have any question? Just reply to this email, we\'d love to help."
        }    
    }

    var emailBody = MailGenerator.generate(email);
    
    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successful..!",
        html: emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then((info) => {
            return res.status(200)
            .json({
            msg: "You should receive an email from us.", 
            info : info.messageId, 
            preview: nodemailer.getTestMessageUrl(info)
            })
        })
        .catch(error => res.status(500).send({error}))
}