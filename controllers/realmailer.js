import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';
// const {EMAIL, PASSWORD} = require('../config.js');

// send mail from real gmail account
let config ={
    service: "gmail",
    auth: {
      user: ENV.EMAIL, 
      pass: ENV.PASSWORD, 
    }
}

let transporter = nodemailer.createTransport(config);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "ATG.WORLD",
        link: "https://mailgen.js/"
    }
})

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
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({error}))
}