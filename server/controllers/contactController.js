import { body, validationResult } from 'express-validator';
import nodemailer from "nodemailer";
const he = require('he');

const contactAddress = "hello@peelthegarlic.com";

const mailer = nodemailer.createTransport({
  service: "mail.privateemail.com",
  host: 'mail.privateemail.com',
  port: 587,
  auth: {
    user: process.env.NAMECHEAP_EMAIL_ADDRESS,
    pass: process.env.NAMECHEAP_EMAIL_PASSWORD,
  },
});

const sendMail = [
  body('email', 'Email is required.').trim().isLength({ min: 1 }),
  body('subject').escape(),
  body('message').escape(),
  body('email').escape(),
  
  (req, res, next) => {
    mailer.verify(function(err, success) {
      if (err) {
        console.log(err);
      } else {
        console.log('server is ready');
      }
    })
    const message = he.decode(req.body.message);
    const subject = he.decode(req.body.subject);

    mailer.sendMail(
      {
        from: `Peel the Garlic <${contactAddress}>`,
        to: contactAddress,
        subject: `PEEL THE GARLIC: ${subject || "No subject"}`,
        text: `Message from ${req.body.email}: ${message || 'No message'}`
      },
      function (err, info) {
        if (err) return res.status(500).send(err);
        res.json({ success: true })
      }
    )
  }
]
  
export default {
  sendMail
}