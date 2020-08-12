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
  preview: false
  // preview: {
  //   open: {
  //     app: 'firefox',
  //     wait: false
  //   }
  // }
})

const sendNewsletter = [
  body('title').escape(),
  body('subject').escape(),
  body('description').escape(),

  (req, res, next) => {
    const { title, description, subject, imgUrl, url } = req.body;
    Email.find({ })
    .exec((err, subscribers) => {
      if (err) { return next(err); }
      subscribers.forEach(subscriber => {        
        email.send({
          template: path.join(__dirname, '..', 'emails', 'newsletter'),
          message: {
            to: subscriber.address,
            subject: `Peel the Garlic | ${subject}`,
          },
          send: true,
          locals: {
            id: subscriber.subscriberId,
            title: title,
            description: description,
            imgUrl: imgUrl,
            url: url
          }
        })
        .catch(console.error);
      })
      return res.json({ success: true });
    })
  }

]

const sendNewsletterTest = [
  body('title').escape(),
  body('subject').escape(),
  body('description').escape(),

  (req, res, next) => {
      const { title, description, subject, imgUrl, url } = req.body;
      let id = crypto
        .createHash("md5")
        .update("braxtonlemmon@gmail.com")
        .digest("hex");
      console.log(id);
      email.send({
        template: path.join(__dirname, '..', 'emails', 'newsletter'),
        message: {
          to: 'braxtonlemmon@gmail.com',
          subject: `Peel the Garlic | ${subject}`,
        },
        // send: true,
        locals: {
          id: id,
          title: title,
          description: description,
          imgUrl: imgUrl,
          url: url
        }
      })
      .then(() => {
        return res.json({ success: true })
      })
      .catch(console.error);
  }
]

const sendWelcome = [
  body('address', 'Address is required').trim().isLength({ min: 1, max: 254 }),
  body('address').escape(),

  (req, res, next) => {
    const address = req.body.address;
    let id = crypto
      .createHash("md5")
      .update(address)
      .digest("hex")
    email.send({
      template: path.join(__dirname, '..', 'emails', 'welcome'),
      message: {
        to: `<${req.body.address}>`,
        subject: 'Welcome to Peel the Garlic!'
      },
      // send: true,
      locals: {
        id: id,
        url: "https://www.peelthegarlic.com",
        imgUrl: "https://remember-to-cook.s3.us-east-2.amazonaws.com/bagnat3.jpg"
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
  sendNewsletterTest,
  sendWelcome
}