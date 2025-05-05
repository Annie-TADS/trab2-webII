import express from 'express';
import session from 'express-session';
import 'dotenv/config';

import authRouter from './routers/auth.routes.js';
import usersRouter from './routers/users.routes.js';
import phonesRouter from './routers/phones.routes.js';
import emailsRouter from './routers/emails.routes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use('/', authRouter);
app.use('/', usersRouter);
app.use('/phones', phonesRouter);
app.use('/emails', emailsRouter);

app.use(errorHandler);

app.listen(3000);