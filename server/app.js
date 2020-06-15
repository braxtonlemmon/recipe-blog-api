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
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:8000',
  ],
  credentials: true
}));
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

module.exports = app;
