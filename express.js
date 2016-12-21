import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import fs from 'fs';
import logger from 'morgan';
import mongoSession from 'connect-mongodb-session';
import mongoose from 'mongoose';
import path from 'path';
import session from 'express-session';
import mailgun from 'mailgun.config';

import './models';


mailgun.messages().send({
  from: 'Test User <mailgun@sandbox74f3b68ba85a4148baf17476a342f6a8.mailgun.org>',
  to: 'knutson.justin@gmail.com',
  subject: 'Hello',
  text: 'Testing Mailgun-js',
}, (error, body) => {
  console.log(body);
  if (error) console.log(error);
});

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

app.post('/register', (req, res) => {
  const code = req.body._code;
  const email = req.body._email;

  if (email) {
    User.findOne({ code }, (user) => {
      user.email = email;
      user.save();
    });
  }

  if (codes.includes(code)) {
    return res.send(fs.readFileSync('./greeting.txt', 'utf-8'));
  }

  return res.send('Boner');
});

export default app;
