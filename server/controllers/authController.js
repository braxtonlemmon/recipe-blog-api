import { body, validationResult } from 'express-validator';
import User from '../models/user';
import issueJWT from '../lib/utils';
import bcrypt from 'bcrypt';

const login = [
  body('username', 'Username is required').trim().isLength({ min: 1 }),
  body('password', 'Password is required').trim().isLength({ min: 1 }),
  body('*').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    User.findOne({ username: req.body.username })
      .then(user => {
        if (!user) {
          return res.status(400).send('user not found');
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) {
            const token = issueJWT(user);
            // res.cookie("token", token, {
            //   httpOnly: true,
            //   maxAge: 24 * 60 * 60 * 1000,
            // });
            console.log(token);
            return res.json({ token: token, name: user.username })
          } else {
            return res.send('incorrect password!');
          }
        })
      })
      .catch(err => {
        return res.status(401).send({ err: err });
      });
  }
]

const logout = (req, res, next) => {
  res.clearCookie('token');
  next();
}

export default {
  login,
  logout
}