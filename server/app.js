const db = require('./db');
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import routes from "./routes";

const express = require('express');
const app = express();

app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/users', routes.users);
app.use('/api/recipes', routes.recipes);
app.use('/api/comments', routes.comments)

module.exports = app;
