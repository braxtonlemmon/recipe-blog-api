import Email from '../models/email';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
const he = require('he');

const mailer = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  }
});

const indexEmails = (req, res, next) => {
  Email.find({ })
  .exec((err, emails) => {
    if (err) {
      return next(err);
    }
    return res.json({ success: true, data: emails });
  });
}

const createAddress = [
  body('address', 'Email address is required').trim().isLength({ min: 1, max: 254 }),
  body('address').escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    const email = new Email({
      address: req.body.address
    });
    if (!errors.isEmpty()) {
      res.send({ email: email, errors: errors.array() });
      return;
    }
    email.save(err => {
      if (err) {
        return next(err);
      }
      res.send(email);
    })
  }
]

const sendNewsletter = [
  body('message', 'Message is required').trim().isLength({ min: 1 }),
  body('subject', 'Subject is required.').trim().isLength({ min: 1 }),
  body('message').escape(),
  body('subject').escape(),

  (req, res, next) => {
    Email.find({ })
    .exec((err, emails) => {
      if (err) { return next(err); }
      const addresses = emails.map(emailObj => emailObj.address);

      mailer.verify(function(err, success) {
        err ? console.log(err) : console.log('server is ready');
      })
      const message = he.decode(req.body.message);
      const subject = he.decode(req.body.subject);
      const myEmail = 'peelthegarlic@gmail.com';
      mailer.sendMail(
        {
          from: myEmail,
          to: addresses,
          subject: subject,
          text: message
        },
        function (err, info) {
          if (err) return res.status(500).send(err);
          res.json({ success: true });
        }
      )
    })
  }
]

const sendNewsletterTest = [
  body("message", "Message is required").trim().isLength({ min: 1 }),
  body("subject", "Subject is required.").trim().isLength({ min: 1 }),
  body("message").escape(),
  body("subject").escape(),

  (req, res, next) => {
    mailer.verify(function(err, success) {
      err ? console.log(err) : console.log('server is ready');
    })
    const message = he.decode(req.body.message);
    const subject = he.decode(req.body.subject);
    const myEmail = 'peelthegarlic@gmail.com';
    mailer.sendMail(
      {
        from: myEmail,
        to: 'braxtonlemmon@gmail.com',
        subject: subject,
        text: message
      },
      function (err, info) {
        if (err) return res.status(500).send(err);
        res.json({ success: true })
      }
    )
  }
];

export default {
  indexEmails,
  createAddress,
  sendNewsletter,
  sendNewsletterTest
}