import Email from '../models/email';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Mail from 'email-templates';
import path from 'path';
import crypto from 'crypto';

const mailer = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const email = new Mail({
  message: {
    from: 'Peel the Garlic <peelthegarlic@gmail.com>',
  },
  transport: mailer,
  juice: true,
  juiceResources: {
    preserveImportant: true,
    webResources: {
      relativeTo: path.join(__dirname, '..', 'emails')
    }
  },
  send: true,
  preview: {
    open: {
      app: 'firefox',
      wait: false
    }
  }
})

const sendNewsletter = [
  body('title').escape(),
  body('message').escape(),
  body('imageUrl').escape(),

  (req, res, next) => {
    Email.find({ })
    .exec((err, subscribers) => {
      subscribers.forEach(subscriber => {        
        email.send({
          template: path.join(__dirname, '..', 'emails'),
          message: {
            to: subscriber.address,
            subject: req.body.subject,
          },
          locals: {
            id: subscriber.subscriberId,
          }
        })
        .then(() => {
          return res.json({ success: true })
        })
        .catch(console.error);
      })
    })
  }

]

const sendNewsletterTest = [
  body('subject').escape(),
  body('message').escape(),
  body('imageUrl').escape(),

  (req, res, next) => {
      let id = crypto
        .createHash("md5")
        .update("braxtonlemmon@gmail.com")
        .digest("hex");
      console.log(id);
      email.send({
        template: path.join(__dirname, '..', 'emails'),
        message: {
          to: 'braxtonlemmon@gmail.com',
          subject: req.body.subject,
        },
        send: true,
        locals: {
          email: 'Braxton',
          id: id
        }
      })
      .then(() => {
        return res.json({ success: true })
      })
      .catch(console.error);
  }
]

export default {
  sendNewsletter,
  sendNewsletterTest
}