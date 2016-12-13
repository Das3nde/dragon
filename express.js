import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import logger from 'morgan';
import mongoSession from 'connect-mongodb-session';
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

export default app;
