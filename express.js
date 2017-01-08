import bodyParser from 'body-parser';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import logger from 'morgan';
import jade from 'jade';
import mailgun from 'mailgun.config';
import mongoSession from 'connect-mongodb-session';
import mongoose from 'mongoose';
import path from 'path';
import session from 'express-session';

import './models';

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
const TempUser = mongoose.model('TempUser');
const codes = [
  'TESTT',
  '8QP47',
  '3AN22',
  'L75BH',
  'Z4P9A',
  '85J22',
  'I44N7',
  '4KP22',
];

app.post('/code', (req, res) => {
  const code = req.body._code;

  if (codes.includes(code)) return res.sendStatus(200);

  return res.sendStatus(404);
});

class BadRequestError extends Error {
  constructor(message) {
    super(message);

    this.code = 400;
  }
}

app.post('/register', (req, res) => {
  const code = req.body._code;
  const email = req.body._email;

  if (codes.includes(code)) {
    return User.findOne({ code })
      .exec()
      .then((user) => {
        if (user) {
          throw new BadRequestError('User already exists!');
        }

        return TempUser.findOneAndRemove({ code }).exec();
      })
      .then(() => {
        console.log(chalk.yellow('Creating new temp user...'));
        return TempUser.create({ code, email });
      })
      .then((tempUser) => {
        console.log(chalk.green('Successfully created temp user:'), tempUser._id);
        const html = jade.renderFile('./views/confirmation-email.jade', {
          confirmurl: `http://${req.get('host')}/confirm/${tempUser.id}`,
        });
        return mailgun.messages().send({
          from: 'Korea 2017 Portal <do-not-reply@followthegreatdragon.com>',
          to: email,
          subject: 'Please Confirm Your Email Address',
          html,
        });
      })
      .then((mail) => {
        console.log(mail);
        return res.sendStatus(200);
      })
      .catch((err) => {
        const errCode = err.code || 500;

        return res.status(errCode).send(err.message);
      });
  }

  return res.status(404).send('Code invalid!');
});

app.get('/confirm/:id', (req, res) => {
  const _id = req.params.id;
  TempUser.findOne({ _id })
    .exec()
    .then((tempUser) => {
      if (!tempUser) {
        throw new BadRequestError('ID no longer valid');
      }

      return tempUser.remove();
    })
    .then((tempUser) => {
      const email = tempUser.email;
      const code = tempUser.code;

      return User.create({ code, email });
    })
    .then((user) => {
      console.log(user);
      return res.send('Thank you! Your email has been confirmed. '
          + 'Please check your inbox periodically for updates in 2017.');
    })
    .catch((err) => {
      const errCode = err.code || 500;

      return res.status(errCode).send(err.message);
    });
});

export default app;
