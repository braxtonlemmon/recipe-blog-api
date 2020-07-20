const db = require('./db');
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from 'morgan';
import compression from "compression";
import helmet from "helmet";
import routes from "./routes";
import passport from 'passport';
import cors from 'cors';

const express = require('express');
const app = express();

require('./config/passport');

app.use(passport.initialize());

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:9000',
    'http://localhost:5000',
    'https://peelthegarlic-admin.netlify.app',
    'https://www.peelthegarlic.com',
  ],
}));



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// })

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(compression());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/users', routes.users);
app.use('/api/recipes', routes.recipes);
app.use('/api/comments', routes.comments)
app.use('/api/auth', routes.auth);
app.get('/api/me', passport.authenticate('jwt', { session: false, failWithError: true }), (req, res, next) => {
  return res.json({ success: true, user: req.user.username });
})
module.exports = app;
