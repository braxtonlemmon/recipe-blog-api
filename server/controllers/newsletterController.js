import Email from '../models/email';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Mail from 'email-templates';
import path from 'path';
import crypto from 'crypto';
import async from 'async';
import pug from 'pug';
// const mailer = nodemailer.createTransport({
//   // name: "smtp.gmail.com",
//   service: "gmail",
//   // host: "smtp.gmail.com",
//   // port: 587,
//   auth: {
//     user: process.env.GMAIL_ADDRESS,
//     pass: process.env.GMAIL_PASSWORD,
//   },
// });

const mailer = nodemailer.createTransport({
  name: "mail.privateemail.com",
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  pool: true,
  maxMessages: Infinity,
  maxConnection: 8,
  auth: {
    user: process.env.NAMECHEAP_EMAIL_ADDRESS,
    pass: process.env.NAMECHEAP_EMAIL_PASSWORD
  }
})

const email = new Mail({
  message: {
    from: 'Peel the Garlic <hello@peelthegarlic.com>',
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
    Email.find({})
      .exec((err, subscribers) => {
        if (err) { return next(err); }
        const allSubscribers = subscribers.map(subscriber => subscriber);
        const pugPath = path.join(__dirname, '..', 'emails', 'newsletter', 'html.pug');
        console.log(pugPath);
        const compiledFunction = pug.compileFile(pugPath);

        async.each(allSubscribers, function (subscriber, callback) {
          console.log(subscriber.address);
          const pugHtml = compiledFunction({
            id: subscriber.subscriberId,
            title: title,
            description: description,
            imgUrl: imgUrl,
            url: url
          })

          const msg = {
            from: 'Peel the Garlic <hello@peelthegarlic.com>',
            subject: subject,
            to: subscriber.address,
            html: pugHtml
          }

          mailer.sendMail(msg, function (err) {
            console.log('here we are');
            if (err) {
              console.log(`Sending to ${subscriber.address} failed. ${err}`);
              callback(err);
            } else {
              console.log(`Sent to ${subscriber.address}.`);
              callback();
            }
          });
        }, function (err) {
          if (err) {
            console.log("Sending to all emails failed:" + err);
          }
          return res.json({ success: true })
        })
      })
  }

]

// const sendNewsletter = [
//   body('title').escape(),
//   body('subject').escape(),
//   body('description').escape(),

//   (req, res, next) => {
//     const { title, description, subject, imgUrl, url } = req.body;
//     Email.find({ })
//     .exec((err, subscribers) => {
//       if (err) { return next(err); }
//       console.log(subscribers);
//       subscribers.forEach(subscriber => {  
//         console.log(subscriber.address)
//         const groupMail = new Mail({
//           message: {
//             from: 'Peel the Garlic <hello@peelthegarlic.com>',
//           },
//           transport: mailer,
//           juice: true,
//           juiceResources: {
//             preserveImportant: true,
//             webResources: {
//               relativeTo: path.join(__dirname, '..', 'emails')
//             }
//           },
//           send: true,
//           preview: false,
//           template: path.join(__dirname, '..', 'emails', 'newsletter'),
//           message: {
//             to: subscriber.address,
//             subject: `Peel the Garlic | ${subject}`,
//           },
//           locals: {
//             id: subscriber.subscriberId,
//             title: title,
//             description: description,
//             imgUrl: imgUrl,
//             url: url
//           }
//         })     

//         groupMail.send()
//         .then(response => console.log(response))
//         .catch(console.error);
//       })
//       return res.json({ success: true });
//     })
//   }

// ]

// const sendNewsletter = [
//   body('title').escape(),
//   body('subject').escape(),
//   body('description').escape(),

//   (req, res, next) => {
//     const { title, description, subject, imgUrl, url } = req.body;
//     Email.find({})
//       .exec((err, subscribers) => {
//         if (err) { return next(err); }
//         const toList = subscribers.map(subscriber => subscriber.address);

//         email.send({
//           template: path.join(__dirname, '..', 'emails', 'newsletter'),
//           message: {
//             to: toList,
//             subject: `Peel the Garlic | ${subject}`,
//             dsn: {
//               id: 'asdfjkl',
//               return: 'headers',
//               notify: ['failure', 'delay'],
//               recipient: 'hello@peelthegarlic.com'
//             }
//           },
//           locals: {
//             id: 'asdf',
//             title: title,
//             description: description,
//             imgUrl: imgUrl,
//             url: url
//           }
//         })
//         .then(response => {
//           mailer.close();
//           console.log(response)
//         })
//         .catch(console.error);

//         return res.json({ success: true });
//       })
//   }

// ]

// const sendNewsletterTest = [
//   body('title').escape(),
//   body('subject').escape(),
//   body('description').escape(),

//   (req, res, next) => {
//       const { title, description, subject, imgUrl, url } = req.body;

//       let id = crypto
//         .createHash("md5")
//         .update("braxtonlemmon@gmail.com")
//         .digest("hex");
//       console.log(id);
//       email.send({
//         template: path.join(__dirname, '..', 'emails', 'newsletter'),
//         message: {
//           to: ['braxtonlemmon@gmail.com', 'expiredmomentum@gmail.com'],
//           subject: `Peel the Garlic | ${subject}`,
//         },
//         // send: true,
//         locals: {
//           id: id,
//           title: title,
//           description: description,
//           imgUrl: imgUrl,
//           url: url
//         }
//       })
//       .then(() => {
//         mailer.close();
//         return res.json({ success: true })
//       })
//       .catch(console.error);
//   }
// ]

const sendNewsletterTest = [
  body('title').escape(),
  body('subject').escape(),
  body('description').escape(),

  (req, res, next) => {
    const { title, description, subject, imgUrl, url } = req.body;

    const emails= ['braxtonlemmon@gmail.com', 'expiredmomentum@gmail.com'];
    
    
    async.each(emails, function(to, callback) {
      const msg = {
        from: 'Peel the Garlic <hello@peelthegarlic.com',
        subject: 'alright',
        text: 'hey there',
        to: to
      }
      mailer.sendMail(msg, function(err) {
        if (err) {
          console.log(`Sending to ${to} failed. ${err}`);
          callback(err);
        } else {
          console.log(`Sent to ${to}.`);
          callback();
        }
      });
      }, function(err) {
        if (err) {
          console.log("Sending to all emails failed:" + err);
        }
          return res.json({ success: true })
    })
    // async function main() {

    //   let id = crypto
    //   .createHash("md5")
    //   .update("braxtonlemmon@gmail.com")
    //   .digest("hex");
    //   console.log(id);
    //   let info = await mailer.sendMail({
    //     from: 'Peel the Garlic <hello@peelthegarlic.com',
    //     to: "braxtonlemmon@gmail.com, expiredmomentum@gmail.com",
    //     subject: subject,
    //     text: description,
    //   })
    // }
    // main()
    // .then(() => {
    //   return res.json({ success: true })
    // })
    // .catch(console.error);

    // email.send({
    //   template: path.join(__dirname, '..', 'emails', 'newsletter'),
    //   message: {
    //     to: ['braxtonlemmon@gmail.com', 'expiredmomentum@gmail.com'],
    //     subject: `Peel the Garlic | ${subject}`,
    //   },
    //   // send: true,
    //   locals: {
    //     id: id,
    //     title: title,
    //     description: description,
    //     imgUrl: imgUrl,
    //     url: url
    //   }
    // })
    //   .then(() => {
    //     mailer.close();
    //     return res.json({ success: true })
    //   })
    //   .catch(console.error);
  }
]


// CURRENTLY IN USE, but TODO: unsubscribe url removes email from MongoDB, but needs to notify me (via email?) of unsubscribe to remove from sendgrid, or needs to use sendgrid API to remove apply 'global unsubscribe'
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
        imgUrl: "https://remember-to-cook.s3.us-east-2.amazonaws.com/family+(1).jpg"
      }
    })
    .then(() => {
      mailer.close();
      return res.json({ success: true })
    })
    .catch(console.error);
  }
]

const informUnsubscribe = (req, res, next) => {
  Email.findOne({ subscriberId: req.body.subscriberId })
  .exec((err, subscriber) => {
    if (err) { return next(err); }
    if (!subscriber) {
      return res.status(400).send("Subscriber not found!");
    }
    const emailToRemove = subscriber.address;
    email.send({
      message: {
        to: `<hello@peelthegarlic.com>`,
        subject: 'REMOVAL',
        text: `Remove ${emailToRemove}`
      }
    })
    .then(() => {
      mailer.close();
      return res.json({ success: true })
    })
    .catch(console.error);
  })
}

export default {
  sendNewsletter,
  sendNewsletterTest,
  sendWelcome,
  informUnsubscribe
}