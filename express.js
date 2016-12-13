import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import mongoSession from 'connect-mongodb-session';
import session from 'express-session';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  dotenv.load();
}

const MONGO_SERVER = process.env.MONGO_URI || 'mongodb://localhost/dragon';
mongoose.connect(MONGO_SERVER);

const MongoDBStore = mongoSession(session);

const app = express();

app.set('port', process.env.PORT || 8080);

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
    uri: MONGO_SERVER,
    collection: 'sessions',
  }),
}));

app.get('/', (req, res) => {
  res.send('Follow the Great Dragon...');
});

export default app;
