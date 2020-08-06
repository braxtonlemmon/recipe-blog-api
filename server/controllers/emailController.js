import Email from '../models/email';
import { body, validationResult } from 'express-validator';

const indexEmails = (req, res, next) => {
  Email.find({ })
  .exec((err, emails) => {
    if (err) {
      return next(err);
    }
    return res.json({ success: true, data: emails });
  });
}

const createEmail = [
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

export default {
  indexEmails,
  createEmail
}