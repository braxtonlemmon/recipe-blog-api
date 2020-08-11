import Email from '../models/email';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';

const emailsTotalCount = (req, res, next) => {
  Email.find({ })
  .exec((err, emails) => {
    if (err) { return next(err); }
    return res.json({ success: true, count: emails.length});
  });
}

const getEmail = (req, res, next) => {
  const id = req.params.id;
  Email.findOne({ subscriberId: id})
  .exec((err, subscriber) => {
    if (err) { return next(err); }
    if (!subscriber) {
      return res.status(400).send("Subscriber not found");
    }

    return res.status(200).send({ success: true, address: subscriber.address })
  })
}

const createAddress = [
  body('address', 'Email address is required').trim().isLength({ min: 1, max: 254 }),
  body('address').escape(),

  (req, res, next) => {
    Email.findOne({ address: req.body.address})
    .exec((err, subscriber) => {
      if (err) { return next(err); }
      if (subscriber) {
        return res.send({ success: false, message: 'Subscriber already exists!'});
      }
      const address = req.body.address;
      const id = crypto.createHash('md5').update(address).digest('hex');
      const errors = validationResult(req);
      
      const email = new Email({
        address: address,
        subscriberId: id
      });
      if (!errors.isEmpty()) {
        res.send({ email: email, errors: errors.array() });
        return;
      }
      email.save(err => {
        if (err) {
          return next(err);
        }
        res.send({ success: true, message: 'Email added!'});
      })
    })
  }
]

const deleteAddress = (req, res, next) => {
  const subscriberId = req.params.id;
  Email.findOne({ subscriberId: subscriberId })
  .exec((err, subscriber) => {
    if (err) { return next(err); }
    if (!subscriber) {
      return res.status(400).send("Subscriber not found");
    }
    const id = subscriber._id;
    console.log(id);
    Email.findByIdAndRemove(id, function deleteSubscriber(err) {
      if (err) { return next(err); }
      return res.status(200).send('Subscriber deleted');
    })
  })
}


export default {
  emailsTotalCount,
  getEmail,
  createAddress,
  deleteAddress
}