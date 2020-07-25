import { body, validationResult } from 'express-validator';
import nodemailer from "nodemailer";
const he = require('he');

const contactAddress = "peelthegarlic@gmail.com";

const mailer = nodemailer.createTransport({
  service: "gmail",
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendMail = [
  body('from', 'From is required').trim().isLength({ min: 1, max: 300 }),
  body('message', 'Message is required').trim().isLength({ min: 1 }),
  body('email', 'Email is required.').trim().isLength({ min: 1 }),
  body('from').escape(),
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
    const from = he.decode(req.body.from);
    const subject = he.decode(req.body.subject);

    mailer.sendMail(
      {
        from: from,
        to: contactAddress,
        subject: `PEEL THE GARLIC: ${subject || "No subject"}`,
        text: `Message from ${from} (${req.body.email}): ${message || 'No message'}`
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