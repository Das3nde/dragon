const dotenv = require('dotenv');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  dotenv.load();
}
