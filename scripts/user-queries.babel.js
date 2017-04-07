import mongoose from 'mongoose';
import UserSchema from 'models/user';
// import TempUserSchema from 'models/temp-user';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_t2qxw14d:5l7pdd231r4shlpts2a10biooc@ds033145.mongolab.com:33145/heroku_t2qxw14d');

const User = mongoose.model('User', UserSchema);
// const TempUser = mongoose.model('TempUser', TempUserSchema);

User
// TempUser
  .find({})
  .exec()
  .then((users) => {
    users.sort();
    users.forEach((user) => {
      console.log(user.email, user.code);
    });
    process.exit();
  });
