import bodyParser from 'body-parser';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import logger from 'morgan';
import mongoSession from 'connect-mongodb-session';
import mongoose from 'mongoose';
import path from 'path';
import session from 'express-session';

import './models';

/*
mailgun.messages().send({
  from: 'Test User <mailgun@sandbox74f3b68ba85a4148baf17476a342f6a8.mailgun.org>',
  to: 'knutson.justin@gmail.com',
  subject: 'Hello',
  text: 'Testing Mailgun-js',
}, (error, body) => {
  console.log(body);
  if (error) console.log(error);
});
*/

const MongoDBStore = mongoSession(session);

const app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(bodyParser.json({ uploadDir: './temp' }));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cookieSession({
  keys: ['dragon1', 'dragon2'],
}));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'LdkIe9v2',
  store: new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions',
  }),
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

const User = mongoose.model('User');
const codes = [
  'TESTT',
];

app.post('/code', (req, res) => {
  const code = req.body._code;

  if (codes.includes(code)) return res.sendStatus(200);

  return res.sendStatus(404);
});

app.post('/register', (req, res) => {
  const code = req.body._code;
  const email = req.body._email;

  if (codes.includes(code)) {
    return User.findOne({ code })
      .exec()
      .then((user) => {
        if (!user) {
          console.log(chalk.blue('User not found!'));
          console.log(chalk.yellow('Creating new user...'));
          return User.create({ code, email })
        } else {
          console.log(chalk.blue('User found!'));
          console.log(chalk.yellow('Saving email...'));
          user.email = email;
          return user.save();
        }
      })
      .then((user) => {
        console.log(chalk.green('Successfully saved user:'), user._id);
        return res.sendStatus(200);
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
  }

  return res.sendStatus(404);
});

export default app;
